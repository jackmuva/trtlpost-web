import {useLocation} from "react-router-dom";
import React, {useEffect, useState} from "react";
import EntryApi from "../../api/EntryApi";
import Entry from "../Entry";
import SeriesApi from "../../api/SeriesApi";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleLeft, faPenToSquare} from "@fortawesome/free-solid-svg-icons";

function EditSeriesPage(){
    const [entries, setEntries] = useState([]);
    const [edited, setEdited] = useState(false);
    const location = useLocation();

    useEffect(() =>{
        const fetchEntries = async() => {
            const rsp = EntryApi.getEntriesBySeriesId(location.state.series.series.seriesId);
            const entryRes = await rsp;
            setEntries(entryRes);
        }
        fetchEntries();
        setEdited(false);
    }, [edited]);

    const createEntry = (maxOrder) => {
        let entry = {
            seriesId: location.state.series.series.seriesId,
            entryJson: "{\"blocks\":[{\"type\":\"paragraph\",\"data\":{\"text\":\"Start Writing\"}}],\"version\":\"2.28.0\"}",
            entryHtml: "",
            orderNum: maxOrder,
            title: "New Entry",
            email: location.state.series.series.email
        }
        EntryApi.postNewEntry(entry).then(() => {
            incrementSeries();
            setEntries([...entries, entry]);
            setEdited(true);
        });
    };

    const incrementSeries = () => {
        let series = location.state.series.series;
        series.numEntries = series.numEntries + 1;
        const updateSeries = async (ser) => {
            await SeriesApi.putSeries(ser);
        }
        updateSeries(series);
    };

    let writerUrl = "/writer/" + sessionStorage.getItem("penName");
    if(entries.length === 0){
        return (
            <div>
                <aside
                    className="mt-10 fixed top-20 left-0 z-40 w-64 h-screen pt-10 transition-transform -translate-x-full sm:translate-x-0 bg-gradient-to-t from-gray-200">
                    <div className="h-full px-3 overflow-y-auto">
                        <ul className="space-y-2 font-medium">
                            <li className="hover:bg-gray-200 rounded-xl p-4">
                                <FontAwesomeIcon icon={faPenToSquare}/>
                                <button className="pl-2 text-xl" onClick={() => createEntry(1)}
                                        type="submit">
                                    Create New Entry
                                </button>
                            </li>
                            <li className="hover:bg-gray-200 rounded-xl p-4">
                                <FontAwesomeIcon icon={faCircleLeft} />
                                <a className="pl-2 text-xl" href={writerUrl}>Back to Series Page</a>
                            </li>
                        </ul>
                    </div>
                </aside>
                <div className="pl-20 flex items-center md:mx-52">
                    <div className="flex flex-col my-3 space-y-0 mx-6 min-w-full text-center items-center">
                        <h3 className="my-8 font-sans text-3xl"> No Entries Yet </h3>
                    </div>
                </div>
            </div>);
    } else{
        let maxOrder = 1;
        maxOrder = entries.sort(function(a, b){return a.orderNum - b.orderNum})[entries.length - 1].orderNum;
        const entryItems = entries.sort(function(a, b){return a.orderNum - b.orderNum}).map(entry => {
            return (
                <div>
                    <Entry entry = {entry} maxEntry = {maxOrder} setEdited = {setEdited}></Entry>
                </div>);
        });
        return(
            <div>
                <aside
                    className="mt-10 fixed top-20 left-0 z-40 w-64 h-screen pt-10 transition-transform -translate-x-full sm:translate-x-0 bg-gradient-to-t from-gray-200">
                    <div className="h-full px-3 overflow-y-auto">
                        <ul className="space-y-2 font-medium">
                            <li className="hover:bg-gray-200 rounded-xl p-4">
                                <FontAwesomeIcon icon={faPenToSquare}/>
                                <button class = "pl-2 text-xl" onClick={() => createEntry(maxOrder + 1)} type="submit">
                                    Create New Entry
                                </button>
                            </li>
                            <li className="hover:bg-gray-200 rounded-xl p-4">
                                <FontAwesomeIcon icon={faCircleLeft} />
                                <a className="pl-2 text-xl" href={writerUrl}>Back to Series Page</a>
                            </li>
                        </ul>
                    </div>
                </aside>
                <div className="pl-20 flex flex-col md:mx-52 flex flex-col my-3 space-y-0 mx-6">
                    { entryItems }
                </div>
            </div>
        );
    }
}
export default EditSeriesPage;