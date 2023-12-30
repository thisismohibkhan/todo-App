import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ListTodosComponent  from './ListTodosComponent';
import LogoutComponent from './LogoutComponent';
import FooterComponent from './FooterComponent';
import HeaderComponent from './HeaderComponent';
import ErrorComponent from './ErrorComponent';
import WelcomeComponent from './WelcomeComponent';
import LoginComponent from './LoginComponent';
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
