package com.zas.linkparty.models;

import java.sql.Date;
import java.util.ArrayList;
import java.util.Collection;

public class BookmarkBuilder {
    private String url;
    private String title;
    private String description;
    private Date createdDate;
    private Collection<Tag> tags = new ArrayList<>();
    private Long creator;
    private Long group;

    public BookmarkBuilder setUrl(String url) {
        this.url = url;
        return this;
    }

    public BookmarkBuilder setTitle(String title) {
        this.title = title;
        return this;
    }

    public BookmarkBuilder setDescription(String description) {
        this.description = description;
        return this;
    }

    public BookmarkBuilder setCreatedDate(Date createdDate) {
        this.createdDate = createdDate;
        return this;
    }

    public BookmarkBuilder setTags(Collection<Tag> tags) {
        this.tags = tags;
        return this;
    }

    public BookmarkBuilder setCreator(Long creator) {
        this.creator = creator;
        return this;
    }

    public BookmarkBuilder setGroup(Long group) {
        this.group = group;
        return this;
    }

    public Bookmark createBookmark() {
        return new Bookmark(url, title, description, createdDate, tags, creator, group);
    }
}