// const apiUrl = "http://localhost:5000";
// const stripeUrl = "https://buy.stripe.com/test_3cs2axcER5aJ73aaEE?client_reference_id=";

const apiUrl = "https://api.trtlpost.com"
const stripeUrl = "https://buy.stripe.com/5kA2b60iqdbY3uw9AB?client_reference_id=";

export default class StandardApi {
    retrieveStripeLink(seriesId) {
        return stripeUrl.concat(seriesId);
    }
    retrieveApiUrl(){
        return apiUrl;
    }

    json(response){
        return response.json().then(data => ({
            data: data,
            status: response.status
        }));
    }

    get(url){
        return fetch(apiUrl.concat(url));
    }

    getWithAuth(url){
        return fetch(apiUrl.concat(url), {
            method: 'GET',
            headers:{
                'Authorization': 'Bearer ' + sessionStorage.getItem("jwt")
            }
        });
    }

    deleteWithAuth(url){
        return fetch(apiUrl.concat(url), {
            method: 'DELETE',
            headers:{
                'Authorization': 'Bearer ' + sessionStorage.getItem("jwt")
            }
        });
    }
    delete(url){
        return fetch(apiUrl.concat(url), {
            method: 'DELETE'
        });
    }
    postWithAuth(url, payload){
        return fetch(apiUrl.concat(url), {
            method: 'POST',
            headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem("jwt")
            },
            body: JSON.stringify(payload)
        });
    }

    post(url, payload){
        return fetch(apiUrl.concat(url), {
            method: 'POST',
            headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });
    }

    postParam(url){
        return fetch(apiUrl.concat(url), {
            method: 'POST',
            headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        });
    }

    postWithAuthWithParam(url){
        return fetch(apiUrl.concat(url), {
            method: 'POST',
            headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem("jwt")
            }
        });
    }

    putWithAuth(url, payload){
        return fetch(apiUrl.concat(url), {
            method: 'PUT',
            headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem("jwt")
            },
            body: JSON.stringify(payload)
        });
    }

    putPayload(url, payload){
        return fetch(apiUrl.concat(url), {
            method: 'PUT',
            headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });
    }

    put(url){
        return fetch(apiUrl.concat(url), {
            method: 'PUT'
        });
    }
}