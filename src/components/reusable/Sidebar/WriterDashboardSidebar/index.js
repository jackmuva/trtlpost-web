import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPenNib} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import {useNavigate} from "react-router-dom";


function WriterDashboardSidebar({writer, penName, view}){
    const navigate = useNavigate();
    function redirectToNewSeries() {
        navigate(`/writer/${penName}/newSeries`, {state: {type: 'create', writer: {writer}}});
    }

    return(
        <div className={`${view?'' : 'hidden md:flex'}`}>
            <aside className="md:ml-4 ml-2 px-2 pt-10 h-screen w-1/2 md:w-64 z-40 fixed bg-slate-100 rounded-2xl">
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
        </div>
    );
}
export default WriterDashboardSidebar;