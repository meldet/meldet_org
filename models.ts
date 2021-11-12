import { RGBAColor } from "deck.gl";

export interface InputResults {
    markers: {
        id: string,
        address: string,
        lat: string,
        lng: string,
        title: string,
        description: string,
        category: string,
    }[],
    categories: {
        category_name: string,
    }[]
}

export enum Status {
    RECEIVED,
    REVIEWED,
    PUBLISHED
}

export interface Report {
    id: string,
    address: string,
    lat: number,
    lng: number,
    title: string,
    description: string,
    datePublished: string,
    dateReceived: string,
    dateReviewed: string,
    status: Status,
    isPrivate: boolean, // whether the report can be shown on the website
    isAllowedForSocialMedia: boolean, //whether this report can be referenced on social media
    categoryId: number,
}


export interface Category {
    id: number,
    name: string,
    description: string,
    visualisationColor: RGBAColor,
    popularity?: number
}

export interface Categories {
    [key: string]: Category
}