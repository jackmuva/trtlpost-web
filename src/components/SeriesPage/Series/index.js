import SubscribeModal from "../../SubscribeModal";
import {Link} from 'react-router-dom';
import React from "react";

const Series = ({ series , preview}) => {

    return (
        <div class="grid grid-cols-4 border-b-2 border-stone-200">
            <div class="p-1 m-0 col-span-3">
                <div class = "flex-auto">
                    {!preview && <Link to={{ pathname:`series/${series.seriesId}`}} class="mb-0 font-sans text-4xl font-bold hover:text-blue-300"> {series.title}</Link>}
                    {preview && <h1 to={{ pathname:`series/${series.seriesId}`}} class="mb-0 font-sans text-4xl font-bold"> {series.title}</h1>}
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
                <SubscribeModal series = {series}></SubscribeModal>
            </div>
        </div>
    );
};
export default Series;