import React from 'react'
import { useSelector } from 'react-redux'

const FavoriteCard = (props) => {
    const finalDays = useSelector((state) => state.finalDays);
    return (
        <div className='hotels__card'>
            <div className='hotels__card-container'>
                <h3 className='hotels__card-title'>{props.name}</h3>
                <img className='hotels__card-icon' src='heart.png' onClick={props.addAndRemoveFav} alt='Изображение не загрузилось' />
            </div>
            <p className='hotels__card-date'>{`${props.convertDate()} - ${finalDays} ${props.declension}`}</p>
            <div className='hotels__card-container'>
                <img src={`stars-${props.stars}.png`} alt='Изображение не загрузилось' />
                <p className='hotels__card-text'>Price: <span className='hotels__card-price'>{props.price}</span></p>
            </div>
        </div>
    )
}

export default FavoriteCard