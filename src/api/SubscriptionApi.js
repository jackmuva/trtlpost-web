import StandardApi from "./StandardApi";

class SubscriptionApi extends StandardApi{

    getAllSubscriptions(){
        return this.get('api/subscription/getAll').then(response => response.json())
    }
    postNewSubscription(subscription){
        return this.post('/api/subscription/new', subscription).then(response => response.json());
    }
    deleteSubscription(email, seriesId){
        return this.delete(`/api/subscription/cancelSubscription/${email}/${seriesId}`)
    }

}
export default new SubscriptionApi();