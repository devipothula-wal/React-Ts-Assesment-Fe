import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import App from "./App";
import Login from "./components/signin/login";
import SignUp from "./components/signin/signup";
// import Expense from "./components/transactions/expenses";
// import Income from "./components/transactions/income";

const MainRoute = () => {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/home" element={<App />} />
                    {/* <Route path="/expenses" element={<Expense />} />
                    <Route path="/income" element={<Income />} /> */}
                    <Route path="/" element={<Login />} />
                </Routes>
            </Router>
        </>
    )
}

export default MainRoute;