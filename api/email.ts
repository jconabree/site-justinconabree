// import nodemailer, { Transporter } from 'nodemailer';
// import { google } from 'googleapis';
// import SMTPTransport from 'nodemailer/lib/smtp-transport';
// import { GaxiosError } from 'gaxios';

// const OAuth2 = google.auth.OAuth2;

// export async function createTransporter(): Promise<GaxiosError<any>|Transporter<SMTPTransport.SentMessageInfo>> {
//     try {
//         const oauth2Client = new OAuth2(
//             process.env.EMAIL_CLIENT_ID,
//             process.env.EMAIL_CLIENT_SECRET,
//             "https://developers.google.com/oauthplayground"
//         );
   
//         oauth2Client.setCredentials({
//             refresh_token: process.env.EMAIL_REFRESH_TOKEN,
//         });
   
//         const accessToken = await new Promise((resolve, reject) => {
//             oauth2Client.getAccessToken((err, token) => {
//                 if (err) {
//                     console.log("*ERR: ", err)
//                     reject(err);
//                 }

//                 resolve(token); 
//             });
//         });
   
//         const transporter = nodemailer.createTransport({
//             // @ts-ignore
//             service: "gmail",
//             auth: {
//                 type: "OAuth2",
//                 user: process.env.EMAIL_USER_EMAIL,
//                 accessToken,
//                 clientId: process.env.EMAIL_CLIENT_ID,
//                 clientSecret: process.env.EMAIL_CLIENT_SECRET,
//                 refreshToken: process.env.EMAIL_REFRESH_TOKEN,
//             },
//         });

//         return transporter;
//     } catch (err) {
//         return err as GaxiosError<any>
//     }
// }

export async function sendMail(
    fromEmail: string,
    fromName: string,
    subject: string,
    bodyText: string
) {
    console.log('To be implemented');

    return false;
    // try {
    //     const mailOptions = {
    //         from: `${fromName} <${fromEmail}>`,
    //         to: `${process.env.EMAIL_USER_NAME} <${process.env.EMAIL_USER_EMAIL}>`,
    //         subject,
    //         text: bodyText
    //     }
   
    //     let emailTransporter = await createTransporter() as Transporter<SMTPTransport.SentMessageInfo>;

    //     await emailTransporter.sendMail(mailOptions);

    //     return true;
    // } catch (err) {
    //     console.log("ERROR: ", err);

    //     return false;
    // }
}