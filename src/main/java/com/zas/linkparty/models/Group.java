package com.zas.linkparty.models;

import java.sql.Date;

public class Group {
    private Long id;
    private String name;
    private Long creator;
    private String inviteEditUrl;
    private String inviteViewUrl;
    private Date dateCreated;

    public Group() {
    }

    public Group(Long id, String name, Long creator, String inviteEditUrl, String inviteViewUrl, Date dateCreated) {
        this.id = id;
        this.name = name;
        this.creator = creator;
        this.inviteEditUrl = inviteEditUrl;
        this.inviteViewUrl = inviteViewUrl;
        this.dateCreated = dateCreated;
    }

    public Group(String name) {
        this.name = name;
    }

    public Group(Long id) {
        this.id = id;
    }

    public Group(String name, Long creator) {
        this.name = name;
        this.creator = creator;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getCreator() {
        return creator;
    }

    public void setCreator(Long creator) {
        this.creator = creator;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public Date getDateCreated() {
        return dateCreated;
    }

    public void setDateCreated(Date dateCreated) {
        this.dateCreated = dateCreated;
    }
}
