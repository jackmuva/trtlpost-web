import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleLeft, faPenToSquare} from "@fortawesome/free-solid-svg-icons";
import React, {useState} from "react";
import EntryApi from "../../../../api/EntryApi";
import SeriesApi from "../../../../api/SeriesApi";
import {useLocation} from "react-router-dom";

function EditSeriesSidebar({data, pageNum, setPageNum, setEdited}){
    const location = useLocation();
    const [load, setLoad] = useState(false);
    const createEntry = () => {
        setLoad(true);
        let entry = {
            seriesId: location.state.series.series.seriesId,
            entryJson: "{\"blocks\":[{\"type\":\"paragraph\",\"data\":{\"text\":\"Start Writing\"}}],\"version\":\"2.28.0\"}",
            entryHtml: "",
            orderNum: data.series.numEntries + 1,
            title: "New Entry",
            email: location.state.series.series.email
        }
        EntryApi.postNewEntry(entry).then(() => {
            incrementSeries().then(() => {
                if(data.series.numEntries % 10 === 0){
                    setPageNum(pageNum + 1);
                }else{
                    setEdited(true);
                    setLoad(false);
                }
            });
        });
    };

    const incrementSeries = async() => {
        let updSeries = {...data.series, numEntries: data.series.numEntries + 1};
        console.log(updSeries);
        const updateSeries = async(ser) => {
            await SeriesApi.putSeries(ser);
        }
        await updateSeries(updSeries);
    };

    let writerUrl = "/writer/" + sessionStorage.getItem("penName");

    return(
        <aside className="hidden md:flex mt-10 fixed top-20 left-0 z-40 w-64 h-screen pt-10 transition-transform -translate-x-full sm:translate-x-0
                                bg-slate-100 rounded-2xl">
            <div className="h-full px-3 overflow-y-auto">
                <ul className="space-y-2 font-medium">
                    <li className="hover:bg-gray-200 rounded-xl p-4 border-b-2">
                        <FontAwesomeIcon icon={faPenToSquare}/>
                        <button className="pl-2 text-xl" onClick={() => createEntry()} type="submit" disabled={load}>
                            Create New Entry
                        </button>
                    </li>
                    <li className="hover:bg-gray-200 rounded-xl p-4 border-b-2">
                        <FontAwesomeIcon icon={faCircleLeft}/>
                        <a className="pl-2 text-xl" href={writerUrl}>Back to Series Page</a>
                    </li>
                </ul>
            </div>
        </aside>
    );
}
export default EditSeriesSidebar;