import React, { useState, useContext } from 'react'
import { BiChevronRight } from 'react-icons/bi'
import Input from '../Input/Input'
import Button from '../Button/Button'
import AuthContext from '../../contexts/authContext'
import { useNavigate } from 'react-router-dom'

import './Register.css'

function Register() {
    const navigate = useNavigate()
    const authContext = useContext(AuthContext);
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [rePassword, setRePassword] = useState('')
    const [btn1Props] = useState({
        type: 'filled-blue',
        value: 'Create account'
    });
    const [btn2Props] = useState({
        type: 'filled-blue',
        value: 'Login to the account',
        to: '/authentication/login'
    });

    const clearInputs = () => {
        setUsername('')
        setEmail('')
        setPassword('')
        setRePassword('')
    }

    const registerUser = () => {

        if (username && email && password && rePassword) {

            if (password === rePassword) {

                const newUserInfo = {
                    username,
                    email,
                    password
                }

                fetch('http://localhost:3000/users/', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(newUserInfo)
                })
                    .then(res => {
                        if (res.ok) {
                            authContext.setIsUserLoginned(true)
                            authContext.successToast('You are registered.')
                            navigate('/')
                        }
                    })
            } else {
                authContext.errorToast('Passwords do not match.')
                clearInputs()
            }
        } else {
            authContext.errorToast('Fill in the asterisked items.')
        }
    }
    return (
        <div className='register'>
            <div className="bandcamp">
                <div className="bandcamp__wrapper">
                    <span className="bandcamp__item">
                        Home <BiChevronRight className='bandcamp__icon' />
                    </span>
                    <span className="bandcamp__item">
                        Register
                    </span>
                </div>
            </div>
            <h4 className="authentication__title">
                Customer Register
            </h4>
            <div className="authentication__wrapper">
                <div className="authentication-box">
                    <h3 className="authentication-box__title">
                        Registered Customers
                    </h3>
                    <span className="authentication-box__desc">
                        If you do not have an account, create an account with your email address
                    </span>
                    <Input required label='Your Username' full inpValue={username} setInpValue={setUsername} >
                        Your Username
                    </Input>
                    <Input required label='Your Email' full inpValue={email} setInpValue={setEmail} >
                        Your Email
                    </Input>
                    <Input required label='Your Password' full inpValue={password} setInpValue={setPassword} >
                        Your Password
                    </Input>
                    <Input required label='Your Repeat Password' full inpValue={rePassword} setInpValue={setRePassword} >
                        Your Repeat Password
                    </Input>
                    <div className="authentication-box__actions">
                        <Button {...btn1Props} onAction={registerUser} />
                    </div>
                </div>
                <div className="authentication-box">
                    <h3 className="authentication-box__title">
                        Have Account?
                    </h3>
                    <span className="authentication-box__desc">
                        login to account has many  :
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

export default Register;