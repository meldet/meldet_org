import { config } from "../config";
const axios = require('axios');

export async function getPlaceSuggestions(query: string) {
    const url = new URL(`/api/geocoding/autocomplete?place=${query}`, config.apiUrl)
    try {
        const response = await axios.get(url.href)
        console.log(response)
        return response
    } catch(err) {
        console.error(err)
    }
}