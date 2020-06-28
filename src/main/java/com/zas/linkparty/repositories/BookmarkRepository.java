package com.zas.linkparty.repositories;

import com.zas.linkparty.models.Bookmark;
import com.zas.linkparty.models.Tag;
import com.zas.linkparty.models.User;
import com.zas.linkparty.repositories.queries.BookmarkQueries;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.CrudRepository;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Optional;
import java.util.List;

@Repository
public class BookmarkRepository implements CrudRepository<Bookmark, Long> {
    private JdbcTemplate db;
    private UserRepository userRepository;
    private GroupRepository groupRepository;
    private TagRepository tagRepository;
    private Long authenticatedUserId = null;
    private BookmarkQueries bookmarkQueries;

    @Autowired
    public BookmarkRepository(JdbcTemplate template, UserRepository userRepository, GroupRepository groupRepository,
            TagRepository tagRepository, BookmarkQueries bookmarkQueries) {
        this.db = template;
        this.userRepository = userRepository;
        this.groupRepository = groupRepository;
        this.tagRepository = tagRepository;
        this.bookmarkQueries = bookmarkQueries;
    }

    public <S extends Bookmark> S save(S entity, String authenticatedUsername) {
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
    public <S extends Bookmark> S save(S entity) {
        if (!groupRepository.existsById(entity.getGroup())) {
            return null;
        }
        Object[] params = { entity.getUrl(), entity.getTitle(), entity.getDescription(), authenticatedUserId,
                entity.getGroup() };
        S bookmark = db.queryForObject(BookmarkQueries.save, params, this::mapRowToBookmark);
        if (bookmark == null)
            return null;
        if (entity.getTags() == null) {
            return bookmark;
        }
        for (Tag tag : entity.getTags()) {
            bookmark.addTag(tagRepository.saveToBookmark(tag, entity.getId()));
        }
        return bookmark;
    }

    @Override
    public <S extends Bookmark> Iterable<S> saveAll(Iterable<S> entities) {
        return null;
    }

    @Override
    public Optional<Bookmark> findById(Long bookmarkId) {
        Object[] params = { bookmarkId };
        Bookmark bookmark = db.queryForObject(BookmarkQueries.findById, params, this::mapRowToBookmark);
        if (bookmark == null)
            return Optional.empty();
        Iterable<Tag> tags = tagRepository.getTagsOfBookmark(bookmarkId);
        bookmark.setTags(tags);
        return Optional.of(bookmark);
    }

    public Iterable<Bookmark> findBookmarksOfGroup(Long groupId) {
        Object[] params = { groupId };
        return db.query(bookmarkQueries.findBookmarksOfGroup, params, this::mapRowToBookmark);
    }

    public Iterable<Bookmark> findBookmarksWithTag(String username, String tagName) {
        Object[] params = {tagName};
        List<Bookmark> bookmarks = db.query(bookmarkQueries.findBookmarksWithTag, params, this::mapRowToBookmark);
        // TODO only show the bookmarks that the user can see.
        return bookmarks;
    }

    @Override
    public boolean existsById(Long aLong) {
        return false;
    }

    @Override
    public Iterable<Bookmark> findAll() {
        return db.query(bookmarkQueries.findAll, this::mapRowToBookmark);
    }

    @Override
    public Iterable<Bookmark> findAllById(Iterable<Long> longs) {
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
    public void delete(Bookmark entity) {

    }

    @Override
    public void deleteAll(Iterable<? extends Bookmark> entities) {

    }

    @Override
    public void deleteAll() {

    }

    private <S extends Bookmark> S mapRowToBookmark(ResultSet rs, int rowNum) throws SQLException {
        return (S) new Bookmark(rs.getLong("bookmark_id"), rs.getString("url"), rs.getString("title"),
                rs.getString("description"), rs.getDate("date_created"), new ArrayList<>(), rs.getLong("creator"),
                rs.getLong("group_id"));
    }
}
