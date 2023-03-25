import { all } from 'redux-saga/effects'
import { hotelsWatcher } from './hotelsSaga'

export function* rootWatcher() {
    yield all([hotelsWatcher()])
}