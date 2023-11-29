import {useLocation} from "react-router-dom";
import React, {useEffect, useState} from "react";
import EntryApi from "../../api/EntryApi";
import Entry from "../Entry";
import SeriesApi from "../../api/SeriesApi";

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

    const createEntry = () => {
        let maxOrder = 1;
        if(entries.length > 0){
            maxOrder = entries.sort(function(a, b){return a.orderNum - b.orderNum})[entries.length - 1].orderNum + 1;
        }

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

    if(entries.length === 0){
        return (
            <div>
                <button onClick={() => createEntry()} type="submit"
                        className="m-4 px-2 py-1 rounded-md text-slate-50 bg-orange-700 hover:bg-orange-800">
                    Create New Entry
                </button>
                <div className="flex items-center md:mx-52">
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
                <button onClick={() => createEntry()} type="submit"
                        class="m-4 px-2 py-1 rounded-md text-slate-50 bg-orange-700 hover:bg-orange-800">
                    Create New Entry
                </button>
                <div className="flex flex-col md:mx-52 flex flex-col my-3 space-y-0 mx-6">
                    { entryItems }
                </div>
            </div>
        );
    }
}
export default EditSeriesPage;