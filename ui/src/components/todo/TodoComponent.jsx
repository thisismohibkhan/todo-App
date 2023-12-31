import { useEffect, useState } from "react";
import { createTodo, retrieveTodoById, updateTodo } from "./apiService/todoService";
import {  useNavigate, useParams } from "react-router-dom";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useAuth } from "./security/AuthContext";
import moment from "moment";


export default function TodoComponent(){

    const {username} = useAuth();
    const navigate = useNavigate()
    //const [todo, setTodo] = useState({});
    const [description, setDescription] = useState('');
    const [targetDate, setTargetDate] = useState('');
    const {id} = useParams();

    useEffect (
        () => getTodoById(), [id]
    )


    function getTodoById(){
        console.log(id)
        if(id !== '-1'){
            retrieveTodoById(id)
            .then((resp) => {
                setDescription(resp.data.description);
                setTargetDate(resp.data.targetDate);
                //setMessage(`Todo deleted for : ${id}`);
            })
            .catch(error=> console.log(error));
        }
    }

    function saveTodo(values){
        const todo = {
            id : id,
            description: values.description,
            targetDate:values.targetDate,
            isDone : false,
            username:username
        }

        if(id === -1){
            createTodo(todo).then(resp=>{
                navigate('/todos')
            }).catch(error => console.log(error));
        } else {
            updateTodo(todo).then(resp =>{
                navigate('/todos')
            }).catch(error => console.log(error));
        }
    }

    function validate(values) {
        let errors = {
            // description: 'Enter a valid description',
            // targetDate: 'Enter a valid target date'
        }

        if(values.description.length<5) {
            errors.description = 'Enter atleast 5 characters'
        }

        if(values.targetDate == null) {
            errors.targetDate = 'Enter a target date'
        }

        if(values.targetDate == null || values.targetDate=='' || !moment(values.targetDate).isValid()) {
            errors.targetDate = 'Enter a target date'
        }
        return errors
    }

    return (
        <div className="container">
             <h1>Enter Todo Details </h1>
             <div>
                <Formik initialValues={ { description, targetDate } } 
                        enableReinitialize = {true}
                        onSubmit={saveTodo}
                        validate = {validate}
                        validateOnChange = {false}
                        validateOnBlur = {false}
                >
                    {
                        (props)=>(
                            <Form>
                                <ErrorMessage 
                                    name="description"
                                    component="div"
                                    className = "alert alert-warning"
                                />
                            
                                <ErrorMessage 
                                    name="targetDate"
                                    component="div"
                                    className = "alert alert-warning"
                                />

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