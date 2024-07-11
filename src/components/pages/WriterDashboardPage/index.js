import WriterApi from "../../../api/WriterApi";
import React, {useEffect, useState} from "react";
import SeriesApi from "../../../api/SeriesApi";
import {useParams} from 'react-router-dom';
import SeriesPageWriterView from "./SeriesPageWriterView/SeriesPageWriterView";
import SeriesPage from "../SeriesPage/series-page";
import PaginationBar from "../../reusable/PaginationBar";
import WriterDashboardSidebar from "../../reusable/Sidebar/WriterDashboardSidebar";
import SidebarToggle from "../../reusable/SidebarToggle";


function WriterDashboard (){
    const { penName } = useParams();
    const [writer, setWriter] = useState([]);
    const [series, setSeries] = useState([]);
    const [pageNum, setPageNum] = useState(0);
    const [viewSidebar, setViewSidebar] = useState(false);

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

    if(sessionStorage.getItem("jwt") !== null && sessionStorage.getItem("penName") === penName) {
        return (
            <div>
                <SidebarToggle view={viewSidebar} setView={setViewSidebar}/>
                <WriterDashboardSidebar writer={writer} penName={penName} view={viewSidebar}/>
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