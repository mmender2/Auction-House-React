import { BrowserRouter as Router , Route,Routes } from "react-router-dom";
import CategoryItemPage from "../Pages/CategoryItemPage/CategoryItemPage";
import ForgotPassword from "../Pages/ForgotPassword/ForgotPassword";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Profile from "../Pages/Profile/Profile";
import SignUp from "../Pages/SignIn/SignUp";


const AppRouter = ()=>{
    return(
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/" element={<Home />} />
                <Route path="/user" element={<Profile />} />
                <Route path="/products" element={<CategoryItemPage />} />
            </Routes>
        </Router>
    )
}

export default AppRouter