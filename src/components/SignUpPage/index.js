import { useState } from "react";
import AuthorizationApi from "../../api/AuthorizationApi";
import WriterApi from "../../api/WriterApi";
import { Redirect } from 'react-router-dom';

function SignUpPage () {
    const [username, setUsername] = useState(null);
    const [email, setEmail] = useState(null);
    const [password,setPassword] = useState(null);
    const [confirmPassword,setConfirmPassword] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    function validateEmail(email) {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    const handleInputChange = (e) => {
        const {id , value} = e.target;
        if(id === "username"){
            setUsername(value);
        }
        if(id === "email"){
            setEmail(value);
        }
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
        } else if (!validateEmail(email)){
            setErrorMessage("Please enter a valid email");
        }
        else{
            let user = {
                username: username,
                email: email,
                password: password
            };
            AuthorizationApi.postNewUser(user);

            let writer = {
                penName: username,
                email: email
            }
            WriterApi.postNewWriter(writer).then(function(data) {
                if(data.writerId){
                    setErrorMessage("Registration Complete");
                }
            });
            setErrorMessage("Error Registering");
        }
    };

    if(errorMessage === "Registration Complete"){
        return <Redirect to='/login'  />
    }
    else{
        return(
            <div className="flex flex-col m-6 space-y-10 bg-white shadow-2xl rounded-2xl
                md:flex-row md:space-y-0 md:mx-52">
                <div className="p-6 md:p-20">
                    <h2 className="font-sans test-4xl font-bold mb-2">Sign Up</h2>
                    <p className="mb-2 max-2-sm font-sans font-light text-gray-600">
                        Sign up to publish email series and share with other readers
                    </p>
                    <input type="text" id="username" class="h-1 w-full p-6 mb-2 border border-gray-300 rounded-md placeholder:font-sans placeholder:font-light"
                           placeholder="Username" onChange = {(e) => handleInputChange(e)}/>
                    <input type="email" id="email" class="h-1 w-full p-6 mb-2 border border-gray-300 rounded-md placeholder:font-sans placeholder:font-light"
                           placeholder="Email" onChange = {(e) => handleInputChange(e)}/>
                    <input type="password" id="password" class="h-1 w-full p-6 mb-2 border border-gray-300 rounded-md placeholder:font-sans placeholder:font-light"
                           placeholder="Password" onChange = {(e) => handleInputChange(e)}/>
                    <input type="password" id="confirmPassword" class="h-1 w-full p-6 mb-2 border border-gray-300 rounded-md placeholder:font-sans placeholder:font-light"
                           placeholder="Confirm Password" onChange = {(e) => handleInputChange(e)}/>
                    {errorMessage && <div class="text-red-700 my-2"> {errorMessage} </div>}
                    <div>
                        <button class="w-full md:w-auto h-1 flex justify-center items-center p-6 space-x-4 font-sans font-bold text-white rounded-md shadow-lg px-9 bg-cyan-700 shadow-cyan-100 hover:bg-opacity-90 shadow-sm hover:shadow-lg border transition hover:-translate-y-0.5 duration-150"
                                onClick={() => handleSubmit()} type="submit">Register</button>
                    </div>
                </div>
                <div>
                    <img src="images/vanc-lake.png" className="h-full hidden md:block rounded-r-2xl" alt=""/>
                </div>
            </div>);
    }
};

export default SignUpPage;