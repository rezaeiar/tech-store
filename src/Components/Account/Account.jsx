import React from 'react'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../../contexts/authContext'

import './Account.css'

function Account() {
    const authContext = useContext(AuthContext);

    return (
        <div className='account'>
            <div className="account-triangle"></div>
            <ul className="account-list">
                <li className="account-list__item">
                    {
                        authContext.isUserLoginned &&
                        <Link to='/account' className='account-list__link'>
                            My  Account
                        </Link>
                    }
                </li>
                <li className="account-list__item">
                    <Link to='/account' className='account-list__link'>
                        My Wish List ({authContext.wishList.length})
                    </Link>
                </li>
                <li className="account-list__item">
                    <Link to='/account' className='account-list__link'>
                        Compare (unnavailable)
                    </Link>
                </li>
                {
                    !authContext.isUserLoginned &&
                    <>
                        <li className="account-list__item">
                            <Link to='/authentication/register' className='account-list__link'>
                                Create an Account
                            </Link>
                        </li>
                        <li className="account-list__item">
                            <Link to='/authentication/login' className='account-list__link'>
                                Sign In
                            </Link>
                        </li>
                    </>
                }
            </ul>
        </div>
    )
}
export default Account

