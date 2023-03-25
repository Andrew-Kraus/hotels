const initialState = [];

export const favoritesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_FAVORITES':
      return action.payload;
    default:
      return state;
  }
}