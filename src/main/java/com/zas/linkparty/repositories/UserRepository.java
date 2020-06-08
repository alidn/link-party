package com.zas.linkparty.repositories;

import com.zas.linkparty.models.User;
import org.springframework.beans.factory.annotation.Autowired;

import javax.sql.DataSource;
import java.sql.*;
import java.util.Optional;

public class UserRepository implements UserCrudRepository {

    @Autowired
    private DataSource dataSource;

    @Override
    public <S extends User> S save(S user) {
        final String sqlSaveUser = "insert into users (username, email, password) " +
                "values (?, ?, ?);";
        Connection connection = null;
        try {
            connection = dataSource.getConnection();
            PreparedStatement preparedStatement = connection.prepareStatement(sqlSaveUser);
            preparedStatement.setString(1, user.getUsername());
            preparedStatement.setString(2, user.getEmail());
            preparedStatement.setString(3, user.getPassword());
            preparedStatement.executeQuery();
            preparedStatement.close();
            return user;
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
        if (connection != null) {
            try {
                connection.close();
            } catch (SQLException throwables) {
                throwables.printStackTrace();
            }
        }
        throw new IllegalArgumentException("User info not valid");
    }

    @Override
    public <S extends User> Iterable<S> saveAll(Iterable<S> iterable) {
        return null;
    }

    @Override
    public Optional<User> findById(Long aLong) {
        final String sqlFindUserById = "select username, email, password, date_joined from users where user_id = ?;";
        Connection connection = null;
        try {
            connection = dataSource.getConnection();
            PreparedStatement preparedStatement = connection.prepareStatement(sqlFindUserById);
            preparedStatement.setLong(1, aLong);
            ResultSet resultSet = preparedStatement.executeQuery();
            if (resultSet.next()) {
                String username = resultSet.getString(1);
                String email = resultSet.getString(2);
                String password = resultSet.getString(3);
                Date dateJoined = resultSet.getDate(4);
                User user = new User(username, email, password, dateJoined);
                preparedStatement.close();
                return Optional.of(user);
            } else {
                preparedStatement.close();
                return Optional.empty();
            }
        } catch (SQLException throwables) {
            if (connection != null) {
                try {
                    connection.close();
                } catch (SQLException sqlException) {
                    throwables.printStackTrace();
                }
            }
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
    public Iterable<User> findAllById(Iterable<Long> iterable) {
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
    public void delete(User user) {

    }

    @Override
    public void deleteAll(Iterable<? extends User> iterable) {

    }

    @Override
    public void deleteAll() {

    }

    @Override
    public Optional<User> findByUsername(String aUsername) {
        System.out.println("Checking user " + dataSource);
        final String sqlFindUserById = "select username, email, password, date_joined from users where username = ?;";
        Connection connection = null;
        try {
            connection = dataSource.getConnection();
            PreparedStatement preparedStatement = connection.prepareStatement(sqlFindUserById);
            preparedStatement.setString(1, aUsername);
            ResultSet resultSet = preparedStatement.executeQuery();
            if (resultSet.next()) {
                String username = resultSet.getString(1);
                String email = resultSet.getString(2);
                String password = resultSet.getString(3);
                Date dateJoined = resultSet.getDate(4);
                System.out.println("Here");
                User user = new User(username, email, password, dateJoined);
                preparedStatement.close();
                return Optional.of(user);
            } else {
                preparedStatement.close();
                return Optional.empty();
            }
        } catch (SQLException throwables) {
            if (connection != null) {
                try {
                    connection.close();
                } catch (SQLException sqlException) {
                    throwables.printStackTrace();
                }
            }
            return Optional.empty();
        }
    }
}
