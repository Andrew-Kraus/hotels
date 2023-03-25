const initialState = new Date().toISOString().split('T')[0];

export const finalDateReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_FINAL_DATE':
      return action.payload;
    default:
      return state;
  }
}


export const setFinalDate = payload => ({ type: 'SET_FINAL_DATE', payload })