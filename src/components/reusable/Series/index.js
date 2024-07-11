import SubscribeModal from "../SubscribeModal";
import React from "react";

const Series = ({ series , preview}) => {
    let seriesUrl = '../series/' + series.seriesId;
    return (
        <div class="flex md:flex-row flex-col border-b-2 border-stone-200">
            <div class="p-1 m-0 md:basis-5/6">
                <div class = "flex-auto">
                    <div className="flex">
                        {!preview && <a href={seriesUrl} class="basis-5/6 mb-0 font-sans md:text-4xl text-2xl text-indigo-700 font-bold hover:text-blue-300"> {series.title}</a>}
                        {preview && <h1 to={{ pathname:`series/${series.seriesId}`}} class="basis-5/6 mb-0 font-sans md:text-4xl text-2xl text-indigo-700 font-bold"> {series.title}</h1>}

                    </div>
                    <h3 class="text-lg ml-3 my-0 font-sans md:text-base"> Written By: {series.penName}</h3>
                    <h3 class="text-lg font-sans text-base overflow-auto">Summary: {series.summary}</h3>
                </div>
                <div class="flex">
                    <p class="mr-3 font-sans"> Total Entries: <strong>{series.numEntries}</strong> </p>
                    <p class="mr-3 font-sans"> Cadence: <strong>Every {series.cadence} day(s)</strong></p>
                    {series.tags !== '' &&
                        <p class="mr-3 font-sans"> Tags: <strong>{series.tags}</strong></p>}
                </div>
            </div>
            <div className="md:basis-1/6 mb-2">
                <SubscribeModal series={series}></SubscribeModal>
            </div>
        </div>
    );
};
export default Series;