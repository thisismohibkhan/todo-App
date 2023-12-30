import { useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useParams } from 'react-router-dom';
import './TodoApp.css';

export default function TodoApp(){
    return (
    <div className="TodoApp">
        <BrowserRouter>
            <Routes>
                <Route path="/" element={ <LoginComponent/>}></Route>
                <Route path="/login" element={ <LoginComponent/>}></Route>
                <Route path="/welcome/:username" element={<WelcomeComponent/>}></Route>
                <Route path="*" element={<ErrorComponent/>}></Route>
            </Routes>
        </BrowserRouter>
    </div>
    );
}


function LoginComponent(){

    const [username, setUsername] = useState('mohib');
    const [password, setPassword] = useState('khan');

    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState(false);

    const navigate = useNavigate();

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
            navigate(`/welcome/${username}`);
        }else{
            setShowSuccessMessage(false);
            setShowErrorMessage(true);
        }
    }

    return (
    <div className="LoginComponent">
        <h1>Login to Todo App</h1>
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
    const {username} = useParams();
    return (
        <div className="WelcomeComponent">
            <h1>Todo Management Application</h1>
            <div >
                Welcome {username}
            </div>
        </div>
    );
}

function ErrorComponent(){
    return (
        <div className="errorComponent">
            <h1>Todo Management Application</h1>
            <div >
               404: Page not found
            </div>
        </div>
    );
}