import { MailtrapClient } from "mailtrap";
import {
    VERIFICATION_EMAIL_TEMPLATE,
    WELCOME_EMAIL_TEMPLATE,
    PASSWORD_RESET_SUCCESS_TEMPLATE,
    PASSWORD_RESET_REQUEST_TEMPLATE

} from "./emailTemplates.js"

import { mailtrapClient, sender } from "./mailtrap.config.js"

export const sendVerificationEmail = async(email, verificationToken) => {
    const recipient = [{email}];

    try {
        const response = await mailtrapClient.send({
            from:sender,
            to:recipient,
            subject:"Verify your email",
            html:VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
            category: "Email verification"
        });

        console.log("Email sent successfully", response)
    } catch (error) {
        console.error("Error sending verification email", error)

        throw new Error(`Error sending verification email ${error}`);
        
    }
}




export const sendWelcomeEmail = async(email) => {
    const recipient = [{email}];

    try {
        const response = await mailtrapClient.send({
            from:sender,
            to:recipient,
            subject:"Welcome to our website",
            html:WELCOME_EMAIL_TEMPLATE,
            category: "Welcome email"
        });

        console.log("Email sent successfully", response)
    } catch (error) {
        console.error("Error sending verification email", error)

        throw new Error(`Error sending verification email ${error}`);
        
    }
}


export const sendPasswordResetEmail = async (email, resetURL) =>{
    const recipient = [{ email }];

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Password reset request",
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
            category: "Password reset"
        });
        console.log("Email sent successfully", response)
    } catch (error) {
        console.error("Error sending verification email", error)

        throw new Error(`Error sending verification email: ${error}`)
    }
}


export const sendResetSuccessEmail = async(email) => {
    const recipient = [{email}];

    try {
        const response = await mailtrapClient.send({
            from:sender,
            to:recipient,
            subject:"Password reset successful",
            html:PASSWORD_RESET_SUCCESS_TEMPLATE,
            category: "Password reset"
        });

        console.log("Email sent successfully", response)
    } catch (error) {
        console.error("Error sending verification email", error)

        throw new Error(`Error sending verification email ${error}`);
        
    }
}