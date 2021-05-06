export const getData = (url: string, options?: RequestInit) => {
    return fetch(url, options)
        .then((res) => res.json())
}
export const getCoordinates = (address: string) => {
    const url: string = `https://geocode-maps.yandex.ru/1.x/?apikey=471e0e07-9df5-4819-90db-5510c94c00c4&format=json&geocode=${address}`;
    return getData(url);
}
//change in reducer

export const getAddress = (coords: string) => {
    const url: string = `https://geocode-maps.yandex.ru/1.x/?apikey=471e0e07-9df5-4819-90db-5510c94c00c4&geocode=${coords}`;
    return getData(url);
}
