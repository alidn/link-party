package com.zas.linkparty.repositories.queries;

public class BookmarkQueries {
    public static String save = "insert into bookmarks " + "(url, title, description, creator, group_id) "
            + "values (?, ?, ?, ?, ?) returning bookmark_id, url, title, description, date_created, creator, group_id";

    public static String findById = "select bookmark_id, url, title, description, date_created, creator, group_id "
            + "from bookmarks where bookmark_id = ?";

    public static String findAll = "select bookmark_id, url, title, description, date_created, creator, group_id "
            + "from bookmarks";

    public static String findBookmarksOfGroup = "select bookmark_id, url, title, description, date_created, creator, group_id "
            + "from bookmarks where group_id = ?";

    public static String findBookmarksWithTag = "select bookmarks.bookmark_id, bookmarks.title from tags "
            + "inner join " + "bookmark_tag on bookmark_tag.tag_id= " + "tags.tag_id inner "
            + "join bookmarks " + "on bookmark_tag.bookmark_id= "
            + "bookmark_tag.bookmark_id where tags.name='Hello world'";

    public static String deleteBookmark = "delete from bookmark_tag where bookmark_id = ?; delete from bookmarks where bookmark_id = ?";

    public static String getFromQuery = "select distinct bookmark_id, url, title, description, date_created, creator, group_id\n" +
            "from bookmarks\n" +
            "         inner join bookmark_tag using (bookmark_id)\n" +
            "         inner join tags using (tag_id)\n" +
            "where to_tsvector(description) @@ to_tsquery(?)\n" +
            "   or to_tsvector(title) @@ to_tsquery(?)\n" +
            "   or to_tsvector(name) @@ to_tsquery(?)\n" +
            "    and group_id = ?;";
}
