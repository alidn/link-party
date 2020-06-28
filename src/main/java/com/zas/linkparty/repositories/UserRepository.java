package com.zas.linkparty.repositories;

import com.zas.linkparty.models.User;
import com.zas.linkparty.repositories.queries.UserQueries;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.CrudRepository;
import org.springframework.jdbc.core.JdbcTemplate;

import java.sql.*;
import java.util.Optional;

public class UserRepository implements CrudRepository<User, Long> {

    private JdbcTemplate db;
    private UserQueries userQueries;

    @Autowired
    public UserRepository(JdbcTemplate template, UserQueries userQueries) {
        this.db = template;
        this.userQueries = userQueries;
    }

    public Iterable<User> findUsersOfGroup(Long groupId) {
        Object[] params = {groupId};
        return db.query(userQueries.findUsersOfGroup, params, this::mapRowToUser);
    }

    public boolean isMemberOfGroup(Long groupId, String username) {
        Object[] params = {groupId, username};
        try {
            User _user = db.queryForObject(userQueries.isMemberOfGroup, params, this::mapRowToUser);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public <S extends User> S findByUsername(String username) {
        Object[] params = {username};
        try {
            return db.queryForObject(userQueries.findByUsername, params, this::mapRowToUser);
        } catch (Exception e) {
            return null;
        }
    }

    @Override
    public <S extends User> S save(S entity) {
        return null;
    }

    @Override
    public <S extends User> Iterable<S> saveAll(Iterable<S> entities) {
        return null;
    }

    @Override
    public Optional<User> findById(Long userId) {
        Object[] params = {userId};
        try {
            User user = db.queryForObject(userQueries.findById, params, this::mapRowToUser);
            return Optional.of(user);
        } catch (Exception e) {
            return Optional.empty();
        }
    }

    @Override
    public boolean existsById(Long aLong) {
        return false;
    }

    @Override
    public Iterable<User> findAll() {
        return null;
    }

    @Override
    public Iterable<User> findAllById(Iterable<Long> longs) {
        return null;
    }

    @Override
    public long count() {
        return 0;
    }

    @Override
    public void deleteById(Long aLong) {

    }

    @Override
    public void delete(User entity) {

    }

    @Override
    public void deleteAll(Iterable<? extends User> entities) {

    }

    @Override
    public void deleteAll() {

    }

    private <S extends User> S mapRowToUser(ResultSet rs, int rowNum) throws SQLException {
        return (S) new User(
                rs.getLong("user_id"),
                rs.getString("username"),
                rs.getString("email"),
                rs.getString("password"),
                rs.getDate("date_joined")
        );
    }
}
