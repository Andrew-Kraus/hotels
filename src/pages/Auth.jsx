import React, { useState } from 'react'

const Auth = (props) => {
    const [isFormValid, setIsFormValid] = useState(false);
    const [isFormTouched, setIsFormTouched] = useState(false);
    const [isLoginValid, setIsLoginValid] = useState(false)
    const [isPassValid, setIsPassValid] = useState(false)

    function login(e) {
        e.preventDefault();
        props.setIsLoggedIn(true)
        localStorage.setItem('Auth', JSON.stringify('true'))
    }

    const handleInput = (event, title) => {
        setIsFormTouched(true);
        setIsFormValid(event.target.form.checkValidity());
        if (title === 'login' && event.target.checkValidity()) {
            setIsLoginValid(true);
        } if (title === 'login' && !event.target.checkValidity()) {
            setIsLoginValid(false);
        } if (title === 'pass' && event.target.checkValidity()) {
            setIsPassValid(true);
        } if (title === 'pass' && !event.target.checkValidity()) {
            setIsPassValid(false);
        }
    }
    return (
        <div className='auth'>
            <img className='auth__bg' src='main-bg.png' alt='Изображение не загрузилось' />
            <div className='auth__modal'>
                <form className='auth__modal-form'>
                    <fieldset className='auth__container'>
                        <h2 className='auth__title'>Simple Hotel Check</h2>
                        <div className='auth__input-container'>
                            <h3 className={`auth__input-title ${isFormTouched && !isLoginValid ? "text-invalid" : ""}`}>Логин</h3>
                            <input className='auth__input' type="text" pattern="[a-y1-9-_]+@[a-y1-9-]+\.(([a-z]+\.){1,})?[a-y1-9]{2,}" placeholder='login@mail.com' required onChange={(e) => handleInput(e, 'login')}></input>
                            <span className="form__error">Описание ошибки будет тут</span>
                        </div>
                        <div className='auth__input-container'>
                            <h3 className={`auth__input-title ${isFormTouched && !isPassValid ? "text-invalid" : ""}`}>Пароль</h3>
                            <input className='auth__input' type="password" placeholder="Введите пароль" minLength="8" pattern="[a-yA-Y1-9-_]+" required onChange={(e) => handleInput(e, 'pass')}></input>
                            <span className="form__error">Описание ошибки будет тут</span>
                        </div>
                        <button className='auth__button' disabled={isFormValid ? false : true} onClick={(e) => login(e)}>Войти</button>
                    </fieldset>
                </form>
            </div>
        </div>
    )
}

export default Auth