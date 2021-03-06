package com.zas.linkparty.controller;

import com.zas.linkparty.models.Group;
import com.zas.linkparty.repositories.GroupRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
public class GroupController {

    GroupRepository groupRepository;

    @Autowired
    public GroupController(GroupRepository groupRepository) {
        this.groupRepository = groupRepository;
    }

    @GetMapping("/api/groups")
    public Iterable<Group> groups(Principal principal) {
        System.out.println("Giving groups");
        // Only return the group which the user is authorized to see.
        return groupRepository.findAllForUser(principal.getName());
    }

    @PostMapping("/api/groups/create")
    public Group addGroup(Principal principal, @RequestBody Group group) {
        // TODO: don't create duplicate
        return groupRepository.save(group, principal.getName());
    }
}
