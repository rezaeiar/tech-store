import Home from "../Pages/Home/Home";
import Catalog from "../Pages/Catalog/Catalog";
import Product from "../Pages/Product/Product";
import ContactUs from "../Pages/ContactUs/ContactUs";
import Authentication from "../Pages/Authentication/Authentication";
import Register from "../Components/Register/Register";
import Login from "../Components/Login/Login";
import ShoppingCart from "../Pages/ShoppingCart/ShoppingCart";
import Redirect from "../Pages/Redirect";
import NotFound from "../Pages/notfound/notfound";

const routes = [
    { path: '/', element: <Home /> },
    { path: '/catalog/*', element: <Redirect to='/catalog/allTypes/allBrands/allSeries/allPrices/allColors' /> },
    { path: '/catalog/:type/:brand/:serie/:price/:color', element: <Catalog /> },
    { path: '/product/:productID', element: <Product /> },
    { path: '/contactus', element: <ContactUs /> },
    {
        path: '/authentication/*', element: <Authentication />, children: [
            { path: 'register', element: <Register /> },
            { path: 'login', element: <Login /> },
        ]
    },
    { path: '/shopping-cart', element: <ShoppingCart /> },
    { path: '/*', element: <NotFound /> },
]
export default routes;