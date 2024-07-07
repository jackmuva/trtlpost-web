import {useEffect, useState} from "react";
import StripeApi from "../../../api/StripeApi";
import {useSearchParams} from "react-router-dom";


function PaymentConfirmationPage(){
    const [message, setMessage] = useState("");
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        StripeApi.checkPayment(searchParams.get("checkout_session_id")).then((response) => {
            setMessage(response.message);
        });
    }, []);

    return(
        <div>
            <section>
                <p>{message}</p>
            </section>
        </div>
    );
}
export default PaymentConfirmationPage;