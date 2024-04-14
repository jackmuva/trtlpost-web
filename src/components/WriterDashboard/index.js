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
                    <aside id="default-sidebar"
                           className="fixed top-0 left-0 z-40 w-12 h-screen transition-transform -translate-x-full sm:translate-x-0"
                           aria-label="Sidebar">
                        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-200 dark:bg-gray-800">
                            <ul className="space-y-2 font-medium">
                                <li>
                                    <NavLink class="ms-3"
                                             to={{
                                                 pathname: `${penName}/newSeries`,
                                                 state: {type: 'create', writer: {writer}}
                                             }}>
                                        Create New Series
                                    </NavLink>
                                </li>
                                <li>
                                    <span class="ms-3"> hi </span>
                                </li>
                            </ul>
                        </div>
                    </aside>
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