import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPenNib} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import {useNavigate} from "react-router-dom";


function WriterDashboardSidebar({writer, penName}){
    const navigate = useNavigate();
    function redirectToNewSeries() {
        navigate(`/writer/${penName}/newSeries`, {state: {type: 'create', writer: {writer}}});
    }

    return(
        <aside className="hidden md:flex mt-10 ml-2 mb-4 fixed top-20 left-0 z-40 w-64 h-5/6 pt-10 transition-transform -translate-x-full sm:translate-x-0
                                bg-slate-100 rounded-2xl h-full px-3 overflow-y-auto">
                <ul className="space-y-2 font-medium">
                    <li className="hover:bg-gray-300 rounded-xl p-4 border-b-2">
                        <FontAwesomeIcon icon={faPenNib}/>
                        <button onClick={() => redirectToNewSeries()}
                                className="ms-3 text-xl">
                            Create New Series
                        </button>
                    </li>
                </ul>
        </aside>
    );
}
export default WriterDashboardSidebar;