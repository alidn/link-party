package com.zas.linkparty.controller;

import com.zas.linkparty.models.Bookmark;
import com.zas.linkparty.models.Group;
import com.zas.linkparty.models.User;
import com.zas.linkparty.repositories.GroupRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
public class GroupController {

    GroupRepository groupRepository;

    @Autowired
    public GroupController(GroupRepository groupRepository) {
        this.groupRepository = groupRepository;
    }

    @GetMapping("/api/groups")
    public Iterable<Group> showGroups() {
        return this.groupRepository.findAll();
    }

    @GetMapping("/api/groups/{id}/edit-users")
    public Iterable<User> showUsersWhoCanEdit(@PathVariable Long id) {
        return this.groupRepository.findUsersWhoCanEditById(id);
    }

    @GetMapping("/api/groups/{id}/view-users")
    public Iterable<User> showUsersWhoCanOnlyView(@PathVariable Long id) {
        return this.groupRepository.findUsersWhoCanOnlyViewById(id);
    }

    @GetMapping("/api/groups/{id}/bookmarks")
    public Iterable<Bookmark> showAllBookmarks(@PathVariable Long id) {
        return this.groupRepository.findBookmarks(id);
    }

    @GetMapping("/api/groups/{id}/bookmarks/add")
    public boolean addBookmark(@PathVariable Long id, @RequestBody Bookmark bookmark) {
        return this.groupRepository.saveBookmark(id, bookmark);
    }
}
