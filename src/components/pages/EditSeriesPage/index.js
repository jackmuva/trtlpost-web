import {useLocation} from "react-router-dom";
import React, {useEffect, useState} from "react";
import EntryApi from "../../../api/EntryApi";
import Entry from "../../reusable/Entry";
import SeriesApi from "../../../api/SeriesApi";
import PaginationBar from "../../reusable/PaginationBar";
import EditSeriesSidebar from "../../reusable/Sidebar/EditSeriesSidebar";
import SidebarToggle from "../../reusable/SidebarToggle";

function EditSeriesPage(){
    const [edited, setEdited] = useState(false);
    const [data, setData] = useState({
        entries: [],
        series: null
    })
    const [pageNum, setPageNum] = useState(0);
    const [viewSidebar, setViewSidebar] = useState(false);
    const location = useLocation();

    useEffect(() =>{
        const fetchEntries = async() => {
            const rsp = EntryApi.getEntriesBySeriesId(location.state.series.series.seriesId, pageNum);
            const entryRes = await rsp;
            return entryRes;
        }
        const fetchSeries = async() => {
            const rsp = SeriesApi.getSeriesById(location.state.series.series.seriesId);
            const ser = await rsp;
            return ser;
        }
        let newData = {};
        fetchEntries().then((entries) => {
            newData.entries = entries;
            fetchSeries().then((series) => {
                newData.series = series;
                setData(newData);
                setEdited(false);
            })
        })

    }, [edited, pageNum]);

    if(data.entries.length === 0){
        return (
            <div>
                <SidebarToggle view={viewSidebar} setView={setViewSidebar}/>
                <EditSeriesSidebar setEdited={setEdited} setPageNum={setPageNum} pageNum={pageNum} data={data} view={viewSidebar}/>
                <div className="mx-4 flex items-center md:pl-20 md:mr-52 md:ml-72">
                    <div className="flex flex-col my-3 space-y-0 mx-6 min-w-full text-center items-center">
                        <h3 className="my-8 font-sans text-3xl"> No Entries Yet </h3>
                    </div>
                </div>
            </div>);
    } else{
        const entryItems = data.entries.sort(function(a, b){return a.orderNum - b.orderNum}).map(entry => {
            return (
                <div>
                    <Entry entry = {entry} maxEntry = {data.series.numEntries} setEdited = {setEdited}></Entry>
                </div>);
        });
        return(
            <div>
                <SidebarToggle view={viewSidebar} setView={setViewSidebar}/>
                <EditSeriesSidebar setEdited={setEdited} setPageNum={setPageNum} pageNum={pageNum} data={data} view={viewSidebar}/>
                <div className="mx-4 md:pl-20 md:mr-52 md:ml-72 flex flex-col my-3 space-y-0">
                    { data.entries.length === 0 ?  <h3 className="my-8 font-sans text-3xl"> No Entries Yet </h3>
                        : entryItems }
                </div>
                <div className="flex flex-col w-screen items-center text-center">
                    <PaginationBar page = {pageNum} setPage = {setPageNum} searchTerm = ""
                                   primaryApi={(page) => { return EntryApi.getEntriesBySeriesId(location.state.series.series.seriesId, page)}}>
                    </PaginationBar>
                </div>
            </div>
        );
    }
}
export default EditSeriesPage;