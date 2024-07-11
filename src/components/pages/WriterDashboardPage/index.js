import WriterApi from "../../../api/WriterApi";
import React, {useEffect, useState} from "react";
import SeriesApi from "../../../api/SeriesApi";
import {useNavigate, useParams} from 'react-router-dom';
import SeriesPageWriterView from "./SeriesPageWriterView/SeriesPageWriterView";
import SeriesPage from "../SeriesPage/series-page";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronRight, faCompass, faSquareCaretRight} from "@fortawesome/free-solid-svg-icons";
import PaginationBar from "../../reusable/PaginationBar";
import WriterDashboardSidebar from "../../reusable/Sidebar/WriterDashboardSidebar";


function WriterDashboard (){
    const { penName } = useParams();
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

    function toggleSidebar() {

    }

    if(sessionStorage.getItem("jwt") !== null && sessionStorage.getItem("penName") === penName) {
        return (
            <div>
                <button onClick={()=>toggleSidebar()}
                    className="md:hidden my-0 p-0 border-2 border-slate-300 w-1/12">
                    <FontAwesomeIcon className="size-8" icon={faChevronRight} />
                </button>
                <WriterDashboardSidebar writer={writer} penName={penName}/>
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