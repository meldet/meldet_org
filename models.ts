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
