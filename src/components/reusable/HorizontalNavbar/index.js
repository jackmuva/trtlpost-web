import React from "react";

function HorizontalNavbar({writerUrl}){
    return (
        <ul className="hidden md:flex mr-10 font-semibold">
            <li className="mr-6 p-1">
                <a className="text-xl font-sans text-indigo-700 hover:text-blue-300" href="/">Home</a>
            </li>
            {sessionStorage.getItem("jwt") == null && <li className="mr-6 p-1">
                <a className="text-xl font-sans text-indigo-700 hover:text-blue-300" href="/signup">Sign Up</a>
            </li>}
            {sessionStorage.getItem("jwt") == null && <li className="mr-6 p-1">
                <a className="text-xl font-sans text-indigo-700 hover:text-blue-300" href="/login">Login</a>
            </li>}
            <li className="mr-6 p-1">
                <a className="text-xl font-sans text-indigo-700 hover:text-blue-300" href="/about">About</a>
            </li>
            {sessionStorage.getItem("jwt") != null && <li className="mr-6 p-1">
                <a className="text-xl font-sans text-indigo-700 hover:text-blue-300"
                   href={writerUrl}>{sessionStorage.getItem("penName")}</a>
            </li>}
        </ul>
    );
}
export default HorizontalNavbar;