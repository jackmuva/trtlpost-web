import React from "react";

function Header() {
    let writerUrl = "/writer/" + sessionStorage.getItem("penName");
    return (
        <div className="mx-auto">
            <header className="flex justify-between items-center sticky top-0 z-10 py-10 bg-gradient-to-b from-blue-300">
                <div className="flex flex-shrink-0 ml-6 cursor-pointer">
                    <a className="flex flex-row text-5xl font-extrabold font-sans text-indigo-700 hover:text-blue-300"
                       href="/">
                        <img src="images/logo.png" className="w-20 rounded-r-2xl md:block mr-2" alt=""/>
                        TrtlPost
                    </a>
                </div>
                <ul className="flex overflow-x-hidden mr-10 font-semibold">
                    <li className="mr-6 p-1">
                        <a className="text-xl font-sans text-indigo-700 hover:text-blue-300" href="/">Home</a>
                    </li>
                    {sessionStorage.getItem("jwt") == null && <li className="mr-6 p-1">
                        <a className="text-xl font-sans text-indigo-700 hover:text-blue-300" href="/signup">Sign Up</a>
                    </li>}
                    {sessionStorage.getItem("jwt") == null && <li className="mr-6 p-1">
                        <a className="text-xl font-sans text-indigo-700 hover:text-blue-300" href="/Login">Login</a>
                    </li>}
                    <li className="mr-6 p-1">
                        <a className="text-xl font-sans text-indigo-700 hover:text-blue-300" href="/about">About</a>
                    </li>
                    {sessionStorage.getItem("jwt") != null && <li className="mr-6 p-1">
                        <a className="text-xl font-sans text-indigo-700 hover:text-blue-300" href={writerUrl}>{sessionStorage.getItem("penName")}</a>
                    </li>}
                </ul>
            </header>
        </div>
    );
};

export default Header;