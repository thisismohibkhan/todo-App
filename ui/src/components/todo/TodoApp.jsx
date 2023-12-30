import { useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useParams, Link } from 'react-router-dom';
import './TodoApp.css';

export default function TodoApp(){
    return (
    <div className="TodoApp">
        <BrowserRouter>
            <HeaderComponent/>
            <Routes>
                <Route path="/" element={ <LoginComponent/>}></Route>
                <Route path="/login" element={ <LoginComponent/>}></Route>
                <Route path="/welcome/:username" element={<WelcomeComponent/>}></Route>
                <Route path="/todos" element={<ListTodosComponent/>}></Route>
                <Route path="/logout" element={<LogoutComponent/>}></Route>
                <Route path="*" element={<ErrorComponent/>}></Route>
            </Routes>
            <FooterComponent/>
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
            <h1>Welcome {username}</h1>
            {/* <div >Manage your todos. <a href="/todos">Go here</a></div> */}
            <div >Manage your todos. <Link to="/todos">Go here</Link></div>
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

function HeaderComponent(){
    return (
        <header className="border-bottom border-light border-5 mb-5 p-2">
            <div className='container'>
            <div className="row">
                <nav className="navbar navbar-expand-lg">
                    <a  className='navbar-brand ms-2 fs-2 fw-bold text-black' href='http://localhost:3010/'>Todo App</a>
                    <div className="collapse navbar-collapse">
                        <ul className='navbar-nav'>
                            <li className='nav-item fs-5'><Link  className='nav-link' to='/welcome/mohib'>Home</Link></li>
                            <li className='nav-item fs-5'><Link  className='nav-link' to='/todos'>Todos</Link></li>
                        </ul>
                    </div>
                    <ul className='navbar-nav'>
                        <li className='nav-item fs-5'><Link  className='nav-link' to='/'>Login</Link></li>
                        <li className='nav-item fs-5'><Link  className='nav-link' to='/logout'>Logout</Link></li>
                    </ul>
                </nav>
            </div>
                
            </div>
        </header>
    );
}

function FooterComponent(){
    return (
        <footer className="footer">
            <div className='container'>
                My Footer
            </div>
        </footer>
    );
}

function LogoutComponent(){
    return (
        <div className="logoutComponent">
            <h1>You are logged out</h1>
            <h3>Thank you</h3>
        </div>
    );
}

function ListTodosComponent(){
    const date = new Date();
    const todos = [
        {id:1, description: 'Learn AWS', isDone: false, targetDate: date},
        {id:2, description: 'Learn Docker', isDone: false, targetDate: date},
        {id:3, description: 'Learn Git', isDone: false, targetDate: date}
    ];

    return (
        <div className="container">
            <h1>Things Yoy want to do</h1>
            <div >
              <table className="table">
                <thead>
                    <tr>
                        <td>Id</td>
                        <td>Description</td>
                        <td>Done</td>
                        <td>Target Date</td>
                    </tr>
                </thead>
                <tbody>
                    {
                    todos.map(
                        todo => (
                            <tr key={todo.id}>
                            <td>{todo.id}</td>
                            <td>{todo.description}</td>
                            <td>{todo.isDone.toString()}</td>
                            <td>{todo.targetDate.toDateString()}</td>
                        </tr>
                        )
                    )
                }
                </tbody>
              </table>
            </div>
        </div>
    );
}