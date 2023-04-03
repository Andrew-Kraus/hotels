import { put, takeEvery, call, select } from 'redux-saga/effects';
import { setFinalDate } from '../store/finalDateReducer';
import { setFinalDays } from '../store/finalDaysReducer';
import { setFinalLocation } from '../store/finalLocationReducer';
import { setHotels } from '../store/hotelsReducer';

function datePlus(date, days) {
    if (JSON.stringify(date).length < 13 && date) {
        const newDate = new Date(date);
        newDate.setDate(newDate.getDate() + days);
        return newDate.toISOString().split('T')[0];
    } if (!date) {
        const newDate = new Date();
        newDate.setDate(newDate.getDate() + days);
        return newDate.toISOString().split('T')[0];
    } else {
        const newDate = new Date(date)
        newDate.setDate(newDate.getDate() + days);
        return newDate.toISOString().split('T')[0];
    }
}

function dataCheckIn(date) {
    if (JSON.stringify(date).length < 13 && date) {
        return date;
    } if (!date) {
        const newDate = new Date();
        return newDate.toISOString().split('T')[0];
    } else {
        return date.toISOString().split('T')[0];
    }
}

function* fetchHotelsWorker() {
    const { date, days, location } = yield select((state) => ({
        date: state.date,
        days: state.days,
        location: state.location,
    }));
    const checkIn = dataCheckIn(date);
    const checkOut = datePlus(date, days);
    const url = `https://engine.hotellook.com/api/v2/cache.json?location=${location}&currency=rub&checkIn=${checkIn}&checkOut=${checkOut}&limit=10`;
    const data = yield call(() => fetch(url).then(res => res.json()));
    yield put(setHotels(data));
    yield put(setFinalDays(days));
    yield put(setFinalDate(checkIn));
    yield put(setFinalLocation(location));
}

export function* hotelsWatcher() {
    yield takeEvery('FETCH_HOTELS', fetchHotelsWorker)
}