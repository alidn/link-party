package com.zas.linkparty.repositories;

import com.zas.linkparty.models.Group;
import com.zas.linkparty.models.User;
import com.zas.linkparty.repositories.queries.GroupQueries;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.CrudRepository;
import org.springframework.jdbc.core.JdbcTemplate;

import java.sql.*;
import java.util.ArrayList;
import java.util.Optional;
import java.util.stream.Collectors;

public class GroupRepository implements CrudRepository<Group, Long> {
    private Long authenticatedUserId = null;
    private UserRepository userRepository;
    private JdbcTemplate db;
    private GroupQueries groupQueries;

    @Autowired
    public GroupRepository(UserRepository userRepository, JdbcTemplate db,
                           GroupQueries groupQueries) {
        this.userRepository = userRepository;
        this.db = db;
        this.groupQueries = groupQueries;
    }

    public <S extends Group> S save(S entity, String authenticatedUsername) {
        if (authenticatedUserId != null) {
            return save(entity);
        }
        User user = userRepository.findByUsername(authenticatedUsername);
        if (user == null) {
            return null;
        } else {
            this.authenticatedUserId = user.getId();
            return save(entity);
        }
    }

    @Override
    public <S extends Group> S save(S entity) {
        Object[] params = {entity.getName(), authenticatedUserId};
        S group;
        try {
            group = db.queryForObject(this.groupQueries.save, params, this::mapRowToGroup);
        } catch (Exception e) {
            return null;
        }
        addUserToGroup(group.getId(), authenticatedUserId);
        return group;
    }

    public void addUserToGroup(Long groupId, Long userId) {
        Object[] params = {userId, groupId, "created"};
        db.update(this.groupQueries.addUser, params);
    }

    @Override
    public <S extends Group> Iterable<S> saveAll(Iterable<S> entities) {
        return null;
    }

    @Override
    public Optional<Group> findById(Long groupId) {
        Object[] params = {groupId};
        Group group;
        try {
            group = db.queryForObject(this.groupQueries.findById, params, this::mapRowToGroup);
        } catch (Exception e) {
            return null;
        }
        return Optional.ofNullable(group);
    }

    @Override
    public boolean existsById(Long groupId) {
        Object[] params = {groupId};
        Group group;
        try {
            group = db.queryForObject(this.groupQueries.findById, params, this::mapRowToGroup);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public Iterable<Group> findAllForUser(String username) {
       ArrayList<Group> filteredGroups = new ArrayList<>();
       Iterable<Group> allGroups = findAll();
       for (Group g : allGroups) {
           if (userRepository.isMemberOfGroup(g.getId(), username)) {
               filteredGroups.add(g);
           }
       }
       return filteredGroups;
    }

    @Override
    public Iterable<Group> findAll() {
        return db.query(this.groupQueries.findAll, this::mapRowToGroup);
    }

    @Override
    public Iterable<Group> findAllById(Iterable<Long> longs) {
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
    public void delete(Group entity) {

    }

    @Override
    public void deleteAll(Iterable<? extends Group> entities) {

    }

    @Override
    public void deleteAll() {

    }

    private <S extends Group> S mapRowToGroup(ResultSet rs, int rowNum) throws SQLException {
        return (S) new Group(
                rs.getLong("group_id"),
                rs.getString("group_name"),
                rs.getLong("creator"),
                rs.getString("invite_edit_url"),
                rs.getString("invite_view_url"),
                rs.getDate("date_created")
        );
    }
}
