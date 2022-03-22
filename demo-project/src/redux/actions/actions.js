export function TOKEN_KEY(res) {
  return { type: "TOKEN_KEY", res };
}

export function USER_ID(res) {
  return { type: "USER_ID", res };
}

export function GET_USERS(res) {
  return { type: "GET_USERS", res };
}

export function GET_EMPLOYEES(res) {
  return { type: "GET_EMPLOYEES", res };
}

export function GET_PRODUCTS(res) {
  return { type: "GET_PRODUCTS", res };
}

export const ADD_TO_CART = (itemId) => {
  return {
    type : "ADD_TO_CART",
    payload: {
      id: itemId
    }
  }
}

export const REMOVE_FROM_CART = (itemId) => {
  return {
    type : "REMOVE_FROM_CART",
    payload: {
      id: itemId
    }
  }
}

export const INCREEMENT_QTY = (itemId) => {
  return {
    type : "INCREEMENT_QTY",
    payload: {
      id: itemId,
    }
  }
}

export const DECREEMENT_QTY = (itemId) => {
  return {
    type : "DECREEMENT_QTY",
    payload: {
      id: itemId,
    }
  }
}


export const LOAD_CART_ITEMS = (items) => {
  return {
    type : "LOAD_CART_ITEMS",
    payload: items,
  }
}