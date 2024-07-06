import {useEffect, useState} from "react";
import StripeApi from "../../../api/StripeApi";


function PaymentPage(){
    const [message, setMessage] = useState("");

    useEffect(() => {
        // Check to see if this is a redirect back from Checkout
        const query = new URLSearchParams(window.location.search);

        if (query.get("success")) {
            setMessage("Order placed! You will receive an email confirmation.");
        }

        if (query.get("canceled")) {
            setMessage(
                "Order canceled -- continue to shop around and checkout when you're ready."
            );
        }
    }, []);

    function submitPayment() {
        StripeApi.postPayment().then((data) => {
            console.log("hi");
            setMessage(data.message);
        })
    }

    return(
        <div>
            {message !== "" &&
                <section>
                    <p>{message}</p>
                </section>
            }
            <section>
                <div>
                    <img src="/images/logo.png" alt="The cover of Stubborn Attachments"/>
                    <div>
                        <h3>Stubborn Attachments</h3>
                        <h5>$5.00</h5>
                    </div>
                </div>
                <button type="submit" onClick = {() => submitPayment()}>
                    Checkout
                </button>
            </section>
        </div>
    );
}
export default PaymentPage;