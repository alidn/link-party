package com.zas.linkparty.controller;

import com.zas.linkparty.models.Bookmark;
import com.zas.linkparty.models.Group;
import com.zas.linkparty.models.User;
import com.zas.linkparty.repositories.GroupRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.annotation.security.PermitAll;
import java.security.Principal;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Optional;

@RestController
public class GroupController {

    GroupRepository groupRepository;

    @Autowired
    public GroupController(GroupRepository groupRepository) {
        this.groupRepository = groupRepository;
    }

    @GetMapping("/api/groups")
    public Iterable<Group> groups(Principal principal) {
        // Only return the group which the user is authorized to see.
        return groupRepository.findAll();
    }

    @PostMapping("/api/groups/create")
    public Group addGroup(Principal principal, @RequestBody Group group) {
        // TODO: don't create duplicate
        return groupRepository.save(group, principal.getName());
    }
}
