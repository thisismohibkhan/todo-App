import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './security/AuthContext';

function LoginComponent(){

    const [username, setUsername] = useState('mohib');
    const [password, setPassword] = useState('khan');

    const [showErrorMessage, setShowErrorMessage] = useState(false);

    const navigate = useNavigate();

    const authContext = useAuth();

    function handleUsernameChange(event){
        setUsername(event.target.value);
    }

    function handlePasswordChange(event){
        setPassword(event.target.value);
    }

    function handleSubmit(){
        const isAuthenticated = authContext.login(username, password);
        if(isAuthenticated){
            navigate(`/welcome/${username}`);
        }else{
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

export default LoginComponent