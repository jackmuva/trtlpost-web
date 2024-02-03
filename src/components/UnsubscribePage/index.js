import React, {useEffect} from "react";
import {useParams} from "react-router-dom";
import SubscriptionApi from "../../api/SubscriptionApi";

function UnsubscribePage () {
    const { email, seriesId } = useParams();

    useEffect(() => {
        SubscriptionApi.deleteSubscription(email, seriesId);
    }, []);

    console.log(seriesId);
    console.log(email);

    return (
        <div className="flex flex-col m-6 space-y-10 bg-white shadow-2xl rounded-2xl
                md:flex-row md:space-y-0 md:mx-52">
            <div className="p-6 md:p-20">
                <h2 className="font-sans test-4xl font-bold mb-2">Unsubscribe</h2>
                <p className="mb-2 max-2-sm font-sans">
                    You have been unsubscribed from the series. Thanks for visiting TrtlPost
                </p>
            </div>
        </div>
    );
};

export default UnsubscribePage;