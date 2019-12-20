const initialState = {
    products: [],
    prices:[]
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
            let prices = [];
            let products = action.data.map(prod => {
                prices = prices.concat(prod.prices.map(price => ({id:price.id, price: price.price, date: price.date, productId: prod.id})));
                return {id: Number(prod.id), name: prod.name};
            });

            prices.sort(sortProductPrices);
            const finalState = {
                ...state,
                products,
                prices
            };
            console.log("finalState", finalState);
            return finalState;
        case "ADD":
            const {name, price} = action;
            console.log(state);
            let newProductId = Math.max(...state.products.map(p => p.id)) + 1;
            let updatedProducts = state.products.concat([{id: newProductId, name}]);
            let updatedPrices = state.prices.concat([{price, date: new Date(), id: 1, productId: newProductId }]);
            return {
                ...state,
                products: updatedProducts,
                prices: updatedPrices
            };
        default:
            return state;
    }
}

