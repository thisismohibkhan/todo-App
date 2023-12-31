import { useEffect, useState } from "react";
import { retrieveTodoById } from "./apiService/todoService";
import { useParams } from "react-router-dom";
import { Field, Form, Formik } from "formik";


export default function TodoComponent(){

    //const [todo, setTodo] = useState({});
    const [description, setDescription] = useState('');
    const [targetDate, setTargetDate] = useState('');
    const {id} = useParams();

    useEffect (
        () => getTodoById(), [id]
    )


    function getTodoById(){
        retrieveTodoById(id)
        .then((resp) => {
            console.log(resp.data)
            setDescription(resp.data.description);
            setTargetDate(resp.data.targetDate);
            //setTodo(resp.data);
            //setMessage(`Todo deleted for : ${id}`);
        })
        .catch(error=> console.log(error));
    }

    function saveTodo(values){
        console.log(values)
    }

    return (
        <div className="container">
             <h1>Enter Todo Details </h1>
             <div>
                <Formik initialValues={ { description, targetDate } } 
                        enableReinitialize = {true}
                        onSubmit={saveTodo}
                >
                    {
                        (props)=>(
                            <Form>
                                <fieldset className="form-group">
                                    <label>Description</label>
                                    <Field type="text" className="form-control" name="description" />
                                </fieldset>
                                <fieldset className="form-group">
                                    <label>Target Date</label>
                                    <Field type="date" className="form-control" name="targetDate"/>
                                </fieldset>
                                <div>
                                    <button className="btn btn-success m-5" type="submit">Save</button>
                                </div>
                            </Form>
                        )
                    }
                </Formik>
             </div>
        </div>
    );
}