import React, {useState} from "react";
import HorizontalNavbar from "../HorizontalNavbar";
import VerticalNavbar from "../VerticalNavbar";

function Header() {
    const [openMenu, setOpenMenu] = useState(false);

    const toggleMenu = () =>{
        setOpenMenu(!openMenu);
    }

    let writerUrl = "/writer/" + sessionStorage.getItem("penName");
    return (
        <div className="mx-auto">
            <header className="flex justify-between items-center sticky fixed top-0 z-50 py-10 bg-gradient-to-b from-blue-300">
                <div className="flex flex-shrink-0 ml-6 cursor-pointer">
                    <a className="flex flex-row text-3xl md:text-5xl font-extrabold font-sans text-indigo-700 hover:text-blue-300"
                       href="/">
                        <img src="/images/logo.png" className="w-20 rounded-r-2xl md:block mr-2" alt="Logo for Trtlpost, a platform for writing and subscribing to email series"/>
                        TrtlPost
                    </a>
                </div>
                <div className="mr-4 md:hidden">
                    <button onClick={() => toggleMenu()}>
                        <svg className="fill-indigo-700" viewBox="0 0 100 80" width="40" height="40">
                            <rect width="75" height="12"></rect>
                            <rect y="25" width="75" height="12"></rect>
                            <rect y="50" width="75" height="12"></rect>
                        </svg>
                    </button>
                </div>
                {!openMenu && <HorizontalNavbar writerUrl={writerUrl}/> }
            </header>
            {openMenu && <VerticalNavbar writerUrl={writerUrl}/>}
        </div>
    );
};

export default Header;