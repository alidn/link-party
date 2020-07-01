package com.zas.linkparty.repositories;

import com.zas.linkparty.models.Tag;
import com.zas.linkparty.repositories.queries.TagQueries;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.CrudRepository;
import org.springframework.jdbc.core.JdbcTemplate;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.Optional;

public class TagRepository implements CrudRepository<Tag, Long> {
    private final JdbcTemplate db;

    @Autowired
    public TagRepository(JdbcTemplate jdbcTemplate) {
        this.db = jdbcTemplate;
    }

    public boolean deleteTag(Long bookmarkId, Long tagId) {
        Object[] params = {bookmarkId, tagId};
        int rows = db.update(TagQueries.deleteTag, params);
        return rows > 0;
    }

    public <S extends Tag> S saveToBookmark(S entity, Long bookmarkId) {
        if (!existsByName(entity.getName())) {
            entity = save(entity);
        } else {
            entity = getByName(entity.getName());
        }
        if (entity == null) {
            return null;
        }
        Object[] params = {entity.getId(), bookmarkId};
        int[] argTypes = {Types.INTEGER, Types.INTEGER};
        int rowsUpdated = db.update(TagQueries.insertIntoBookmarkTags, params, argTypes);
        return rowsUpdated > 0 ? entity : null;
    }

    public boolean existsByName(String name) {
        Object[] params = {name};
        try {
            Tag tag = db.queryForObject(TagQueries.existsByName, params, this::mapRowToTag);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public <S extends Tag> S getByName(String name) {
        Object[] params = {name};
        try {
            return db.queryForObject(TagQueries.existsByName, params, this::mapRowToTag);
        } catch (Exception e) {
            return null;
        }
    }

    public <S extends Tag> Iterable<S> getTagsOfBookmark(Long bookmarkId) {
        Object[] params = {bookmarkId};
        return db.query(TagQueries.tagsOfBookmark, params, this::mapRowToTag);
    }

    @Override
    public <S extends Tag> S save(S entity) {
        Object[] params = {entity.getName()};
        try {
            return db.queryForObject(TagQueries.saveTag, params, this::mapRowToTag);
        } catch (Exception e) {
            System.out.println("Couldn't save the tag: " + entity.getName());
            return null;
        }
    }

    @Override
    public <S extends Tag> Iterable<S> saveAll(Iterable<S> entities) {
        return null;
    }

    @Override
    public Optional<Tag> findById(Long aLong) {
        return Optional.empty();
    }

    @Override
    public boolean existsById(Long aLong) {
        return false;
    }

    @Override
    public Iterable<Tag> findAll() {
        return null;
    }

    @Override
    public Iterable<Tag> findAllById(Iterable<Long> longs) {
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
    public void delete(Tag entity) {

    }

    @Override
    public void deleteAll(Iterable<? extends Tag> entities) {

    }

    @Override
    public void deleteAll() {

    }

    private <S extends Tag> S mapRowToTag(ResultSet rs, int rowNum) throws SQLException {
        return (S) new Tag(rs.getLong("tag_id"), rs.getString("name"));
    }
}
