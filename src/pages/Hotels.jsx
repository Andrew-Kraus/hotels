import React, { useEffect, useState } from 'react'
import FavoriteCard from '../components/FavoriteCard'
import HotelCard from '../components/HotelCard'
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { useDispatch, useSelector } from 'react-redux';
import { fetchHotels } from '../store/hotelsReducer';

const Hotels = (props) => {
    const [ratingDirection, setRatingDirection] = useState('');
    const [priceDirection, setPriceDirection] = useState('');
    const sliderImages = ['forest1.png', 'forest2.png', 'forest3.png', 'forest1.png', 'forest2.png', 'forest3.png', 'forest1.png', 'forest2.png', 'forest3.png']
    const dispatch = useDispatch()
    const hotels = useSelector(state => state.hotels)
    const favorites = useSelector(state => state.favorites);
    const finalDays = useSelector(state => state.finalDays);
    const finalDate = useSelector(state => state.finalDate);
    const finalLocation = useSelector(state => state.finalLocation);
    const date = useSelector(state => state.date);

    useEffect(() => {
        dispatch(fetchHotels())
    }, [])

    function logOut() {
        props.setIsLoggedIn(false)
        localStorage.removeItem('Auth')
    }

    function addAndRemoveFav(hotel) {
        if (!favorites.find(e => e.hotelName === hotel.hotelName)) {
            dispatch({ type: 'SET_FAVORITES', payload: [...favorites, hotel] })
        } else {
            dispatch({ type: 'SET_FAVORITES', payload: favorites.filter(e => e.hotelName !== hotel.hotelName) })
        }
    }

    function sortByRating() {
        const arr = [...favorites]
        const currentDirection = ratingDirection === "desc" ? "asc" : "desc";
        setRatingDirection(currentDirection);
        setPriceDirection('');
        if (currentDirection === "asc") {
            dispatch({ type: 'SET_FAVORITES', payload: arr.sort((a, b) => a.stars - b.stars) })
        } else {
            dispatch({ type: 'SET_FAVORITES', payload: arr.sort((a, b) => b.stars - a.stars) })
        }
    }

    function sortByPrice() {
        const arr = [...favorites]
        const currentDirection = priceDirection === "desc" ? "asc" : "desc";
        setPriceDirection(currentDirection);
        setRatingDirection('');
        if (currentDirection === "asc") {
            dispatch({ type: 'SET_FAVORITES', payload: arr.sort((a, b) => a.priceAvg - b.priceAvg) })
        } else {
            dispatch({ type: 'SET_FAVORITES', payload: arr.sort((a, b) => b.priceAvg - a.priceAvg) })
        }
    }

    function renderRatingIcons() {
        if (ratingDirection === '') {
            return 'non-active.png'
        } else {
            return ratingDirection === 'asc' ? 'desc.png' : 'asc.png'
        }
    }

    function renderPriceIcons() {
        if (priceDirection === '') {
            return 'non-active.png'
        } else {
            return priceDirection === 'asc' ? 'desc.png' : 'asc.png'
        }
    }


    const monthSplit = 'января,февраля,марта,апреля,мая,июня,июля,августа,сентября,октября,ноября,декабря'.split(',');
    function convertDate() {
        const newDate = new Date(finalDate);
        const month = monthSplit[newDate.getMonth()];

        return `${newDate.getDate()} ${month} ${newDate.getFullYear()}`;
    }

    function declensionWords(num, firstDec, secondDec, thirdDec) {
        let word = firstDec;
        if (num % 10 === 1 && num % 100 !== 11) {
            word = secondDec;
        } else if (num % 10 >= 2 && num % 10 <= 4 && (num % 100 < 10 || num % 100 >= 20)) {
            word = thirdDec;
        }
        return word;
    }

    function declension(num, value) {
        if (value === 'день') {
            return declensionWords(num, 'дней', 'день', 'дня')
        } if (value === 'отель') {
            return declensionWords(num, 'отелей', 'отель', 'отеля')
        }
    }


    return (
        <div className='hotels'>
            <header className='hotels__header'>
                <h1 className='hotels__title'>Simple Hotel Check</h1>
                <div className='hotels__logout' onClick={() => logOut()}>
                    <p className='hotels__logout-text'>Выйти</p>
                    <img className='hoteks__logout-icon' src='log-out.png' alt='Изображение не загрузилось' />
                </div>
            </header>
            <div className='hotels__info'>
                <div className='hotels__info-container'>
                    <div className='hotels__search'>
                        <div className='hotels__input-container'>
                            <h3 className='hotels__input-title'>Локация</h3>
                            <input className='hotels__input' placeholder='Москва' onChange={(e) => dispatch({ type: 'SET_LOCATION', payload: e.target.value })} />
                        </div>
                        <div className='hotels__input-container'>
                            <h3 className='hotels__input-title'>Дата заселения</h3>
                            <input type='date' className='hotels__input' value={date.toISOString().split('T')[0]} onChange={(e) => dispatch({ type: 'SET_DATE', payload: e.target.value })} />
                        </div>
                        <div className='hotels__input-container'>
                            <h3 className='hotels__input-title'>Количество дней</h3>
                            <input className='hotels__input' placeholder='1' onChange={(e) => dispatch({ type: 'SET_DAYS', payload: Number(e.target.value) })} />
                        </div>
                        <button className='hotels__search-button' onClick={() => dispatch(fetchHotels())}>Найти</button>
                    </div>
                    <div className='hotels__favorites'>
                        <h2 className='hotels__favorites-title'>Избранное</h2>
                        <div className='hotels__filters-container'>
                            <button className={ratingDirection !== '' ? 'hotels__filter hotels__filter-active' : 'hotels__filter'} onClick={() => sortByRating()}>Рейтинг<img className='hotels__filter-icon' alt='Изображение не загрузилось' src={renderRatingIcons()} /></button>
                            <button className={priceDirection !== '' ? 'hotels__filter hotels__filter-active' : 'hotels__filter'} onClick={() => sortByPrice()}>Цена<img className='hotels__filter-icon' alt='Изображение не загрузилось' src={renderPriceIcons()} /></button>
                        </div>

                        {favorites && favorites.map((hotel, index) => (
                            <FavoriteCard
                                name={hotel.hotelName}
                                price={hotel.priceAvg}
                                stars={hotel.stars}
                                addAndRemoveFav={() => addAndRemoveFav(hotel)}
                                convertDate={convertDate}
                                declension={declension(finalDays, 'день')}
                                key={index}
                            />
                        ))}

                    </div>
                </div>
                <div className='hotels__result'>
                    <div className='hotels__result-header'>
                        <div className='hotels__location'>
                            <h2 className='hotels__location-text'>Отели<img className='hotels__location-icon' src='vector.png' alt='Изображение не загрузилось' />{finalLocation}</h2>
                        </div>
                        <p className='hotels__result-date'>{convertDate()}</p>
                    </div>

                    <div className='hotels__carousel'>
                        <Swiper
                            slidesPerView={3.5}
                            spaceBetween={12}
                            freeMode={true}
                            modules={[FreeMode]}
                            className="mySwiper"
                        >
                            {sliderImages.map((image, index) => {
                                return <SwiperSlide key={index}><img className='hotels__carousel-image' src={image} alt='Изображение не загрузилось' /></SwiperSlide>
                            })}

                        </Swiper>
                    </div>

                    <p className='hotels__favorites-count'>Добавлено в Избранное: <span className='hotels__favorites-number'>{favorites.length}</span> {declension(favorites.length, 'отель')}</p>

                    <div className='hotels__result-list'>
                        {Array.isArray(hotels) && hotels.map((hotel, index) => {
                            return (
                                <HotelCard
                                    name={hotel.hotelName}
                                    price={hotel.priceAvg}
                                    stars={hotel.stars}
                                    addAndRemoveFav={() => addAndRemoveFav(hotel)}
                                    convertDate={convertDate}
                                    declension={declension(finalDays, 'день')}
                                    key={index}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hotels