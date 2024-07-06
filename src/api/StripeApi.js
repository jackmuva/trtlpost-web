import StandardApi from "./StandardApi";

class StripeApi extends StandardApi{
    postPayment(){
        return this.postWithAuthWithParam('/api/payments/increaseReaderCount').then(response => response.json());
    }
}
export default new StripeApi();