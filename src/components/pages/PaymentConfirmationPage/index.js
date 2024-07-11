import {useEffect, useState} from "react";
import StripeApi from "../../../api/StripeApi";
import {useNavigate, useSearchParams} from "react-router-dom";


function PaymentConfirmationPage(){
    const [message, setMessage] = useState("");
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        StripeApi.checkPayment(searchParams.get("checkout_session_id")).then((response) => {
            setMessage(response.message);
        });
    }, []);

    const redirectToWriterPage = () => {
        navigate("/writer/" + sessionStorage.getItem("penName"));
    }

    return(
        <div className="flex items-center justify-center">
            <div className="flex flex-col m-6 space-y-10 bg-white shadow-2xl rounded-2xl
                    md:flex-row md:space-y-0 md:mx-52 md:w-1/2 items-center justify-center">
                <div className="p-6 md:p-20">
                    <div className="font-sans text-3xl font-bold mb-8">
                        {message}
                    </div>
                    <div>
                        <button
                            className="w-full md:w-auto h-1 flex justify-center items-center p-4 space-x-4 font-sans text-sm font-bold text-cyan-700 rounded-md shadow-lg my-2 bg-white shadow-cyan-100 hover:bg-opacity-90 shadow-sm hover:shadow-lg border transition hover:-translate-y-0.5 duration-150"
                            onClick={() => redirectToWriterPage()} type="submit">Return to Writer Page
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default PaymentConfirmationPage;