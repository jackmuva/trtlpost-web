import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import SeriesApi from "../../api/SeriesApi";
import SubscribeModal from "../SubscribeModal";
import EntryApi from "../../api/EntryApi";
import EntryPreview from "./EntryPreview";


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
            <div className="flex-col m-6 space-y-10 bg-white shadow-2xl rounded-2xl
                md:flex-row md:space-y-0 md:mx-52">
                <div className="p-6 md:p-20 grid grid-cols-4 border-b-2 border-stone-200">
                    <div className="col-span-3">
                        <h1>{series[0].title}</h1>
                        <h3 class="ml-3 my-0 font-sans text-base"> Written By: {series[0].penName}</h3>
                        <h3 class="font-sans text-base overflow-auto">Summary: {series[0].summary}</h3>
                        <div className="flex">
                            <p className="mr-3 font-sans text-xs"> Total Entries: <strong>{series[0].numEntries}</strong>
                            </p>
                            <p className="mr-3 font-sans text-xs"> Cadence: <strong>Every {series[0].cadence} days</strong>
                            </p>
                            {series.tags !== '' &&
                                <p className="mr-3 font-sans text-xs"> Tags: {series[0].tags} </p>}
                        </div>
                    </div>
                    <div class="col-span-1 text-center">
                        <SubscribeModal series = {series}></SubscribeModal>
                    </div>
                </div>
                <div className="pt-0 p-10 md:p-20 md:pt-10 mb-0">
                    <h3>First Entry Preview</h3>
                    <EntryPreview entry = {entry}></EntryPreview>
                </div>
            </div>
        );
    } else{
        return(
            <div className="flex flex-col m-6 space-y-10 bg-white shadow-2xl rounded-2xl
                    md:flex-row md:space-y-0 md:mx-52">
                <div className="p-6 md:p-20">
                    <h1>Series does not exist</h1>
                </div>
            </div>
        );
    }
}
export default SeriesInfoPage;