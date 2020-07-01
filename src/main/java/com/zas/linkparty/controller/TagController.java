package com.zas.linkparty.controller;

import com.zas.linkparty.models.Tag;
import com.zas.linkparty.repositories.TagRepository;
import com.zas.linkparty.repositories.queries.TagQueries;

import org.springframework.web.bind.annotation.*;

@RestController
public class TagController {

    private TagQueries tagQueries;
    private TagRepository tagRepository;

    public TagController(TagQueries tagQueries, TagRepository tagRepository) {
        this.tagQueries = tagQueries;
        this.tagRepository= tagRepository;
    }

    @GetMapping("/api/bookmarks/{bookmarkId}/tags")
    public Iterable<Tag> getTagsOfBookmark(@PathVariable Long bookmarkId) {
        return tagRepository.getTagsOfBookmark(bookmarkId);
    }

    @PostMapping("/api/bookmarks/{bookmarkId}/tags/create")
    public void addTag(@RequestBody Tag tag, @PathVariable Long bookmarkId) {
        tagRepository.saveToBookmark(tag, bookmarkId);
    }

    @DeleteMapping("/api/bookmarks/{bookmarkId}/tags/{tagId}/delete")
    public boolean deleteTag(@PathVariable Long bookmarkId, @PathVariable Long tagId) {
        return tagRepository.deleteTag(bookmarkId, tagId);
    }
}