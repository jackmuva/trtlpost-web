import React, { useState} from "react";
import SubscriptionApi from "../../api/SubscriptionApi";
import {toast} from "react-toastify";

function UnsubscribePage () {
    const [seriesId, setSeriesId] = useState(null);
    const [email, setEmail] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    const handleInputChange = (e) => {
        const {id , value} = e.target;
        if(id === "email"){
            setEmail(value);
        }
        if(id === "seriesId"){
            setSeriesId(value);
        }
    }

    const handleSubmit = () => {
        if(email === null){
            setErrorMessage("Missing email");
        } else if (seriesId === null){
            setErrorMessage("Missing Series Id");
        }
        else{
            SubscriptionApi.deleteSubscription(email, seriesId).then(() => {
                    toast.success("Successfully Unsubscribed");
            });
        }
    };

    return (
        <div className="flex flex-col m-6 space-y-10 bg-white shadow-2xl rounded-2xl
                md:flex-row md:space-y-0 md:mx-52">
            <div className="p-6 md:p-20">
                <h2 className="font-sans test-4xl font-bold mb-2">Unsubscribe</h2>
                <p className="mb-2 max-2-sm font-sans font-light text-gray-600">
                    Input your email and the Series Id found in your email to unsubscribe
                </p>
                <input type="email" id="email"
                       className="h-1 w-full p-6 mb-2 border border-gray-300 rounded-md placeholder:font-sans placeholder:font-light"
                       placeholder="Email" onChange={(e) => handleInputChange(e)}/>
                <input type="text" id="seriesId"
                       className="h-1 w-full p-6 mb-2 border border-gray-300 rounded-md placeholder:font-sans placeholder:font-light"
                       placeholder="Series Id" onChange={(e) => handleInputChange(e)}/>
                {errorMessage && <div className="text-red-700 my-2"> {errorMessage} </div>}
                <div>
                    <button
                        className="w-full md:w-auto h-1 flex justify-center items-center p-6 space-x-4 font-sans font-bold text-white rounded-md shadow-lg px-9 bg-cyan-700 shadow-cyan-100 hover:bg-opacity-90 shadow-sm hover:shadow-lg border transition hover:-translate-y-0.5 duration-150"
                        onClick={() => handleSubmit()} type="submit">Unsubscribe
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UnsubscribePage;