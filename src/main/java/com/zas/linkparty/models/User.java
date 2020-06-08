package com.zas.linkparty.models;

import java.sql.Date;

public class User {
    private Long id;
    private String username;
    private String email;
    private String password;
    private Date dateJoined;

    public User() { }

    public User(String name, String email, String password) {
        this.username = name;
        this.email = email;
        this.password = password;
    }

    public User(String name, String email, String password, Date dateJoined) {
        this.username = name;
        this.email = email;
        this.password = password;
        this.dateJoined = dateJoined;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getUsername() {
        return username;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public Date getDateJoined() {
        return dateJoined;
    }

    public void setDateJoined(Date dateJoined) {
        this.dateJoined = dateJoined;
    }
}
