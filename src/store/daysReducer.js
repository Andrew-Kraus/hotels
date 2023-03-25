const initialState = 1;

export const daysReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_DAYS':
      return action.payload;
    default:
      return state;
  }
}
