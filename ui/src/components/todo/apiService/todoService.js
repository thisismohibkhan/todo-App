import { apiClient } from "./ApiClient";

export const executeBasicAuthenticationService 
    = (token) => apiClient.get(`/basicauth`,{
        headers: {
            Authorization: token
        }
    });

export const retrieveTodosByUsername = (username) => apiClient.get(`/todos/${username}`);

export const deleteTodoById = (id) => apiClient.delete(`/todos/${id}`);

export const retrieveTodoById = (id) => apiClient.get(`/todos/id/${id}`);

export const updateTodo = (todo) => apiClient.put(`/todos`, todo);

export const createTodo = (todo) => apiClient.post(`/todos`, todo);