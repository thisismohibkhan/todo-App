import { useEffect, useState } from "react";
import { retrieveTodosByUsername } from "./apiService/todoService";
function ListTodosComponent(){

    const date = new Date();
    // const todos = [
    //     {id:1, description: 'Learn AWS', isDone: false, targetDate: date},
    //     {id:2, description: 'Learn Docker', isDone: false, targetDate: date},
    //     {id:3, description: 'Learn Git', isDone: false, targetDate: date}
    // ];
    const [todos , setTodos] = useState([]);

    useEffect (
        () => refreshTodos(), []
    )

    function refreshTodos(){
        retrieveTodosByUsername('mohib')
        .then(resp =>{
                setTodos(resp.data);
            })
        .catch(error => console.log(error))
        .finally(() => console.log('cleanup'));
    }
    

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
                    todos?.map(
                        todo => (
                            <tr key={todo.id}>
                            <td>{todo.id}</td>
                            <td>{todo.description}</td>
                            <td>{todo.isDone?.toString()}</td>
                            <td>{todo.targetDate?.toDateString()}</td>
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