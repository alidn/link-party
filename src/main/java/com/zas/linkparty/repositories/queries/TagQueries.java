package com.zas.linkparty.repositories.queries;

public class TagQueries {
    public static String insertIntoBookmarkTags = "insert into bookmark_tag (tag_id, bookmark_id) " +
            "values (?, ?);";

    public static String existsByName = "select tag_id, name from tags where name = ?";

    public static String saveTag = "insert into tags (name) values (?) returning tag_id, name;";

    public static String tagsOfBookmark = "select tags.tag_id, name from tags " +
            "inner join bookmark_tag on bookmark_tag.tag_id = tags.tag_id " +
            "where bookmark_tag.bookmark_id = ?;";
}
