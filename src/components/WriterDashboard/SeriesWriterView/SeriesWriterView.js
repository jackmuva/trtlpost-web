import {NavLink, Link} from 'react-router-dom';
import React from "react";
import SeriesApi from "../../../api/SeriesApi";
import {toast} from "react-toastify";

const SeriesWriterView = ({ series }) => {

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

    return (
        <div class="grid grid-cols-4 border-b-2 border-stone-200">
            <div class="p-1 m-0 col-span-3">
                <div class = "flex-auto">
                    <NavLink to={{pathname:'/editSeries', state: {series: {series}}}} class="mb-0 font-sans text-4xl font-bold text-blue-800 hover:text-blue-300">
                        {series.title}
                    </NavLink>
                    <h3 class="text-lg ml-3 my-0 font-sans text-base"> Written By: {series.penName}</h3>
                    <h3 class="text-lg font-sans text-base overflow-auto">Summary: {series.summary}</h3>
                </div>
                <div class="flex">
                    <p class="mr-3 font-sans"> Total Entries: <strong>{series.numEntries}</strong> </p>
                    <p class="mr-3 font-sans"> Cadence: <strong>Every {series.cadence} day(s)</strong></p>
                    {series.tags !== '' &&
                        <p class="mr-3 font-sans"> Tags: {series.tags} </p>}
                </div>
            </div>
            <div class="col-span-1 text-center">
                <div class="m-2">
                    <label class="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" class="sr-only peer"
                               onChange={(e) => handleChange(e)} defaultChecked = {series.published} disabled = {series.numEntries === 0}/>
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        <span class="ml-1 font-medium text-gray-900 dark:text-gray-300">Publish</span>
                    </label>
                </div>
                <div>
                    <button className="mb-2 px-4 py-1 rounded-md text-slate-50 bg-blue-600 hover:bg-blue-900">
                        <NavLink class = "text-xl" to={{
                            pathname: `${series.penName}/editSeriesDetails/${series.seriesId}`,
                            state: {type:'edit', series: {series}}
                        }}>
                            Edit Series Details
                        </NavLink>
                    </button>
                </div>
                <button className="mb-2 px-4 py-1 rounded-md text-slate-50 bg-red-700 hover:bg-red-900">
                    <NavLink class = "text-xl" to={{pathname: '/deleteConfirmation', state: {type: 'series', obj: { series }}}}>
                        Delete Series
                    </NavLink>
                </button>
            </div>
        </div>
    );
};
export default SeriesWriterView;