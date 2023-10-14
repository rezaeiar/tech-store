import React, { useState } from 'react'
import { useRoutes } from 'react-router-dom'
import routes from './routes/routes'
import Header from './Components/Header/Header'
import authContext from './contexts/authContext'
import Footer from './Components/Footer/Footer'
import { ToastContainer, toast } from 'react-toastify';
import SerachBox from './Components/SearchBox/SearchBox'

import 'react-toastify/dist/ReactToastify.css';
import './App.css'

function App() {

    const router = useRoutes(routes)

    const [userBasket, setUserBasket] = useState([]);
    const [wishList, setWishList] = useState([]);
    const [isUserLoginned, setIsUserLoginned] = useState(false);
    const [isShowFilterList, setIsShowFilterList] = useState(false)
    const [isShowSearch, setIsShowSearch] = useState(false)
    const [searchItems, setSearchItems] = useState([])

    const errorToast = (message) => {
        toast.error(message, {
            position: "bottom-left",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    }
    const successToast = (message) => {
        toast.success(message, {
            position: "bottom-left",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    }
    const infoToast = (message) => {
        toast.info(message, {
            position: "bottom-left",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    }

    return (
        <>
            <ToastContainer />
            <authContext.Provider value={{
                userBasket,
                setUserBasket,
                wishList,
                setWishList,
                isUserLoginned,
                setIsUserLoginned,
                isShowFilterList,
                setIsShowFilterList,
                successToast,
                errorToast,
                infoToast,
                setIsShowSearch,
                setSearchItems
            }}>
                <SerachBox show={isShowSearch} items={searchItems} />
                <div className="app">
                    <Header />
                    {router}
                    <Footer />
                </div>
            </authContext.Provider>

        </>
    )
}

export default App;