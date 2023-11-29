const Header = () =>(
    <div className="mx-auto">
        <header className="flex justify-between items-center sticky top-0 z-10 py-8 bg-gradient-to-b from-blue-300">
            <div className="flex-shrink-0 ml-6 cursor-pointer">
                <i className="fas fa-wind fa-2x text-yellow-500"></i>
                <a className="text-3xl font-extrabold font-sans text-indigo-700 hover:text-blue-300" href="/">Trtlmail</a>
            </div>
            <ul className="flex overflow-x-hidden mr-10 font-semibold">
                <li className="mr-6 p-1">
                    <a className="font-sans text-indigo-700 hover:text-blue-300" href="/">Home</a>
                </li>
                {sessionStorage.getItem("jwt") == null && <li className="mr-6 p-1">
                    <a className="font-sans text-indigo-700 hover:text-blue-300" href="/signup">Sign Up</a>
                </li>}
                {sessionStorage.getItem("jwt") == null && <li className="mr-6 p-1">
                    <a className="font-sans text-indigo-700 hover:text-blue-300" href="/Login">Login</a>
                </li>}
                <li className="mr-6 p-1">
                    <a className="font-sans text-indigo-700 hover:text-blue-300" href="/about">About</a>
                </li>
                {sessionStorage.getItem("jwt") != null && <li className="mr-6 p-1">
                    <a className="font-sans text-indigo-700 hover:text-blue-300" href="/writerDashboard">Writer Home</a>
                </li>}
            </ul>
        </header>
    </div>
);

export default Header;