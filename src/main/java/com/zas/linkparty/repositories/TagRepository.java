package com.zas.linkparty.repositories;

import com.zas.linkparty.models.Tag;
import com.zas.linkparty.repositories.queries.TagQueries;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.CrudRepository;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;

import java.sql.Types;
import java.util.List;
import java.util.Optional;

public class TagRepository implements CrudRepository<Tag, Long> {
    private JdbcTemplate template;

    @Autowired
    public TagRepository(JdbcTemplate jdbcTemplate) {
        this.template = jdbcTemplate;
    }

    public <S extends Tag> S save(S entity, Long groupId) {
        if (!existsByName(entity.getName())) {
            entity = save(entity);
        } else {
            entity = getByName(entity.getName());
        }
        if (entity == null) {
            return null;
        }
        Object[] params = {entity.getId(), groupId};
        int[] argTypes = {Types.INTEGER, Types.INTEGER};
        int rowsUpdated = template.update(TagQueries.insertIntoBookmarkTags, params, argTypes);
        return rowsUpdated > 0 ? entity : null;
    }

    public boolean existsByName(String name) {
        return false;
    }

    public <S extends Tag> S getByName(String name) {
        return null;
    }

    @Override
    public <S extends Tag> S save(S entity) {
        return null;
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
}
