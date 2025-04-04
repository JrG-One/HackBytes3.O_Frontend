import { useState } from "react";
import Footer from "../components/Footers";
import Navbar from "../components/navbar";

const HomePage = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar/>
            <div className="m-14 p-96 flex-grow flex items-center justify-center">
                <h1 >Main Body</h1>
            </div>
            <Footer />
        </div>
    );
};

export default HomePage;