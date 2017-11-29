package com.biletskiy.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import com.biletskiy.repository.PersonRepository;
import com.biletskiy.entity.User;

@org.springframework.stereotype.Controller
@RequestMapping(path = "/rest/users")
public class Controller
{
  @Autowired
  PersonRepository repository;

  @GetMapping(path = "")
  public ResponseEntity<List<User>> getAllUsers()
  {
    List<User> users = repository.findAll();
    return new ResponseEntity<>(users, HttpStatus.OK);
  }

  @PostMapping("")
  public ResponseEntity<String> createUser(@RequestBody User user)
  {
    repository.save(user);
    return new ResponseEntity<>(HttpStatus.OK);
  }
}
