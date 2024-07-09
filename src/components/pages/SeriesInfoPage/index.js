import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import SeriesApi from "../../../api/SeriesApi";
import EntryApi from "../../../api/EntryApi";
import EntryPreview from "../../reusable/EntryPreview";
import Series from "../../reusable/Series";


const SeriesInfoPage = () => {
    const { seriesId } = useParams();
    const [series, setSeries] = useState([]);
    const [entry, setEntry] = useState(null);

    useEffect(() => {
        const fetchSeries = async () => {
            const rsp = SeriesApi.getSeriesById(seriesId);
            const series = await rsp;
            setSeries(series);
        };
        const fetchEntry = async () => {
            const rsp = EntryApi.getFirstEntryBySeriesId(seriesId);
            const ent = await rsp;
            setEntry(ent);
        }

        fetchEntry();
        fetchSeries();
    }, []);

    if(series.length !== 0 && entry != null) {
        return (
            <div className="flex-col md:m-6 m-2 space-y-6 bg-white shadow-2xl rounded-2xl
                md:flex-row md:space-y-0 md:mx-52">
                <div className="md:px-20 sm:px-2 pt-20">
                    <Series series={series} preview = {true} />
                </div>
                <div className="pt-10 mt-0 md:px-20 px-2 mb-0">
                    <h2 className="md:ml-10">First Entry Preview:</h2>
                    <EntryPreview entry = {entry}></EntryPreview>
                </div>
            </div>
        );
    } else{
        return(
            <div className="flex flex-col md:m-6 sm:m-2 space-y-10 bg-white shadow-2xl rounded-2xl
                    md:flex-row md:space-y-0 md:mx-52">
                <div className="p-6 md:p-20">
                    <h1>Email Series does not exist</h1>
                </div>
            </div>
        );
    }
}
export default SeriesInfoPage;