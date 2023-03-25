import React from 'react'
import { useSelector } from 'react-redux'

const HotelCard = (props) => {
    const finalDays = useSelector((state) => state.finalDays);
    const favorites = useSelector((state) => state.favorites);
    return (
        <div className='hotels__item'>
            <img className='hotels__house-icon' src='house.png' alt='' />
            <div className='hotels__card hotels__result-card'>
                <div className='hotels__card-container'>
                    <h3 className='hotels__card-title'>{props.name}</h3>
                    <img className='hotels__card-icon hotels__card-icon-result' src={favorites.find(e => e.hotelName === props.name) ? 'heart.png' : 'heart-white.png'} onClick={props.addAndRemoveFav} alt='Изображение не загрузилось' />
                </div>
                <p className='hotels__card-date'>{`${props.convertDate()} - ${finalDays} ${props.declension}`}</p>
                <div className='hotels__card-container'>
                    <img src={`stars-${props.stars}.png`} alt='Изображение не загрузилось' />
                    <p className='hotels__card-text'>Price: <span className='hotels__card-price hotels__card-price-result'>{props.price} ₽</span></p>
                </div>
            </div>
        </div>
    )
}

export default HotelCard