import WriterApi from "../../api/WriterApi";
import React, {useEffect, useState} from "react";
import SeriesApi from "../../api/SeriesApi";
import SeriesPage from "../SeriesPage/series-page";
import {NavLink} from 'react-router-dom';


function WriterDashboard (){
    const [writer, setWriter] = useState([]);
    const [series, setSeries] = useState([]);

    useEffect(() => {
        const fetchWriter = async() => {
            const rsp = WriterApi.getLoggedInWriter();
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

    return(
        <div>
            <div className="m-4">
                <NavLink class="px-2 py-1 rounded-md text-slate-50 bg-orange-700 hover:bg-orange-800"
                         to={{
                             pathname: '/newSeries',
                             state: {writer: {writer}}
                         }}>
                    Create New Series
                </NavLink>
            </div>
            <SeriesPage allSeries={series} fromWriter={true}></SeriesPage>
        </div>
    );
}
export default WriterDashboard;