const initialState = '1';

export const finalDaysReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_FINAL_DAYS':
      return action.payload;
    default:
      return state;
  }
}


export const setFinalDays = payload => ({ type: 'SET_FINAL_DAYS', payload })