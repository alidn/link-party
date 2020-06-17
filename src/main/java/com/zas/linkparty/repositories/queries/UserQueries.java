package com.zas.linkparty.repositories.queries;

public class UserQueries {
    public static String findByUsername = "select user_id, username, email, password, date_joined from users where username = ?";
}
