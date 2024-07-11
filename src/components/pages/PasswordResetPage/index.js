import React, { useState } from "react";
import AuthorizationApi from "../../../api/AuthorizationApi";
import {Navigate, useParams} from 'react-router-dom';
import {toast} from "react-toastify";

function PasswordResetPage () {
    const { token } = useParams();
    const [password,setPassword] = useState(null);
    const [confirmPassword,setConfirmPassword] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    const handleInputChange = (e) => {
        const {id , value} = e.target;
        if(id === "password"){
            setPassword(value);
        }
        if(id === "confirmPassword"){
            setConfirmPassword(value);
        }
    }

    const handleSubmit = () => {
        if(password !== confirmPassword){
            setErrorMessage("Password does not match");
        }
        else{
            let pwDto = {
                token: token,
                newPassword: password
            };
            AuthorizationApi.postNewPassword(pwDto).then(function(data){
                console.log(data);
                if(data.httpStatusCode !== 200){
                    setErrorMessage(data.message);
                }
                else{
                    toast.success("Successfully Changed Password");
                    setErrorMessage("Successfully Changed Password");
                }
            });
        }
    };

    if(errorMessage === "Successfully Changed Password"){
        return <Navigate to='/login'  />
    }
    else{
        return(
            <div className="flex flex-col m-6 space-y-10 bg-white shadow-2xl rounded-2xl
                md:flex-row md:space-y-0 md:mx-52">
                <div className="p-6 mr-80 md:p-20 flex-col">
                    <h2 className="font-sans test-4xl font-bold mb-2">Password Recovery</h2>
                    <input type="password" id="password" class="h-1 w-80 p-6 mb-2 border border-gray-300 rounded-md placeholder:font-sans placeholder:font-light"
                           placeholder="Password" onChange = {(e) => handleInputChange(e)}/>
                    <input type="password" id="confirmPassword" class="h-1 w-80 p-6 mb-2 border border-gray-300 rounded-md placeholder:font-sans placeholder:font-light"
                           placeholder="Confirm Password" onChange = {(e) => handleInputChange(e)}/>
                    {errorMessage && <div class="text-red-700 my-2"> {errorMessage} </div>}
                    <div>
                        <button class="h-1 flex justify-center items-center p-6 space-x-4 font-sans font-bold text-white rounded-md shadow-lg px-9 bg-cyan-700 shadow-cyan-100 hover:bg-opacity-90 shadow-sm hover:shadow-lg border transition hover:-translate-y-0.5 duration-150"
                                onClick={() => handleSubmit()} type="submit">Change Password</button>
                    </div>
                </div>
                <div>
                    <img src="/images/bellevue-sunset.png" className="h-full hidden md:block rounded-r-2xl" alt="sunset image"/>
                </div>
            </div>);
    }
};

export default PasswordResetPage;