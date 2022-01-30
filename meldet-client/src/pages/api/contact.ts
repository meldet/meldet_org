import { NextApiRequest, NextApiResponse } from "next";
import { sendMail } from "../../lib/sendgrid";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

/* 
send an email to the meldet team. 
    @param body
    @param sender
*/
  if (req.method === "POST") {
    try {
        const {body, sender} = req.body
        if (!body) throw new Error("Missing a 'body' field");
        if (!sender) throw new Error("Missing a 'sender' field")
        const status = await sendMail({
            subject: 'Contact request from Meldet.org',
            text: body,
            sender
        })
        res.status(status).json({status: 'message sent'})
    } catch (err: any) {
        console.error(err.response.body.errors);
      res
        .status(err.code || 500)
        .json({
          error: `failed to deliver your message. ${err.response?.body?.errors[0]?.message}`,
        });
    }
  } else {
    res.status(404);
  }
}
