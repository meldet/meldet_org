const sgMail = require("@sendgrid/mail");

export interface MailContent {
    to?: string,
    from?: string,
    subject?: string,
    text?: string,
    html?: string,
    sender?: string
}


export const sendMail = async (msg: MailContent) => {
    const {
        SENDGRID_API_KEY: apiKey, 
        NEXT_PUBLIC_MELDET_EMAIL_ADDRESS: emailAddress,
    } = process.env;

    if (!apiKey || ! emailAddress) throw new Error('email env variables not properly set')
    sgMail.setApiKey(apiKey);

    const defaultMail = {
      to: emailAddress,
      from: emailAddress,
      subject: 'mail from meldet backend',
    };
    
        const response: [{statusCode: number}] = await sgMail.send({...defaultMail, text: 
`Original message from: 
${msg.sender}. 
Reply to this address!


${msg.text}
`})
        return response[0].statusCode
}