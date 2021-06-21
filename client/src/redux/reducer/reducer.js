import {
  GET_PRODUCTS_BY_CATEGORY,
  GET_CATEGORY_ID,
  GET_PRODUCTS,
  GET_CATEGORIES,
  GET_PRODUCTS_BY_NAME,
  ADD_TO_CART,
  DELETE_PRODUCT,
  MODIFY_PRODUCT,
  GET_PRODUCT_DETAIL,
  SET_USER,
  SHOW_FLOATING_CART,
  GET_USER_ORDERS,
} from '../actions/actions';

const InitialState = {
  products: [],
  categories: [],
  productsByQuery: [],
  cart: [],
  idToChange: [],
  detail: {
    id: 0, name: '', price: 0, stockAmount: 0, categories: [], description: '', images: [{ url: '' }],
  },
  categorieId: null,
  productsByCategory: [],
  user: {},
  floatingCart: 'none',
  userOrders: [],
};

export default function rootReducer(state = InitialState, action) {
  if (action.type === GET_CATEGORY_ID) {
    return {
      ...state,
      categorieId: action.payload,
    };
  }

  if (action.type === GET_PRODUCTS) {
    return {
      ...state,
      products: action.payload,
    };
  }

  if (action.type === GET_PRODUCTS_BY_CATEGORY) {
    return {
      ...state,
      productsByCategory: action.payload,
    };
  }

  if (action.type === GET_CATEGORIES) {
    return {
      ...state,
      categories: action.payload,
    };
  }

  if (action.type === GET_PRODUCTS_BY_NAME) {
    return {
      ...state,
      productsByQuery: action.payload,
    };
  }
  if (action.type === ADD_TO_CART) {
    return {
      ...state,
      cart: state.cart.concat(action.payload),
    };
  }
  if (action.type === DELETE_PRODUCT) {
    return {
      ...state,

    };
  }
  if (action.type === MODIFY_PRODUCT) {
    return {
      ...state,
      idToChange: action.payload,

    };
  }
  if (action.type === GET_PRODUCT_DETAIL) {
    return {
      ...state,
      detail: action.payload,
    };
  }
  if (action.type === SET_USER) {
    return {
      ...state,
      user: action.payload,
    };
  }
  if (action.type === SHOW_FLOATING_CART) {
    return {
      ...state,
      floatingCart: action.payload,
    };
  }
  if (action.type === GET_USER_ORDERS) {
    return {
      ...state,
      userOrders: action.payload,
    };
  }
  return state;
}
