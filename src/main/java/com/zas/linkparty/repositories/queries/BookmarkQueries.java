package com.zas.linkparty.repositories.queries;

public class BookmarkQueries {
    public static String save = "insert into bookmarks " +
            "(url, title, description, creator, group_id) " +
            "values (?, ?, ?, ?, ?) returning bookmark_id, url, title, description, date_created, creator, group_id";

    public static String findById = "select bookmark_id, url, title, description, date_created, user_id, group_id " +
            "from bookmarks where bookmark_id = ?";

    public static String findAll = "select bookmark_id, url, title, description, date_created, user_id, group_id " +
            "from bookmarks";
}
