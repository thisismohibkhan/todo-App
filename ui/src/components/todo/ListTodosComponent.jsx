import { useEffect, useState } from "react";
import { retrieveTodosByUsername, deleteTodoById } from "./apiService/todoService";
import { useAuth } from "./security/AuthContext";
function ListTodosComponent(){

    const [todos , setTodos] = useState([]);
    const [message , setMessage] = useState(null);

    const {username} = useAuth();

    useEffect (
        () => refreshTodos(), []
    )

    function refreshTodos(){
        retrieveTodosByUsername(username)
        .then(resp =>{
                setTodos(resp.data);
            })
        .catch(error => console.log(error))
        .finally(() => console.log('cleanup'));
    }

    function deleteTodo(id){
        deleteTodoById(id)
        .then(() => {
            setMessage(`Todo deleted for : ${id}`)
            refreshTodos();
        })
        .catch(error=> console.log(error));
    }
    

    return (
        <div className="container">
            <h1>Things Yoy want to do</h1>
            <div >
                {message && <div className="alert alert-warning">{message}</div>}
              <table className="table">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Description</th>
                        <th>Done</th>
                        <th>Target Date</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                    todos?.map(
                        todo => (
                            <tr key={todo.id}>
                            <td>{todo.id}</td>
                            <td>{todo.description}</td>
                            <td>{todo.isDone?.toString()}</td>
                            <td>{todo.targetDate}</td>
                            <td><button className="btn btn-danger" onClick={() => deleteTodo(todo.id)}>Delete</button></td>
                            <td><button className="btn btn-success">Edit</button></td>
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

export default ListTodosComponent