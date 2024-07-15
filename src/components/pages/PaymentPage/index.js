import {useLocation} from "react-router-dom";
import StripeApi from "../../../api/StripeApi";

function PaymentPage(){
    const location = useLocation();

    function submitPayment() {
        const seriesId = location.state.series.series.seriesId
        window.location.href = StripeApi.retrieveStripeLink(seriesId);
    }

    return(
        <div className="w-screen flex items-center justify-center">
            <div className="flex flex-col m-6 space-y-10 bg-white shadow-2xl rounded-2xl
                    md:flex-row md:space-y-0 md:mx-52 md:w-1/2">
                <div className="p-6 md:p-20">
                    <h2 className="font-sans font-bold mb-2">$10 - Reader Cap Removal</h2>
                    <h3 className="font-sans mb-2">What is a reader cap removal?</h3>
                    <p className="mb-2 max-2-sm font-sans font-light text-gray-700">
                        Removing the reader cap means there is no limit on how many people are reading
                        your series at the same time. <br/><br/>
                        This purchase is single purchase (no subscriptions here) per series for the lifetime of this series.
                    </p>
                    <h3 className="font-sans mb-2">Why is there a reader limit?</h3>
                    <p className="mb-2 max-2-sm font-sans font-light text-gray-700">
                        It currently costs about $50 per month to keep this site up. Purchases go to paying for the server and hosting costs of this site.
                    </p>
                    <div>
                        <button
                            className="w-auto md:w-auto h-1 flex justify-center items-center p-6 space-x-4 font-sans
                                        font-bold text-white rounded-md shadow-lg px-9 bg-cyan-700 shadow-cyan-100
                                        hover:bg-opacity-90 shadow-sm hover:shadow-lg border transition hover:-translate-y-0.5 duration-150"
                            onClick={() => submitPayment()} type="submit">Continue to Purchase
                        </button>
                    </div>
                </div>
                <div className="basis-1/2 grow-0 shrink-0">
                    <img src="/images/snorlax.png" className="h-full hidden md:block rounded-r-2xl"
                         alt="Snorlax waiting for you to remove reader limit on your email series"/>
                </div>
            </div>
        </div>
    );
}
export default PaymentPage;