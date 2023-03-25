const initialState = {
  hotels: []
}

export const hotelsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_HOTELS':
      return action.payload;
    default:
      return state;
  }
}

export const setHotels = payload => ({ type: 'SET_HOTELS', payload })
export const fetchHotels = () => ({ type: 'FETCH_HOTELS' })