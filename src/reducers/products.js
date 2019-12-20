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
        case "ADD":
            const {name, price} = action;
            let productsA = state.products.concat({name, prices: [{id:1, price, date: new Date()}]});
            productsA.map(prod => {
                prod.prices.sort(sortProductPrices);
                return prod;
            });
            return {
                ...state,
                products: productsA
            };
        default:
            return state;
    }
}

