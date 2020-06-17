package com.zas.linkparty.models;

import java.sql.Date;
import java.util.ArrayList;
import java.util.Collection;

public class Bookmark {
    private Long id;
    private String url;
    private String title;
    private String description;
    private Date createdDate;
    private Iterable<Tag> tags;
    private Long creator;
    private Long group;

    public Bookmark() {}

    public Bookmark(Long id) {
        this.id = id;
    }

    public Bookmark(String url, String title, String description, Iterable<Tag> tags, Long group) {
        this.url = url;
        this.title = title;
        this.description = description;
        this.tags = tags;
        this.group = group;
    }

    public Bookmark(Long id, String url, String title, String description, Date createdDate, Collection<Tag> tags, Long creator, Long group) {
        this.id = id;
        this.url = url;
        this.title = title;
        this.description = description;
        this.createdDate = createdDate;
        this.tags = tags;
        this.creator = creator;
        this.group = group;
    }

    public Bookmark(String url, String title, String description, Date createdDate, Collection<Tag> tags, Long creator, Long group) {
        this.url = url;
        this.title = title;
        this.description = description;
        this.createdDate = createdDate;
        this.tags = tags;
        this.creator = creator;
        this.group = group;
    }

    public void addTag(Tag tag) {
        ArrayList<Tag> atags = new ArrayList<>();
        for (Tag t: tags) {
            atags.add(t);
        }
        atags.add(tag);
        this.tags = atags;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Date getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(Date createdDate) {
        this.createdDate = createdDate;
    }

    public Iterable<Tag> getTags() {
        return tags;
    }

    public void setTags(Iterable<Tag> tags) {
        this.tags = tags;
    }

    public Long getCreator() {
        return creator;
    }

    public void setCreator(Long creator) {
        this.creator = creator;
    }

    public Long getGroup() {
        return group;
    }

    public void setGroup(Long group) {
        this.group = group;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
