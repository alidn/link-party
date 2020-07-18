package com.zas.linkparty.controller;

import com.fasterxml.jackson.databind.ser.std.IterableSerializer;
import com.zas.linkparty.models.Bookmark;
import com.zas.linkparty.repositories.BookmarkRepository;
import com.zas.linkparty.repositories.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.CacheControl;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.security.Principal;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

@RestController
public class BookmarkController {
    private BookmarkRepository bookmarkRepository;
    private UserRepository userRepository;

    @Autowired
    public BookmarkController(BookmarkRepository bookmarkRepository, UserRepository userRepository) {
        this.bookmarkRepository = bookmarkRepository;
        this.userRepository = userRepository;
    }

    @GetMapping("/api/bookmarks")
    public Iterable<Bookmark> allBookmarks() {
        // TODO: only show the ones visible to the logged-in user.
        return bookmarkRepository.findAll();
    }

    @PostMapping("/api/bookmarks/create")
    public Bookmark save(@RequestBody Bookmark bookmark, Principal principal) {
        // TODO: make sure the user is authorized to add bookmark to the group.
        return bookmarkRepository.save(bookmark, principal.getName());
    }

    @GetMapping("/api/groups/{groupId}/bookmarks")
    public ResponseEntity<Iterable<Bookmark>> bookmarksOfGroup(Principal principal, @PathVariable Long groupId) {
        CacheControl cacheControl = CacheControl.maxAge(10, TimeUnit.SECONDS)
                .noTransform()
                .mustRevalidate();
        if (!userRepository.isMemberOfGroup(groupId, principal.getName())) {
            return ResponseEntity.status(401)
                    .body(new ArrayList<>());
        }

        return ResponseEntity.ok(bookmarkRepository.findBookmarksOfGroup(groupId));
    }

    @GetMapping("/api/tags/{tagName}/bookmarks")
    public Iterable<Bookmark> bookmarksWithTag(@PathVariable String tagName, Principal principal) {
        return bookmarkRepository.findBookmarksWithTag(principal.getName(), tagName);
    }

    @DeleteMapping("/api/bookmarks/{bookmarkId}/delete")
    public boolean deleteBookmark(@PathVariable Long bookmarkId, Principal principal) {
        Optional<Bookmark> bookmark = bookmarkRepository.findById(bookmarkId);
        if (bookmark.isEmpty()) {
            return false;
        }
        if (!userRepository.isMemberOfGroup(bookmark.get().getGroup(), principal.getName())) {
            return false;
        }
        return bookmarkRepository.deleteBookmark(bookmarkId);
    }
}
