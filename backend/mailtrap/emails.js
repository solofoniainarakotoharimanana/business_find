import { PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplates.js";
import { mailtrapClient, sender } from "./mailtrap.config.js";


export const sendVerificationEmail = async (email, verificationToken) => {
    const recipient = [{email:"snyaina.rakotoharimanana@gmail.com"}];

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Verify your email",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
            category: "Email verification"
        })
        console.log("Email sent successfully", response)
    } catch (error) {
        console.error("Error sending verification email ", error);
        throw new Error("Error sending verification email ", error)
    }
}

export const sendWelcomeEmail = async (email, name) => {
    const recipient = [{ email }];
    // console.log("USER EMAIL >>> ", email)

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            //template_uuid: "07a51fb9-d25a-4123-819d-a31cb001ade0",//959a829b-89d2-4fec-a71d-407e2a68464f
            template_uuid: "959a829b-89d2-4fec-a71d-407e2a68464f",//
            template_variables: {
                company_info_name: "Buisness Company",
                name: name
            }
        })
        console.log("Welcome email sent successfully ", response)
    } catch (error) {
        console.error("Error sending welcome email", error);
        throw new Error("Error sending welcome email ", error)
    }
}

export const sendPasswordResetEmail = async (email, resetURL) => {
    const recipient = [{ email }];

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Reset your password",
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
            category: "Reset Password"
        })
        console.log("Reset password email sent successfully ", response)
    } catch (error) {
        console.error("Error sending welcome email", error);
        throw new Error("Error sending welcome email ", error)
    }
}

export const sendResetSuccessEmail = async (email) => {
    const recipient = [{ email }];

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Reset your password",
            html: PASSWORD_RESET_SUCCESS_TEMPLATE,
            category: "Password reset"
        })
        console.log("Reset password email sent successfully ", response)
    } catch (error) {
        console.error("Error sending welcome email", error);
        throw new Error("Error sending welcome email ", error)
    }
}