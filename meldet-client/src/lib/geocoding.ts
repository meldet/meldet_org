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

export interface ReverseGeocodingResponse {
    latitude: number,
    longitude: number,
    type: string,
    distance: number,
    label: string,
    map_url: string,
}

export async function getReverseGeocoding(lat: number, lng: number) {
    const url = new URL(`/api/geocoding/reverse?lat=${lat}&lng=${lng}`, config.apiUrl)
    try {
        const response: {data: ReverseGeocodingResponse, status: number} = await axios.get(url.href)
        console.log(response)
        return response.data
    } catch(err) {
        console.error(err)
    }
}