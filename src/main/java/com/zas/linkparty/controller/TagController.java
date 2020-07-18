package com.zas.linkparty.controller;

import com.zas.linkparty.models.Tag;
import com.zas.linkparty.repositories.TagRepository;
import com.zas.linkparty.repositories.queries.TagQueries;

import org.springframework.http.CacheControl;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.concurrent.TimeUnit;

@RestController
public class TagController {

    private TagQueries tagQueries;
    private TagRepository tagRepository;

    public TagController(TagQueries tagQueries, TagRepository tagRepository) {
        this.tagQueries = tagQueries;
        this.tagRepository = tagRepository;
    }

    @GetMapping("/api/bookmarks/{bookmarkId}/tags")
    public Iterable<Tag> getTagsOfBookmark(@PathVariable Long bookmarkId) {
        return tagRepository.getTagsOfBookmark(bookmarkId);
    }

    @PostMapping("/api/bookmarks/{bookmarkId}/tags/create/{name}")
    public Tag addTag(@PathVariable Long bookmarkId, @PathVariable String name) {
        return tagRepository.saveToBookmark(new Tag(name), bookmarkId);
    }

    @DeleteMapping("/api/bookmarks/{bookmarkId}/tags/{tagId}/delete")
    public boolean deleteTag(@PathVariable Long bookmarkId, @PathVariable Long tagId) {
        return tagRepository.deleteTag(bookmarkId, tagId);
    }
}