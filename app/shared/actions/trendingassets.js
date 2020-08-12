import * as types from "./types";

export const getTrendingAssets = () => {
    return (dispatch: () => void) => {
        const payload = [];
        for (let i = 0; i < 5; i++) {
            const data = {
                id: i,
                title: "Methews",
                author: "theonlykarma",
                price: "25,000 KARMAR"
            }
            payload.push(data);
        };

        dispatch({
            type: types.TRENDING_ASSETS_LIST,
            payload
        });
    };
}

export default {
    getTrendingAssets
};