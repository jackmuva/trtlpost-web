// const apiUrl = "http://localhost:5000";
const apiUrl = "https://trtlmail-rest.com"

export default class StandardApi {
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

    put(url, payload){
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
        console.log("in the put method")
        return fetch(apiUrl.concat(url), {
            method: 'PUT'
        });
    }
}