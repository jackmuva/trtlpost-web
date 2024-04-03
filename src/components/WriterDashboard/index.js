import WriterApi from "../../api/WriterApi";
import React, {useEffect, useState} from "react";
import SeriesApi from "../../api/SeriesApi";
import {NavLink, useParams} from 'react-router-dom';
import SeriesPageWriterView from "./SeriesPageWriterView/SeriesPageWriterView";
import SeriesPage from "../SeriesPage/series-page";


function WriterDashboard (){
    const { penName } = useParams();
    const [writer, setWriter] = useState([]);
    const [series, setSeries] = useState([]);

    useEffect(() => {
        const fetchWriter = async() => {
            const rsp = WriterApi.getWriter(penName);
            const wr = await rsp;
            setWriter(wr);
        }
        fetchWriter();
    }, []);

    useEffect(() => {
        const fetchSeries = async(name) => {
            const rsp = SeriesApi.getSeriesByWriter(name);
            const wrSeries = await rsp;
            setSeries(wrSeries);
        }
        if(writer.length !== 0){
            fetchSeries(writer[0].penName)
        }
    }, [writer])

    if(sessionStorage.getItem("jwt") !== null && sessionStorage.getItem("penName") === penName) {
        return (
            <div>
                <div className="m-4">
                    <NavLink class="px-2 py-1 rounded-md text-slate-50 bg-orange-700 hover:bg-orange-800"
                             to={{
                                 pathname: `${penName}/newSeries`,
                                 state: {writer: {writer}}
                             }}>
                        Create New Series
                    </NavLink>
                </div>
                <SeriesPageWriterView allSeries={series}></SeriesPageWriterView>
            </div>
        );
    } else {
        return (
            <div>
                <SeriesPage allSeries={series}></SeriesPage>
            </div>
        );
    }
}
export default WriterDashboard;