import {useNavigate, useParams} from 'react-router-dom';
import React from "react";
import SeriesApi from "../../../api/SeriesApi";
import {toast} from "react-toastify";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faToilet, faFeatherPointed, faLockOpen} from "@fortawesome/free-solid-svg-icons";

const SeriesWriterView = ({ series }) => {
    const navigate = useNavigate();
    const {penName} = useParams();

    function getDateTime() {
        let now     = new Date();
        let year    = now.getFullYear();
        let month   = now.getMonth()+1;
        let day     = now.getDate();
        let hour    = now.getHours();
        let minute  = now.getMinutes();
        let second  = now.getSeconds();
        if(month.toString().length === 1) {
            month = '0'+month;
        }
        if(day.toString().length === 1) {
            day = '0'+day;
        }
        if(hour.toString().length === 1) {
            hour = '0'+hour;
        }
        if(minute.toString().length === 1) {
            minute = '0'+minute;
        }
        if(second.toString().length === 1) {
            second = '0'+second;
        }
        let dateTime = year+'-'+month+'-'+day+'T'+hour+':'+minute+':'+second;
        return dateTime;
    };

    const handleChange = (e) => {
            series.datetime = getDateTime();
            series.published = e.target.checked;
            SeriesApi.postSeries(series).then(() => {
                toast.success("Setting Updated");
            });
    };

    function redirectToPayment() {
        navigate(`/payment/${series.seriesId}`, {state:{series: {series}}});
    }

    function redirectToEditSeries() {
        navigate('/editSeries', {state:{series: {series}}});
    }

    function redirectToEditDetails() {
        navigate(`/writer/${penName}/editSeriesDetails/${series.seriesId}`, {state: {type:'edit', series: {series}}});
    }

    function redirectToDelete(){
        navigate('/deleteConfirmation', {state: {type: 'series', obj: { series }}});
    }



    return (
        <div class="p-1 m-0 border-b-2 border-stone-200 space-y-0">
            <div class = "grid grid-cols-4">
                <div className="col-span-3">
                    <button onClick = {() => redirectToEditSeries()}
                            class="text-left basis-5/6 mb-0 font-sans md:text-4xl text-2xl font-bold text-indigo-700 hover:text-blue-300">
                        {series.title}
                    </button>
                    <h3 className="basis-5/6 text-lg ml-3 my-0 font-sans text-base"> Written By: {series.penName}</h3>
                    <h3 className="basis-5/6 text-lg font-sans text-base overflow-auto">Summary: {series.summary}</h3>
                    <div className="flex">
                        <p className="mr-3 font-sans"> Total Entries: <strong>{series.numEntries}</strong></p>
                        <p className="mr-3 font-sans"> Cadence: <strong>Every {series.cadence} day(s)</strong></p>
                        {series.tags !== '' &&
                            <p className="mr-3 font-sans"> Tags: <strong>{series.tags}</strong> </p>}
                    </div>
                </div>
                <div className="col-span-1 mx-2">
                    <div>
                        <div className="flex flex-col space-y-0 md:flex-row md:inline-flex">
                            <span className="font-bold ml-1 font-medium text-gray-900 dark:text-gray-300">Publish</span>
                            <div className="m-2">
                                <label className="relative inline-flex items-center cursor-pointer overflow-y-auto">
                                    <input type="checkbox" className="sr-only peer"
                                           onChange={(e) => handleChange(e)} defaultChecked={series.published}
                                           disabled={series.numEntries === 0}/>
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300
                                                    dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full
                                                    peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px]
                                                    after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full
                                                    after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                </label>
                            </div>
                        </div>
                    </div>
                    <button onClick = {() => redirectToEditDetails()}
                            className="my-1 px-1 md:px-4 py-1 rounded-md text-slate-50 text-base md:text-xl bg-blue-600 hover:bg-blue-900">
                        <FontAwesomeIcon icon={faFeatherPointed} />
                        Edit Series Details
                    </button>
                    <button onClick = {() => redirectToDelete()}
                            className="my-1 px-4 py-1 rounded-md text-slate-50 test-base md:text-xl bg-red-700 hover:bg-red-900">
                        <FontAwesomeIcon icon={faToilet} />
                        Delete Series
                    </button>
                </div>
            </div>
            <div class="flex-col mb-2">
                <div class = "flex">
                    <div class = "justify-center flex text-lg font-sans font-bold"> <p><em>All Time</em> # of Readers: </p></div>
                    <div class = "ml-1 justify-center flex text-lg font-sans font-bold">{series.numAllTimeReaders} reader(s)</div>
                </div>
                <div className="flex">
                    <div className="justify-center flex text-lg font-sans font-bold"><p><em>Current</em> # of Readers:</p></div>
                    <div className="ml-1 justify-center flex text-lg font-sans font-bold text-nowrap">
                        <p>{series.numCurrentReaders} reader(s) </p>
                        {series.maxCurrentReaders !== 2147483647 &&
                            <button onClick = {()=> redirectToPayment()}
                                    className = "ml-1 font-bold text-lg text-indigo-700 text-wrap hover:text-green-100">
                                / 10 max*
                            </button>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};
export default SeriesWriterView;