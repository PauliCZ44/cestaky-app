export const token = import.meta.env.VITE_MAPBOX_TOKEN

export const createDirectionRequest = (start: number[], end: number[]) => `
https://api.mapbox.com/directions/v5/mapbox/driving/${start[0]}%2C${start[1]}%3B${end[0]}%2C${end[1]}?alternatives=false&geometries=geojson&overview=simplified&steps=false&access_token=${token}
`
// Support only czech rep. currently
export const createPlaceRequest = (query: string) =>
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?country=cz&proximity=ip&types=place&access_token=${token}`
