import StandardApi from "./StandardApi";

class AuthorizationApi extends StandardApi{
    postNewUser(user){
        return this.post('/api/auth/signup', user).then(response => response.json());
    }

    postLogin(user){
        return this.post('/api/auth/login', user).then(response => response.json());
    }

    postResetPassword(email){
        return this.postParam(`/api/auth/resetPassword?email=${email}`);
    }

    postNewPassword(passwordDto){
        return this.post('/api/auth/savePassword', passwordDto).then(response => response.json());
    }
}

export default new AuthorizationApi();