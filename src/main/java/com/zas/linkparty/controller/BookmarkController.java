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
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

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
        System.out.println("_-------------------------");
        // TODO: make sure the user is authorized to add bookmark to the group.
        var b = bookmarkRepository.save(bookmark, principal.getName());
        System.out.println(b);
        return b;
    }

    @GetMapping("/api/groups/{groupId}/bookmarks")
    public ResponseEntity<Iterable<Bookmark>> bookmarksOfGroup(Principal principal, @PathVariable Long groupId) {
        if (!userRepository.isMemberOfGroup(groupId, principal.getName())) {
            return ResponseEntity.status(401)
                    .body(new ArrayList<>());
        }

        return ResponseEntity.ok(bookmarkRepository.findBookmarksOfGroup(groupId));
    }

    private class SearchQuery {
        private String[] keywords;
    }

    @PostMapping("/api/groups/{groupId}/bookmarks/search")
    public Iterable<Long> search(Principal principal, @PathVariable Long groupId, @RequestBody Map<String, ArrayList<String>> body) {
        if (!userRepository.isMemberOfGroup(groupId, principal.getName())) {
            return new ArrayList<>();
        }

        return bookmarkRepository
                .getBookmarkForKeywords(groupId, body.get("keywords"))
                .stream()
                .map(Bookmark::getId)
                .collect(Collectors.toList());
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
