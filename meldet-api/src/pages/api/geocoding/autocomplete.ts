import { NextApiRequest, NextApiResponse } from "next";
const axios = require('axios');


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
    try {
        const {place} = req.query
        const myurl = new URL(
            `/v1/forward?access_key=${process.env.GEOCODING_API_KEY}&query=${place}&limit=9`, 
            `${process.env.GEOCODING_API_BASE_URL}`)
        const response = await axios.get(myurl.href)
        console.log(myurl.href)
        res.status(200).json(response.data)
    } catch(err) {
        res.status(500)
        console.error(err)
    }
    } else {
        res.status(404)
    }
}