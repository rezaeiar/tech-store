import React, { useState, useContext } from 'react'
import { BiChevronRight } from 'react-icons/bi'
import Input from '../Input/Input'
import Button from '../Button/Button'
import AuthContext from '../../contexts/authContext'
import { useNavigate } from 'react-router-dom'

import './Login.css'

function Login() {
    const navigate = useNavigate()
    const authContext = useContext(AuthContext);

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [btn1Props] = useState({
        type: 'filled-blue',
        value: 'Submit'
    });
    const [btn2Props] = useState({
        type: 'filled-blue',
        value: 'Create An Account',
        to: '/authentication/register'
    });

    const clearInputs = () => {
        setEmail('')
        setPassword('')
    }

    const loginUser = () => {
        if (email && password) {

            fetch(`https://tech-store-db.vercel.app/users?email=${email}&password=${password}`, {
                method: "GET"
            })
                .then(res => res.json())
                .then(data => {
                    if (data.length) {
                        authContext.setIsUserLoginned(true)
                        authContext.successToast('You are logged in.');
                        navigate('/')
                    } else {
                        authContext.errorToast('This user does not exist.')
                        clearInputs()
                    }
                })
        } else {
            authContext.errorToast('Fill in the asterisked items.')
        }
    }

    return (
        <div className='login'>
            <div className="bandcamp">
                <div className="bandcamp__wrapper">
                    <span className="bandcamp__item">
                        Home <BiChevronRight className='bandcamp__icon' />
                    </span>
                    <span className="bandcamp__item">
                        Login
                    </span>
                </div>
            </div>
            <h4 className="authentication__title">
                Customer Login
            </h4>
            <div className="authentication__wrapper">
                <div className="authentication-box">
                    <h3 className="authentication-box__title">
                        Registered Customers
                    </h3>
                    <span className="authentication-box__desc">
                        If you have an account, sign in with your email address.
                    </span>
                    <Input required label='Your Email' full inpValue={email} setInpValue={setEmail} >
                        Your Email
                    </Input>
                    <Input required label='Your Password' full inpValue={password} setInpValue={setPassword} >
                        Your Password
                    </Input>
                    <div className="authentication-box__actions">
                        <Button {...btn1Props} onAction={loginUser} />
                        <a href="#" className='authentication-box__link'>
                            Forgot Your Password?
                        </a>
                    </div>
                </div>
                <div className="authentication-box">
                    <h3 className="authentication-box__title">
                        New Customer?
                    </h3>
                    <span className="authentication-box__desc">
                        Creating an account has many  :
                    </span>
                    <ul className="authentication-box__list">
                        <li className="authentication-box__item">
                            Check out faster
                        </li>
                        <li className="authentication-box__item">
                            Keep more than one address
                        </li>
                        <li className="authentication-box__item">
                            Track orders and more
                        </li>
                    </ul>
                    <Button {...btn2Props} />
                </div>
            </div>
        </div>
    )
}

export default Login;