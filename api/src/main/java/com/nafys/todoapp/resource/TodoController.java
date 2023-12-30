package com.nafys.todoapp.resource;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nafys.todoapp.model.Todo;
import com.nafys.todoapp.repository.TodoRepository;

@RestController
public class TodoController {
	
	private TodoRepository todoRepository;
	
	public TodoController(TodoRepository todoRepository) {
		super();
		this.todoRepository = todoRepository;
	}

	@PostMapping("/todos")
	public Todo save(Todo todo){
		Todo savedTodo = todoRepository.save(todo);
		return savedTodo;
	}
	
//	@GetMapping("/todos/{id}")
//	public Optional<Todo> getOne(Long id){
//		Optional<Todo> todo = todoRepository.findById(id);
//		return todo;
//	}
	
	@GetMapping("/todos/{username}")
	public List<Todo> getAll(@PathVariable(value = "username") String username ){
		List<Todo> todos = todoRepository.findByUsername(username);
		return todos;
	}
	
	@DeleteMapping("/todos/{id}")
	public void delete(Long id){
		todoRepository.deleteById(id);
	}

}
