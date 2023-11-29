const apiUrl = "http://slowcapsules.us-east-1.elasticbeanstalk.com";
// const apiUrl = "http://localhost:5000";
export default class StandardApi {

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
}