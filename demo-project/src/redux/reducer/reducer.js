
let initState = {
    token: null,
    userID: "",
    users: [],
    employees: [],
    products: [], //id, productName, description, price, image
    cart: [],   //id, productName, description, price, image, qty
    cart_item: null
}

function rootReducer(state = initState, action) {
    switch (action.type) {
        case "TOKEN_KEY":
            return {
                ...state,
                token: action.res,
            }
        case "USER_ID":
            return {
                ...state,
                userID: action.res,
            }
        case "GET_USERS":
            return {
                ...state,
                users: action.res,
            }
        case "GET_EMPLOYEES":
            return {
                ...state,
                employees: action.res,
            }
        case "GET_PRODUCTS":
            return {
                ...state,
                products: action.res
            }
        case "ADD_TO_CART":
            const item = state.products.find((item) => item.id === action.payload.id)
            console.log(item)
            const inCart = state.cart.find((item) => item.id === action.payload.id ? true : false)
            console.log(inCart)
            return {
                ...state,
                // cart: []
                cart: inCart ?
                    state.cart.map((item) => item.id === action.payload.id ? { ...item, qty: item.qty + 1 } : item)
                    : [...state.cart, { ...item, qty: 1 }]
            }
        case "REMOVE_FROM_CART":
            return {
                ...state,
                cart: state.cart.filter((item) => item.id !== action.payload.id)
            }
        case "INCREEMENT_QTY":
            return {
                ...state,
                cart: state.cart.map((item) => item.id === action.payload.id ? { ...item, qty: item.qty + 1 } : item)
            }
        case "DECREEMENT_QTY":
            return {
                ...state,
                cart: state.cart.map((item) => item.id === action.payload.id ? { ...item, qty: item.qty - 1 } : item)
            }
        case "LOAD_CART_ITEMS":
            return {

            }
        default:
            return {
                ...state,
            };
    }
}

export const reducer = rootReducer;


