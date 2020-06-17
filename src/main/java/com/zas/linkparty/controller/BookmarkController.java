package com.zas.linkparty.controller;

import com.zas.linkparty.models.Bookmark;
import com.zas.linkparty.repositories.BookmarkRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
public class BookmarkController {
    private BookmarkRepository bookmarkRepository;

    @Autowired
    public BookmarkController(BookmarkRepository bookmarkRepository) {
        this.bookmarkRepository = bookmarkRepository;
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
}
