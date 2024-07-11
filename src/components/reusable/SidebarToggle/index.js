import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronLeft, faChevronRight} from "@fortawesome/free-solid-svg-icons";
import React from "react";


function SidebarToggle({view, setView}){
    function toggleSidebar() {
        setView(!view);
    }

    return(
        <button onClick={()=>toggleSidebar()}
                className="md:hidden my-0 p-0 border-2 border-slate-300 w-1/12">
            {!view && <FontAwesomeIcon className="size-8" icon={faChevronRight} />}
            {view && <FontAwesomeIcon className="size-8" icon={faChevronLeft} />}
        </button>
    );
}
export default SidebarToggle;