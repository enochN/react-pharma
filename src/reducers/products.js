const initialState = {
    products: []
};

export default function products(state = initialState, action) {
    switch (action.type) {
        case "INIT":
            return {
                ...state,
                products: action.data
            };
        default:
            return state;
    }
}

