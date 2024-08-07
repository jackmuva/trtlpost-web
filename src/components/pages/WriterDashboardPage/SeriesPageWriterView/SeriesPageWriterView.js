import React from "react";
import SeriesWriterView from "../../../reusable/SeriesWriterView/SeriesWriterView";

const SeriesPageWriterView = ({ allSeries }) => {

    if(allSeries.length === 0) {
        return (
            <div className="mx-4 md:pl-20 flex items-center md:mx-52">
                <div className="flex flex-col my-3 space-y-0 mx-6 min-w-full text-center items-center">
                    <h3 className="my-8 font-sans text-3xl"> No Series Yet </h3>
                </div>
            </div>
        );
    }
    else {
        const arraySeriesItems = allSeries.map(series =>
            <SeriesWriterView series={series}/>
        );
        return (
            <div class = "mx-4 md:pl-20 md:mr-52 md:ml-72 flex items-center">
                <div class = "flex flex-col my-3 space-y-0 mx-6 min-w-full">
                    {arraySeriesItems}
                </div>
            </div>
        );
    }

}

export default SeriesPageWriterView;