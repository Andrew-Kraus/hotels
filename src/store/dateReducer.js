const initialState = new Date();

export const dateReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_DATE':
      return action.payload;
    default:
      return state;
  }
}
