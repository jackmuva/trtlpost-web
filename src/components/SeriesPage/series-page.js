import Series from "./Series";
import React from "react";

const SeriesPage = ({ allSeries, fromWriter }) => {

    if(allSeries.length === 0) {
        return (
            <div className="flex items-center md:mx-52">
                <div className="flex flex-col my-3 space-y-0 mx-6 min-w-full text-center items-center">
                    <h3 className="my-8 font-sans text-3xl"> No Series Yet </h3>
                </div>
            </div>
        );
    }
    else {
        const arraySeriesItems = allSeries.map(series =>
            <Series series={series} fromWriterDashboard={fromWriter}/>
        );
        return (
            <div class = "flex items-center md:mx-52">
                <div class = "flex flex-col my-3 space-y-0 mx-6 min-w-full">
                    {arraySeriesItems}
                </div>
            </div>
        );
    }

}

export default SeriesPage;