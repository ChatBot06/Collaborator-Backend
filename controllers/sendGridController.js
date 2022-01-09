import * as sgMail from '@sendgrid/mail';
import * as _ from 'lodash';
import * as Dotenv from 'dotenv';
// import Logger from '../logger';

Dotenv.config();
const sendGridAPIKey = process.env.SENDGRID_API_KEY_NEW;
const sendGridEmailSender = process.env.SENDGRID_SENDER_EMAIL
sgMail.setApiKey(sendGridAPIKey);

export const sendEmail = async (toEmail: string, subject: string, text: any, fromEmail: any = null, attachments: any = null, ccEmail: any = null) => {
    try {
        const msg: any = {
            to: toEmail, // Change to your recipient
            // from: (!_.isNull(fromEmail)) ? fromEmail : sendGridEmailSender,
            from: {
                email: (!_.isNull(fromEmail)) ? fromEmail : sendGridEmailSender,
                name: process.env.SENDGRID_EMAIL_NAME
            },
            subject: subject,
            html: text
        }

        if (!_.isNull(attachments))
            msg.attachments = attachments;

        if (!_.isNull(ccEmail))
            msg.cc = ccEmail

        const sendEmail = await sgMail.send(msg);
        return sendEmail;
    } catch (error) {
        // Logger.error(`Error in src/helper/utils/sendGrid.ts - Method: sendEmail - ${error}`);
        return "";
    }
}