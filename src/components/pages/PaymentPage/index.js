import {useLocation} from "react-router-dom";

function PaymentPage(){
    const location = useLocation();

    function submitPayment() {
        const seriesId = location.state.series.series.seriesId
        window.location.href = `https://buy.stripe.com/test_3cs2axcER5aJ73aaEE?client_reference_id=${seriesId}`;
    }

    return(
        <div>
            <section>
                <div>
                    <img src="/images/logo.png" alt="The cover of Stubborn Attachments"/>
                    <div>
                        <h3>Remove Reader Limit for Email Series</h3>
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