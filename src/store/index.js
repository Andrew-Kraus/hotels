import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { rootWatcher } from '../saga';
import { dateReducer } from './dateReducer';
import { daysReducer } from './daysReducer';
import { favoritesReducer } from './favoritesReducer';
import { finalDateReducer } from './finalDateReducer';
import { finalDaysReducer } from './finalDaysReducer';
import { finalLocationReducer } from './finalLocationReducer';
import { hotelsReducer } from './hotelsReducer';
import { locationReducer } from './locationReducer';

const sagaMiddleware = createSagaMiddleware()

const rootReducer = combineReducers({
    finalDays: finalDaysReducer,
    favorites: favoritesReducer,
    hotels: hotelsReducer,
    days: daysReducer,
    date: dateReducer,
    location: locationReducer,
    finalLocation: finalLocationReducer,
    finalDate: finalDateReducer,
})


export const store = createStore(rootReducer, applyMiddleware(sagaMiddleware))

sagaMiddleware.run(rootWatcher)