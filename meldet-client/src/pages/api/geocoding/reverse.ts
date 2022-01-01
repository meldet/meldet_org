import { NextApiRequest, NextApiResponse } from "next";
const axios = require('axios');


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
    try {
        const {lat, lng} = req.query
        const url = new URL(
            `/v1/forward?access_key=${process.env.GEOCODING_API_KEY}&query=${lat},${lng}&limit=10`, 
            `${process.env.GEOCODING_API_BASE_URL}`)
        const response = await axios.get(url.href)
        console.log(url.href)
        res.status(200).json(response.data)
    } catch(err) {
        res.status(500)
        console.error(err)
    }
    } else {
        res.status(404)
    }
}