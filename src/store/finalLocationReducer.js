const initialState = 'Москва';

export const finalLocationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_FINAL_LOCATION':
      return action.payload;
    default:
      return state;
  }
}


export const setFinalLocation = payload => ({ type: 'SET_FINAL_LOCATION', payload })