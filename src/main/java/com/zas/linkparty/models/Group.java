package com.zas.linkparty.models;

import java.sql.Date;
import java.util.ArrayList;

public class Group {
    private Long id;
    private String name;
    private Date dateCreated;
    private String inviteEditUrl;
    private String inviteViewUrl;
    private ArrayList<User> usersWhoCanEdit;
    private ArrayList<User> usersWhoCanOnlyView;

    public Group(Long id, String name, Date dateCreated, String inviteEditUrl, String inviteViewUrl) {
        this.id = id;
        this.name = name;
        this.dateCreated = dateCreated;
        this.inviteEditUrl = inviteEditUrl;
        this.inviteViewUrl = inviteViewUrl;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Date getDateCreated() {
        return dateCreated;
    }

    public void setDateCreated(Date dateCreated) {
        this.dateCreated = dateCreated;
    }

    public String getInviteEditUrl() {
        return inviteEditUrl;
    }

    public void setInviteEditUrl(String inviteEditUrl) {
        this.inviteEditUrl = inviteEditUrl;
    }

    public String getInviteViewUrl() {
        return inviteViewUrl;
    }

    public void setInviteViewUrl(String inviteViewUrl) {
        this.inviteViewUrl = inviteViewUrl;
    }

    public ArrayList<User> getUsersWhoCanEdit() {
        return usersWhoCanEdit;
    }

    public void setUsersWhoCanEdit(ArrayList<User> usersWhoCanEdit) {
        this.usersWhoCanEdit = usersWhoCanEdit;
    }

    public ArrayList<User> getUsersWhoCanOnlyView() {
        return usersWhoCanOnlyView;
    }

    public void setUsersWhoCanOnlyView(ArrayList<User> usersWhoCanOnlyView) {
        this.usersWhoCanOnlyView = usersWhoCanOnlyView;
    }
}
