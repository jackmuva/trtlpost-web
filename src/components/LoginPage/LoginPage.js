import { useState } from "react";
import AuthorizationApi from "../../api/AuthorizationApi";
import {Redirect} from "react-router-dom";
import WriterApi from "../../api/WriterApi";

function LoginPage ({setWriter}) {
    const [email, setEmail] = useState(null);
    const [password,setPassword] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    const handleInputChange = (e) => {
        const {id , value} = e.target;
        if(id === "email"){
            setEmail(value);
        }
        if(id === "password"){
            setPassword(value);
        }
    }

    const handleSubmit = () => {
        let user = {
            usernameOrEmail: email,
            password: password
        }
        AuthorizationApi.postLogin(user).then(function(data) {
            if(data.accessToken){
                sessionStorage.setItem("jwt", data.accessToken);
                WriterApi.getLoggedInWriter().then(function(data){
                    setWriter(data);
                });
                setErrorMessage("Login Successful");

            }
            else{
                setErrorMessage("Login Unsuccessful");
            }
        }).catch((err) => setErrorMessage("Login Unsuccessful"));
    };

    if(errorMessage === "Login Successful"){
        return <Redirect to='/writerDashboard'  />
    }
    else {
        return (
            <div class="w-screen flex items-center justify-center">
                <div class="flex flex-col m-6 space-y-10 bg-white shadow-2xl rounded-2xl
                    md:flex-row md:space-y-0 md:mx-52 w-1/2">
                    <div class="p-6 md:p-20">
                        <h2 class="font-sans test-4xl font-bold mb-2">Log In</h2>
                        <p class="mb-2 max-2-sm font-sans font-light text-gray-600">
                            Log in to your account to draft and publish your email series
                        </p>
                        <input type="email" id="email" class="h-1 w-full p-6 mb-2 border border-gray-300 rounded-md placeholder:font-sans placeholder:font-light"
                               placeholder="Email" onChange={(e) => handleInputChange(e)}/>
                        <input type="password" id="password" class="h-1 w-full p-6 mb-2 border border-gray-300 rounded-md placeholder:font-sans placeholder:font-light"
                               placeholder="Password"
                               onChange={(e) => handleInputChange(e)}/>
                        {errorMessage && <div class="text-red-700 my-2"> {errorMessage} </div>}
                        <div>
                            <button class="w-full md:w-auto h-1 flex justify-center items-center p-6 space-x-4 font-sans font-bold text-white rounded-md shadow-lg px-9 bg-cyan-700 shadow-cyan-100 hover:bg-opacity-90 shadow-sm hover:shadow-lg border transition hover:-translate-y-0.5 duration-150"
                                    onClick={() => handleSubmit()} type="submit">Login</button>
                        </div>
                    </div>
                    <div>
                        <img src="images/pug-mug.png" class="h-full hidden md:block rounded-r-2xl" alt=""/>
                    </div>
                </div>
            </div>
        );
    }
};

export default LoginPage;