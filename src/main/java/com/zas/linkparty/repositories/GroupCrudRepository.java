package com.zas.linkparty.repositories;

import com.zas.linkparty.models.Bookmark;
import com.zas.linkparty.models.Group;
import com.zas.linkparty.models.User;
import org.springframework.data.repository.CrudRepository;

import java.util.ArrayList;

public interface GroupCrudRepository extends CrudRepository<Group, Long> {
    public ArrayList<User> findUsersWhoCanEditById(Long aLong);
    public ArrayList<User> findUsersWhoCanOnlyViewById(Long aLong);
}
