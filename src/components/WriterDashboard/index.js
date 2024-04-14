import WriterApi from "../../api/WriterApi";
import React, {useEffect, useState} from "react";
import SeriesApi from "../../api/SeriesApi";
import {NavLink, useParams} from 'react-router-dom';
import SeriesPageWriterView from "./SeriesPageWriterView/SeriesPageWriterView";
import SeriesPage from "../SeriesPage/series-page";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPenNib} from "@fortawesome/free-solid-svg-icons";


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
                <aside class="mt-10 fixed top-20 left-0 z-40 w-64 h-screen pt-10 transition-transform -translate-x-full sm:translate-x-0 bg-gradient-to-t from-gray-200">
                    <div className="h-full px-3 overflow-y-auto">
                        <ul className="space-y-2 font-medium">
                            <li class = "hover:bg-gray-200 rounded-xl p-4">
                                <FontAwesomeIcon icon={faPenNib} />
                                <NavLink class="ms-3 text-xl"
                                         to={{
                                             pathname: `${penName}/newSeries`,
                                             state: {type: 'create', writer: {writer}}
                                         }}>
                                    Create New Series
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </aside>
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