import React from "react";


function VerticalNavbar({writerUrl}){
    return (
        <ul className="flex-col font-semibold space-y-2 mx-20">
            <li className="text-center border-b-2">
                <a className="text-xl font-sans text-indigo-700 hover:text-blue-300" href="/">Home</a>
            </li>
            {sessionStorage.getItem("jwt") == null && <li className="text-center border-b-2">
                <a className="text-xl font-sans text-indigo-700 hover:text-blue-300" href="/signup">Sign Up</a>
            </li>}
            {sessionStorage.getItem("jwt") == null && <li className="text-center border-b-2">
                <a className="text-xl font-sans text-indigo-700 hover:text-blue-300" href="/login">Login</a>
            </li>}
            <li className="text-center border-b-2">
                <a className="text-xl font-sans text-indigo-700 hover:text-blue-300" href="/about">About</a>
            </li>
            {sessionStorage.getItem("jwt") != null && <li className="text-center border-b-2">
                <a className="text-xl font-sans text-indigo-700 hover:text-blue-300" href={writerUrl}>{sessionStorage.getItem("penName")}</a>
            </li>}
        </ul>
    );
}
export default VerticalNavbar;