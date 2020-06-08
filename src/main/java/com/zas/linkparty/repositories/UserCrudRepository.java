package com.zas.linkparty.repositories;

import com.zas.linkparty.models.User;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface UserCrudRepository extends CrudRepository<User, Long> {
    public Optional<User> findByUsername(String aUsername);
}
