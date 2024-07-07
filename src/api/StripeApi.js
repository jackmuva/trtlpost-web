import StandardApi from "./StandardApi";

class StripeApi extends StandardApi{
    checkPayment(session_id){
        return this.postWithAuthWithParam(`/api/payments/checkStatus?checkout_session_id=${session_id}`).then(response => response.json());
    }
}
export default new StripeApi();