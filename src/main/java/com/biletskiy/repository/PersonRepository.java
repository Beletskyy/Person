package com.biletskiy.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.biletskiy.entity.User;

public interface PersonRepository extends CrudRepository<User, Long>
{
  List<User> findAll();
}
