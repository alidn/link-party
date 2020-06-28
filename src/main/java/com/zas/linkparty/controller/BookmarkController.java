package com.zas.linkparty.controller;

import com.zas.linkparty.models.Bookmark;
import com.zas.linkparty.repositories.BookmarkRepository;
import com.zas.linkparty.repositories.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.security.Principal;

@RestController
public class BookmarkController {
    private BookmarkRepository bookmarkRepository;
    private UserRepository UserRepository;

    @Autowired
    public BookmarkController(BookmarkRepository bookmarkRepository, UserRepository userRepository) {
        this.bookmarkRepository = bookmarkRepository;
        this.UserRepository = userRepository;
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
    public Iterable<Bookmark> bookmarksOfGroup(Principal principal, @PathVariable Long groupId) {
        if (!UserRepository.isMemberOfGroup(groupId, principal.getName())) {
            return new ArrayList<Bookmark>();
        }
        return bookmarkRepository.findBookmarksOfGroup(groupId);
    }

    @GetMapping("/api/tags/{tagName}/bookmarks")
    public Iterable<Bookmark> bookmarksWithTag(@PathVariable String tagName, Principal principal) {
        return bookmarkRepository.findBookmarksWithTag(principal.getName(), tagName);
    }
}
