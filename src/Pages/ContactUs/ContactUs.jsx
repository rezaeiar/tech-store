import React, { useState, useEffect, useContext } from 'react'
import { BiChevronRight } from 'react-icons/bi'
import Services from '../../Components/Services/Services'
import Button from '../../Components/Button/Button'
import Input from '../../Components/Input/Input'
import AuthContext from '../../contexts/authContext'

import './ContactUs.css'

function ContactUs() {
    const authContext = useContext(AuthContext)

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" })
    }, [])

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [userText, setUserText] = useState('')
    const [btn1Props] = useState({
        type: 'filled-blue',
        value: 'Submit'
    });

    const clearInputs = () => {
        setName('')
        setEmail('')
        setPhone('')
        setUserText('')
    }
    const sendMessage = () => {

        if (name && email && userText) {

            const userContact = {
                username: name,
                userEmail: email,
                userPhone: phone,
                userText
            }

            fetch('http://localhost:3000/contact', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userContact)
            })
                .then(res => {
                    if (res.ok) {
                        authContext.successToast('Submitted successfully');
                        clearInputs();
                    }
                })
        } else {
            authContext.errorToast('Fill in the asterisked items')
        }
    }
    return (
        <div className='contactUs'>
            <div className="container">
                <div className="contactUs__wrapper">
                    <div className="bandcamp">
                        <div className="bandcamp__wrapper">
                            <span className="bandcamp__item">
                                Home <BiChevronRight className='bandcamp__icon' />
                            </span>
                            <span className="bandcamp__item">
                                Contact Us
                            </span>
                        </div>
                    </div>
                    <h4 className="contactUs__title">
                        Contact Us
                    </h4>
                    <p className="contactUs__desc">
                        We love hearing from you, our Shop customers. <br />
                        Please contact us and we will make sure to get back to you as soon as we possibly can.
                    </p>
                    <div className="contactUs__box">
                        <div className="contactUs-side">
                            <Input required label='Your Name' inpValue={name} setInpValue={setName} >
                                Your Name
                            </Input>
                            <Input required label='Your Email' inpValue={email} setInpValue={setEmail} >
                                Your Email
                            </Input>
                            <Input label='Your Phone Number' inpValue={phone} setInpValue={setPhone} >
                                Your Phone Number
                            </Input>
                            <Input required label='What’s on your mind?' textarea inpValue={userText} setInpValue={setUserText} >
                                Jot us a note and we’ll get back to you as quickly as possible
                            </Input>
                            <div className="contactUs__button">
                                <Button {...btn1Props} onAction={sendMessage} />
                            </div>
                        </div>
                        <div className="contactUs-info">
                            <div className="contactUs-info__item">
                                <div className="contactUs-info__icon">
                                    <img src="/images/tools/bx_bx-time.svg" alt="Contact us icon" className='contactUs-info__img' />
                                </div>
                                <div className="contactUs-info__details">
                                    <h4 className="contactUs-info__title">
                                        Address:
                                    </h4>
                                    <span className="contactUs-info__content">
                                        1234 Street Adress City Address, 1234
                                    </span>
                                </div>
                            </div>
                            <div className="contactUs-info__item">
                                <div className="contactUs-info__icon">
                                    <img src="/images/tools/bx_bx-time (1).svg" alt="Contact us icon" className='contactUs-info__img' />
                                </div>
                                <div className="contactUs-info__details">
                                    <h4 className="contactUs-info__title">
                                        Phone:
                                    </h4>
                                    <span className="contactUs-info__content">
                                        (00)1234 5678
                                    </span>
                                </div>
                            </div>
                            <div className="contactUs-info__item">
                                <div className="contactUs-info__icon">
                                    <img src="/images/tools/bx_bx-time (2).svg" alt="Contact us icon" className='contactUs-info__img' />
                                </div>
                                <div className="contactUs-info__details">
                                    <h4 className="contactUs-info__title">
                                        We are open:
                                    </h4>
                                    <span className="contactUs-info__content">
                                        Monday - Thursday: 9:00 AM - 5:30 PM <br />
                                        Friday 9:00 AM - 6:00 PM <br />
                                        Saturday: 11:00 AM - 5:00 PM
                                    </span>
                                </div>
                            </div>
                            <div className="contactUs-info__item">
                                <div className="contactUs-info__icon">
                                    <img src="/images/tools/bx_bx-time (3).svg" alt="Contact us icon" className='contactUs-info__img' />
                                </div>
                                <div className="contactUs-info__details">
                                    <h4 className="contactUs-info__title">
                                        E-mail:
                                    </h4>
                                    <a href="#" className="contactus-info__link">
                                        shop@email.com
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <div className="contactUs__button">
                        <Button {...btn1Props} onAction={sendMessage} />
                    </div> */}
                </div>
            </div>
            <Services bgColor />
        </div>
    )
}

export default ContactUs
