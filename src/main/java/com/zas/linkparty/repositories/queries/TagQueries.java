package com.zas.linkparty.repositories.queries;

public class TagQueries {
    public static String insertIntoBookmarkTags = "insert into bookmark_tags (tag_id, bookmark_id) " +
            "values (?, ?);";
}
