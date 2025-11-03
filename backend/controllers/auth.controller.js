import User from "../models/user.model.js"
import bcrypt from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import { sendVerificationEmail, sendWelcomeEmail } from "../mailtrap/emails.js";
// import emailExistence from "email-existence";



export const signUp = async (req, res) => {
    const { email, password, name } = req.body;

    try {
        if (!email || !password || !name) {
            throw new Error("All fields are required.");
        }

        const existUser = await User.findOne({ email });
        //If email is already exist in User Collection
        if (existUser) {
            return res.status(400).json({
                success: false,
                message: "Email address already used!!"
            })
        }

        //CHECK IF EMAIl ADDRESS EXIST
        // const response = emailExistence.check(email, function(error, response){
        //     console.log('res: '+response);
        // });

        const hashedPassword = await bcrypt.hash(password, 10);
        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

        const user = new User({
            email,
            password: hashedPassword,
            name,
            verificationToken,
            verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000 //24hours
        })

        await user.save();//Persist user to the database

        //jwt 
        generateTokenAndSetCookie(res, user._id);
        await sendVerificationEmail(user.email, verificationToken);

        res.status(201).json({
            success: true,
            message: "User created successfully",
            user: {
                ...user._doc,
                password: undefined
            }
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

export const verifyEmail = async (req, res) => {
    //123456
    const { code } = req.body;
    try {
        const user = await User.findOne({
            verificationToken: code,
            verificationTokenExpiresAt: {$gt: Date.now()}
        })

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid or exipred verification code"
            })
        }

        user.isVerified = true;
        user.verificationToken= undefined;
        user.verificationTokenExpiresAt= undefined;
        await user.save();
        await sendWelcomeEmail(user.email, user.name);

        res.status(200).json({
            success: true,
            message: "Email verified successfully.",
            user: {
                ...user._doc,
                password: undefined
            }
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error server"
        })
    }

}

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password || email === "" || password === "") {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        const userExist = await User.findOne({ email });
        if (!userExist) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials"
            })
        }
        const isPasswordvalid = bcrypt.compare(password, userExist.password);
        if (!isPasswordvalid) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials"
            })
        }

        generateTokenAndSetCookie(res, userExist._id);

        userExist.lastLogin = new Date();
        await userExist.save();

        res.status(200).json({
            success: true,
            message: "User logged in successfully",
            user: {
                ...userExist._doc,
                password: undefined
            }
        })

    } catch (error) {
         res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

export const logout = (req, res) => {
    // res.send("SIGN OUT ROUTE >>>");
    res.clearCookie("token");
    res.status(400).json({
        success: true,
        message: "User logged out successfully."
    })
}
