package com.zas.linkparty.repositories.queries;

public class UserQueries {
    public static String findByUsername = "select user_id, username, email, password, date_joined from users where username = ?";

    public static String isMemberOfGroup = "select users.user_id, users.username, users.email, users.password, users.date_joined from memberships "
            + "inner join " + "groups on groups.group_id= " + "memberships.group_id and groups.group_id=? "
            + "inner join " + "users on users.user_id= " + "memberships.user_id and users.username=?;";

    public static String findById = "select user_id, username, email, password, date_joined from users where user_id = ?";

    public static String findUsersOfGroup = "select user_id, username, email, password, date_joined from users ";
}
