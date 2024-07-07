import WriterApi from "../../../api/WriterApi";
import React, {useEffect, useState} from "react";
import SeriesApi from "../../../api/SeriesApi";
import {useNavigate, useParams} from 'react-router-dom';
import SeriesPageWriterView from "./SeriesPageWriterView/SeriesPageWriterView";
import SeriesPage from "../SeriesPage/series-page";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPenNib} from "@fortawesome/free-solid-svg-icons";
import PaginationBar from "../../reusable/PaginationBar";


function WriterDashboard (){
    const { penName } = useParams();
    const navigate = useNavigate();
    const [writer, setWriter] = useState([]);
    const [series, setSeries] = useState([]);
    const [pageNum, setPageNum] = useState(0);

    useEffect(() => {
        const fetchWriter = async() => {
            const rsp = WriterApi.getWriter(penName);
            const wr = await rsp;
            setWriter(wr);
        }
        fetchWriter();
    }, []);

    useEffect(() => {
        const fetchAllSeries = async(name) => {
            const rsp = SeriesApi.getSeriesByWriter(name, pageNum);
            const wrSeries = await rsp;
            setSeries(wrSeries);
        }
        const fetchPublishedSeries = async(name) => {
            const rsp = SeriesApi.getPublishedSeriesByWriter(name, pageNum);
            const wrSeries = await rsp;
            setSeries(wrSeries);
        }
        if(sessionStorage.getItem("jwt") !== null && sessionStorage.getItem("penName") === penName){
            fetchAllSeries(penName);
        } else {
            fetchPublishedSeries(penName);
        }

    }, [pageNum])

    function redirectToNewSeries() {
        navigate(`/writer/${penName}/newSeries`, {state: {type: 'create', writer: {writer}}});
    }

    if(sessionStorage.getItem("jwt") !== null && sessionStorage.getItem("penName") === penName) {
        return (
            <div>
                <aside class="mt-10 ml-2 mb-4 fixed top-20 left-0 z-40 w-64 h-5/6 pt-10 transition-transform -translate-x-full sm:translate-x-0
                                bg-slate-200 rounded-2xl">
                    <div className="h-full px-3 overflow-y-auto">
                        <ul className="space-y-2 font-medium">
                            <li class = "hover:bg-gray-300 rounded-xl p-4">
                                <FontAwesomeIcon icon={faPenNib} />
                                <button onClick = {() => redirectToNewSeries()}
                                    class="ms-3 text-xl">
                                    Create New Series
                                </button>
                            </li>
                        </ul>
                    </div>
                </aside>
                <SeriesPageWriterView allSeries={series}></SeriesPageWriterView>
                <div className="flex flex-col w-screen items-center text-center">
                    <PaginationBar page = {pageNum} setPage = {setPageNum} searchTerm = ""
                                   primaryApi={(page) => { return SeriesApi.getSeriesByWriter(penName, page)}}>
                    </PaginationBar>
                </div>
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