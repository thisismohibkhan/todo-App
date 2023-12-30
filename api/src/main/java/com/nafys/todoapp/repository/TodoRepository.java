package com.nafys.todoapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.nafys.todoapp.model.Todo;

public interface TodoRepository extends JpaRepository<Todo, Long> {

}
