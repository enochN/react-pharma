const initialState = {
    products: []
};

function sortProductPrices(a,b) {
    let timestampA = new Date(a.date).getTime();
    let timestampB = new Date(b.date).getTime();

    if(timestampA < timestampB){
        return 1;
    }
    if(timestampA > timestampB){
        return -1;
    }
    return 0;
}

export default function products(state = initialState, action) {
    switch (action.type) {
        case "INIT":
            let products = action.data.map(prod => {
                prod.prices.sort(sortProductPrices);
                return prod;
            });

            return {
                ...state,
                products
            };
        default:
            return state;
    }
}

