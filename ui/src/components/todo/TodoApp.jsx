import { useState } from 'react';
import './TodoApp.css';

export default function TodoApp(){
    return (
    <div className="TodoApp">
        Todo Management Application
        <LoginComponent/>
        {/* <WelcomeComponent/> */}
    </div>
    );
}


function LoginComponent(){

    const [username, setUsername] = useState('mohib');
    const [password, setPassword] = useState('khan');

    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState(false);

    function handleUsernameChange(event){
        setUsername(event.target.value);
    }

    function handlePasswordChange(event){
        setPassword(event.target.value);
    }

    function handleSubmit(){
        if(username === 'mohib' && password === 'khan'){
            setShowSuccessMessage(true);
            setShowErrorMessage(false);
        }else{
            setShowSuccessMessage(false);
            setShowErrorMessage(true);
        }
    }

    return (
    <div className="LoginComponent">
        {showSuccessMessage && <div className='successMessage'>Authenticated Successfull</div>}
        {showErrorMessage && <div className='errorMessage'>Authentication Failed</div>}
        <div className="loginFOrm">
            <div>
                <label>Username : </label>
                <input type="text" name="username" value={username} onChange={handleUsernameChange}/>
            </div>
            <div>
                <label>Password : </label>
                <input type="password" name="password" value={password} onChange={handlePasswordChange}/>
            </div>
            <div>
                <button type="button" name="login" onClick={handleSubmit}>Login</button>
            </div>
        </div>
    </div>
    );
}


function WelcomeComponent(){
    return (
    <div className="WelcomeComponent">
        Welcome Component
    </div>
    );
}