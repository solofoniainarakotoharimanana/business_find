import { VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplates.js";
import { mailtrapClient, sender } from "./mailtrap.config.js";


export const sendVerificationEmail = async (email, verificationToken) => {
    const recipient = [{email:"solofoniainarakotoharimanana@gmail.com"}];

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
            template_uuid: "07a51fb9-d25a-4123-819d-a31cb001ade0",
            template_variables: {
                company_info_name: "Buisness Company",
                name: name
            }
        })
        console.log("Welcome email sent successfully ", response)
    } catch (error) {
        console.error("Error sending welcome email", error);
        throw new error("Error sending welcome email ", error)
    }
}