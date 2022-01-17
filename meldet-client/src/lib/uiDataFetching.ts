import { Report, Category } from "@prisma/client";
import { config } from "../config";
const axios = require('axios');


export interface ApiLocation {
  label: string;
  latitude: number;
  longitude: number;
}

export async function getPlaceSuggestions(query: string) {
    const url = new URL(`/api/geocoding/autocomplete?place=${query}`, config.apiUrl)
    try {
        const response: { status: number; data: { data: ApiLocation[] } } =
          await axios.get(url.href);
        console.log(response)
        if (response.status >= 400) throw new Error('failed to fetch coordinates')
        return response.data
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

export type ReportWithCat = Report & { categories: Category[] }

export async function getReverseGeocoding(lat: number, lng: number) {
    const url = new URL(`/api/geocoding/reverse?lat=${lat}&lng=${lng}`, config.apiUrl)
    try {
        const response: {data: ReverseGeocodingResponse, status: number} = await axios.get(url.href)
        console.log(response.data)
        if (response.status >= 400) throw new Error("failed to fetch places");
        return response.data
    } catch(err) {
        console.error(err)
    }
}

export async function getReports() {
    const url = new URL(`/api/reports`, config.apiUrl)
    try {
        const response = await axios.get(url.href)
        console.log(response.data)
        return response as ReportWithCat[]
    } catch(err) {
        console.error(err)
    }
}

export async function submitReport(report: Partial<Report> & {categories: string[]}) {
    const url = new URL(`/api/reports`, config.apiUrl)
    try {
        const response = await axios.post(url.href, report)
        console.log(response)
        return response
    } catch(err) {
        console.error(err)
    }
}

export async function sendEmail({ body, sender }: { body: string; sender: string }) {
    try {

        const url = new URL(`/api/contact`, config.apiUrl);
        const response = await axios.post(url.href, {
            body,
            sender,
        });
        return {status: response.status, msg: response, error: response.data.error}
    } catch (err: any) {
        console.log(err)
        return {
            status: 500,
            error: err.message
        }
    }
}