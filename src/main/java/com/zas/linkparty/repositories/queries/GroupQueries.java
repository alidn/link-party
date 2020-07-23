package com.zas.linkparty.repositories.queries;

public class GroupQueries {
    public static String save = "insert into groups (group_name, creator) values(?, ?) returning " +
            "group_id, group_name, creator, invite_edit_url, invite_view_url, date_created";

    public static String findById = "select group_id, group_name, creator, invite_edit_url, invite_view_url, date_created " +
            "from groups where group_id = ?";

    public static String findAll = "select group_id, group_name, creator, invite_edit_url, invite_view_url, date_created from groups";

    public static String addCreator = "insert into memberships (user_id, group_id, type) values (?, ?, ?::membership_type);";
}
