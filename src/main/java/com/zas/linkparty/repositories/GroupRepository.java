package com.zas.linkparty.repositories;

import com.zas.linkparty.models.Bookmark;
import com.zas.linkparty.models.Group;
import com.zas.linkparty.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;

import javax.sql.DataSource;
import java.awt.print.Book;
import java.sql.*;
import java.util.ArrayList;
import java.util.Optional;
import java.util.UUID;

public class GroupRepository implements GroupCrudRepository {

    @Autowired
    private DataSource dataSource;

    @Override
    public <S extends Group> S save(S group) {
        return null;
    }

    public Optional<Group> save(String username, String groupName) {
        Connection connection = null;
        final String sqlSaveBookmark = "insert into memberships (user_id, group_id, type) " +
                "select user_id, ?, 'created' from users where username = ?;";
        try {
            Optional<Group> group = save(groupName);
            if (group.isEmpty()) {
                return Optional.empty();
            } else {
                connection = dataSource.getConnection();
                PreparedStatement preparedStatement = connection.prepareStatement(sqlSaveBookmark);
                preparedStatement.setLong(1, group.get().getId());
                preparedStatement.setString(2, username);
                preparedStatement.executeUpdate();
                return group;
            }
        } catch (SQLException sqlException) {
            sqlException.printStackTrace();
        }
        if (connection != null) {
            try {
                connection.close();
            } catch (SQLException sqlException) {
                sqlException.printStackTrace();
            }
        }
        return Optional.empty();
    }

    public Optional<Group> save(String name) {
        Connection connection = null;
        final String sqlSaveBookmark = "insert into groups (group_name) " +
                "values (?) returning group_id, invite_edit_url, invite_view_url, date_created;";
        try {
            connection = dataSource.getConnection();
            PreparedStatement preparedStatement = connection.prepareStatement(sqlSaveBookmark);
            preparedStatement.setString(1, name);
            ResultSet resultSet = preparedStatement.executeQuery();

            if (resultSet.next()) {
                Long groupId = resultSet.getLong(1);
                String inviteEditUrl = resultSet.getString(2);
                String inviteViewUrl = resultSet.getString(3);
                Date dateCreated = resultSet.getDate(4);
                Group result = new Group(groupId, name, dateCreated, inviteEditUrl, inviteViewUrl);
                return Optional.of(result);
            } else {
                return Optional.empty();
            }
        } catch (SQLException sqlException) {
            sqlException.printStackTrace();
        }
        if (connection != null) {
            try {
                connection.close();
            } catch (SQLException sqlException) {
                sqlException.printStackTrace();
            }
        }
        return Optional.empty();
    }

    @Override
    public <S extends Group> Iterable<S> saveAll(Iterable<S> iterable) {
        return null;
    }

    @Override
    public Optional<Group> findById(Long aLong) {
        Connection connection = null;
        final String sqlFindById = "select group_name, invite_edit_url, invite_view_url," +
                " date_created from groups where group_id = ?;";
        try {
            connection = dataSource.getConnection();
            PreparedStatement preparedStatement = connection.prepareStatement(sqlFindById);
            preparedStatement.setLong(1, aLong);
            ResultSet resultSet = preparedStatement.executeQuery();
            if (resultSet.next()) {
                String name = resultSet.getString(1);
                String inviteEditUrl = resultSet.getString(2);
                String inviteViewUrl = resultSet.getString(3);
                Date dateCreated = resultSet.getDate(4);
                Group group = new Group(aLong, name, dateCreated, inviteEditUrl, inviteViewUrl);
                return Optional.of(group);
            } else {
                return Optional.empty();
            }
        } catch (SQLException sqlException) {
            sqlException.printStackTrace();
        }
        if (connection != null) {
            try {
                connection.close();
            } catch (SQLException sqlException) {
                sqlException.printStackTrace();
            }
        }
        return Optional.empty();
    }

    @Override
    public boolean existsById(Long aLong) {
        Connection connection = null;
        final String sqlFindById = "select group_name from groups where group_id = ?;";
        try {
            connection = dataSource.getConnection();
            PreparedStatement preparedStatement = connection.prepareStatement(sqlFindById);
            preparedStatement.setLong(1, aLong);
            ResultSet resultSet = preparedStatement.executeQuery();
            return resultSet.next();
        } catch (SQLException sqlException) {
            sqlException.printStackTrace();
        }
        if (connection != null) {
            try {
                connection.close();
            } catch (SQLException sqlException) {
                sqlException.printStackTrace();
            }
        }
        return false;
    }

    @Override
    public Iterable<Group> findAll() {
        Connection connection = null;
        ArrayList<Group> result = new ArrayList<>();
        final String sqlFindById = "select group_id, group_name, invite_edit_url, invite_view_url," +
                " date_created from groups;";
        try {
            connection = dataSource.getConnection();
            PreparedStatement preparedStatement = connection.prepareStatement(sqlFindById);
            ResultSet resultSet = preparedStatement.executeQuery();
            if (resultSet.next()) {
                Long groupId = resultSet.getLong(1);
                String name = resultSet.getString(2);
                String inviteEditUrl = resultSet.getString(3);
                String inviteViewUrl = resultSet.getString(4);
                Date dateCreated = resultSet.getDate(5);
                Group group = new Group(groupId, name, dateCreated, inviteEditUrl, inviteViewUrl);
                result.add(group);
            } else {
                return result;
            }
        } catch (SQLException sqlException) {
            sqlException.printStackTrace();
        }
        if (connection != null) {
            try {
                connection.close();
            } catch (SQLException sqlException) {
                sqlException.printStackTrace();
            }
        }
        return result;
    }

    @Override
    public Iterable<Group> findAllById(Iterable<Long> iterable) {
        return null;
    }

    @Override
    public long count() {
        Connection connection = null;
        final String sqlCountAll = "select count(*) from groups;";
        try {
            connection = dataSource.getConnection();
            Statement statement = connection.createStatement();
            ResultSet resultSet = statement.executeQuery(sqlCountAll);
            if (resultSet.next()) {
                return resultSet.getLong(1);
            } else {
                return 0;
            }
        } catch (SQLException sqlException) {
            sqlException.printStackTrace();
        }
        if (connection != null) {
            try {
                connection.close();
            } catch (SQLException sqlException) {
                sqlException.printStackTrace();
            }
        }
        return 0;
    }

    @Override
    public void deleteById(Long aLong) {

    }

    @Override
    public void delete(Group group) {

    }

    @Override
    public void deleteAll(Iterable<? extends Group> iterable) {

    }

    @Override
    public void deleteAll() {

    }

    @Override
    public ArrayList<User> findUsersWhoCanEditById(Long aLong) {
        Connection connection = null;
        ArrayList<User> result = new ArrayList<>();
        final String sqlFindWhoCanEdit = "select users.user_id, users.username, users.email, users.password, users.date_joined\n" +
                "from groups\n" +
                "    inner join memberships\n" +
                "        on memberships.group_id = groups.group_id\n" +
                "    inner join users\n" +
                "        on memberships.user_id = users.user_id\n" +
                "    where groups.group_id = ? and " +
                "       memberships.type = 'can_edit';";
        try {
            connection = dataSource.getConnection();
            PreparedStatement preparedStatement = connection.prepareStatement(sqlFindWhoCanEdit);
            preparedStatement.setLong(1, aLong);
            ResultSet resultSet = preparedStatement.executeQuery();
            while (resultSet.next()) {
                User user = new User();
                user.setId(resultSet.getLong(1));
                user.setUsername(resultSet.getString(2));
                user.setEmail(resultSet.getString(3));
                user.setPassword(resultSet.getString(4));
                user.setDateJoined(resultSet.getDate(5));
                result.add(user);
            }
        } catch (SQLException sqlException) {
            sqlException.printStackTrace();
        }
        if (connection != null) {
            try {
                connection.close();
            } catch (SQLException sqlException) {
                sqlException.printStackTrace();
            }
        }
        return result;
    }

    @Override
    public ArrayList<User> findUsersWhoCanOnlyViewById(Long aLong) {
        Connection connection = null;
        ArrayList<User> result = new ArrayList<>();
        final String sqlFindWhoCanOnlyView = "select users.user_id, users.username, users.email, users.password, users.date_joined\n" +
                "from groups\n" +
                "    inner join memberships\n" +
                "        on memberships.group_id = groups.group_id\n" +
                "    inner join users\n" +
                "        on memberships.user_id = users.user_id\n" +
                "    where groups.group_id = ? and " +
                "       memberships.type = 'can_view';";
        try {
            connection = dataSource.getConnection();
            PreparedStatement preparedStatement = connection.prepareStatement(sqlFindWhoCanOnlyView);
            preparedStatement.setLong(1, aLong);
            ResultSet resultSet = preparedStatement.executeQuery();
            while (resultSet.next()) {
                User user = new User();
                user.setId(resultSet.getLong(1));
                user.setUsername(resultSet.getString(2));
                user.setEmail(resultSet.getString(3));
                user.setPassword(resultSet.getString(4));
                user.setDateJoined(resultSet.getDate(5));
                result.add(user);
            }
        } catch (SQLException sqlException) {
            sqlException.printStackTrace();
        }
        if (connection != null) {
            try {
                connection.close();
            } catch (SQLException sqlException) {
                sqlException.printStackTrace();
            }
        }
        return result;
    }

    public User findWhoCreated(Long aLong) {
        Connection connection = null;
        final String sqlFindWhoCreated = "select users.user_id, users.username, users.email, users.password, users.date_joined\n" +
                "from groups\n" +
                "    inner join memberships\n" +
                "        on memberships.group_id = groups.group_id\n" +
                "    inner join users\n" +
                "        on memberships.user_id = users.user_id\n" +
                "    where groups.group_id = ? and " +
                "       memberships.type = 'created';";
        try {
            connection = dataSource.getConnection();
            PreparedStatement preparedStatement = connection.prepareStatement(sqlFindWhoCreated);
            preparedStatement.setLong(1, aLong);
            ResultSet resultSet = preparedStatement.executeQuery();
            if (resultSet.next()) {
                User user = new User();
                user.setId(resultSet.getLong(1));
                user.setUsername(resultSet.getString(2));
                user.setEmail(resultSet.getString(3));
                user.setPassword(resultSet.getString(4));
                user.setDateJoined(resultSet.getDate(5));
                return user;
            }
        } catch (SQLException sqlException) {
            sqlException.printStackTrace();
        }
        if (connection != null) {
            try {
                connection.close();
            } catch (SQLException sqlException) {
                sqlException.printStackTrace();
            }
        }
        return null;
    }

    public Iterable<Bookmark> findBookmarks(Long aLong) {
        Connection connection = null;
        ArrayList<Bookmark> result = new ArrayList<>();
        final String sqlFindBookmarks = "select bookmarks.bookmark_id, bookmarks.title, bookmarks.url, bookmarks.description\n" +
                "    from groups\n" +
                "        inner join bookmarks on groups.group_id = bookmarks.group_id\n" +
                "    where groups.group_id = ?";
        try {
            connection = dataSource.getConnection();
            PreparedStatement preparedStatement = connection.prepareStatement(sqlFindBookmarks);
            preparedStatement.setLong(1, aLong);
            ResultSet resultSet = preparedStatement.executeQuery();
            while (resultSet.next()) {
                Bookmark bookmark = new Bookmark();
                bookmark.setId(resultSet.getLong(1));
                bookmark.setTitle(resultSet.getString(2));
                bookmark.setUrl(resultSet.getString(3));
                bookmark.setDescription(resultSet.getString(4));
                result.add(bookmark);
            }
        } catch (SQLException sqlException) {
            sqlException.printStackTrace();
        }
        if (connection != null) {
            try {
                connection.close();
            } catch (SQLException sqlException) {
                sqlException.printStackTrace();
            }
        }
        return result;
    }

    public boolean saveBookmark(Long aLong, Bookmark bookmark) {
        Connection connection = null;
        final String sqlSaveBookmark = "insert into bookmarks (url, title, description, group_id) \n" +
                "values (?, ?, ?, ?);";
        try {
            connection = dataSource.getConnection();
            PreparedStatement preparedStatement = connection.prepareStatement(sqlSaveBookmark);
            preparedStatement.setString(1, bookmark.getUrl());
            preparedStatement.setString(2, bookmark.getTitle());
            preparedStatement.setString(3, bookmark.getDescription());
            preparedStatement.setLong(4, aLong);
            preparedStatement.executeUpdate();
            return true;
        } catch (SQLException sqlException) {
            sqlException.printStackTrace();
        }
        if (connection != null) {
            try {
                connection.close();
            } catch (SQLException sqlException) {
                sqlException.printStackTrace();
            }
        }
        return false;
    }

    public boolean canEdit(String username, String url) {
        Connection connection = null;
        final String sqlIsJoined = "select groups.group_id\n" +
                "    from groups\n" +
                "    inner join users on username = ?\n" +
                "    inner join memberships\n" +
                "        on groups.group_id = memberships.group_id and\n" +
                "           memberships.user_id = users.user_id and\n" +
                "           (memberships.type = 'can_edit' or  memberships.type = 'created')" +
                "    where groups.invite_edit_url = ?";
        try {
            connection = dataSource.getConnection();
            PreparedStatement preparedStatement = connection.prepareStatement(sqlIsJoined);
            preparedStatement.setString(1, username);
            UUID uuidUrl;
            try {
                uuidUrl = UUID.fromString(url);
            } catch (IllegalArgumentException e) {
                return false;
            }
            preparedStatement.setObject(2, uuidUrl);
            ResultSet resultSet = preparedStatement.executeQuery();
            if (resultSet.next()) {
                return true;
            } else {
                return false;
            }
        } catch (SQLException sqlException) {
            sqlException.printStackTrace();
        }
        if (connection != null) {
            try {
                connection.close();
            } catch (SQLException sqlException) {
                sqlException.printStackTrace();
            }
        }
        return false;
    }

    public boolean canView(String username, String url) {
        Connection connection = null;
        final String sqlIsJoined = "select groups.group_id\n" +
                "    from groups\n" +
                "    inner join users on username = ?\n" +
                "    inner join memberships\n" +
                "        on groups.group_id = memberships.group_id and\n" +
                "           memberships.user_id = users.user_id and\n" +
                "           memberships.type = 'can_view'" +
                "    where groups.invite_view_url = ?";
        try {
            connection = dataSource.getConnection();
            PreparedStatement preparedStatement = connection.prepareStatement(sqlIsJoined);
            preparedStatement.setString(1, username);
            UUID uuidUrl;
            try {
                uuidUrl = UUID.fromString(url);
            } catch (IllegalArgumentException e) {
                return false;
            }
            preparedStatement.setObject(2, uuidUrl);
            ResultSet resultSet = preparedStatement.executeQuery();
            return resultSet.next();
        } catch (SQLException sqlException) {
            sqlException.printStackTrace();
        }
        if (connection != null) {
            try {
                connection.close();
            } catch (SQLException sqlException) {
                sqlException.printStackTrace();
            }
        }
        return false;
    }

    public boolean canAddBookmark(String username, Long groupId) {
        Connection connection = null;
        final String sqlCanAddBookmark = "select membership_id\n" +
                "    from memberships\n" +
                "    inner join users\n" +
                "        on memberships.user_id = users.user_id and\n" +
                "           users.username = ?" +
                "    where (memberships.type = 'created' or\n" +
                "           memberships.type = 'can_edit') and\n" +
                "          memberships.group_id = ?;";
        try {
            connection = dataSource.getConnection();
            PreparedStatement preparedStatement = connection.prepareStatement(sqlCanAddBookmark);
            preparedStatement.setString(1, username);
            preparedStatement.setLong(2, groupId);
            ResultSet resultSet = preparedStatement.executeQuery();
            return resultSet.next();
        } catch (SQLException sqlException) {
            sqlException.printStackTrace();
        }
        if (connection != null) {
            try {
                connection.close();
            } catch (SQLException sqlException) {
                sqlException.printStackTrace();
            }
        }
        return false;
    }

    public boolean isCreator(String username, String url) {
        Connection connection = null;
        final String sqlIsCreator = "select groups.group_id\n" +
                "    from groups\n" +
                "    inner join users on username = ?\n" +
                "    inner join memberships\n" +
                "        on groups.group_id = memberships.group_id and\n" +
                "           memberships.user_id = users.user_id and\n" +
                "           memberships.type = 'created'" +
                "    where groups.invite_view_url = ? or " +
                "          groups.invite_edit_url = ?;";
        try {
            connection = dataSource.getConnection();
            PreparedStatement preparedStatement = connection.prepareStatement(sqlIsCreator);
            preparedStatement.setString(1, username);
            UUID uuidUrl;
            try {
                uuidUrl = UUID.fromString(url);
            } catch (IllegalArgumentException e) {
                return false;
            }
            preparedStatement.setObject(2, uuidUrl);
            preparedStatement.setObject(3, uuidUrl);
            ResultSet resultSet = preparedStatement.executeQuery();
            return resultSet.next();
        } catch (SQLException sqlException) {
            sqlException.printStackTrace();
        }
        if (connection != null) {
            try {
                connection.close();
            } catch (SQLException sqlException) {
                sqlException.printStackTrace();
            }
        }
        return false;
    }

    public boolean upgradeStatus(String username, String url) {
        final String sqlUpdateStatus = "update memberships\n" +
                "    set type = 'can_view'\n" +
                "from users, groups\n" +
                "     where users.user_id = ? and\n" +
                "           memberships.group_id = groups.group_id and\n" +
                "           groups.invite_edit_url = ? and\n" +
                "           users.user_id = memberships.user_id\n" +
                "\n;";
        Connection connection = null;
        try {
            connection = dataSource.getConnection();
            PreparedStatement preparedStatement = connection.prepareStatement(sqlUpdateStatus);
            preparedStatement.setString(1, username);
            UUID urlUUID;
            try {
                urlUUID = UUID.fromString(url);
                preparedStatement.setObject(2, urlUUID);
                int rowsUpdated = preparedStatement.executeUpdate();
                return rowsUpdated > 0;
            } catch (IllegalArgumentException e) {
                return false;
            }
        } catch (SQLException sqlException) {
            sqlException.printStackTrace();
        }
        if (connection != null) {
            try {
                connection.close();
            } catch (SQLException sqlException) {
                sqlException.printStackTrace();
            }
        }
        return false;
    }

    public boolean join(String username, String url) {
        final String sqlJoin = "insert into memberships (user_id, group_id, type)\n" +
                "values ((select user_id from users where username = ?),\n" +
                "        (select group_id from groups\n" +
                "            where invite_edit_url = ? or\n" +
                "                  invite_view_url = ?),\n" +
                "        (case\n" +
                "            when (select invite_view_url from groups where invite_view_url = ?) = ?\n" +
                "                then 'can_view'\n" +
                "            else 'can_edit'\n" +
                "        end)::membership_type)\n";
        Connection connection = null;
        try {
            connection = dataSource.getConnection();
            PreparedStatement preparedStatement = connection.prepareStatement(sqlJoin);
            preparedStatement.setString(1, username);
            UUID urlUUID;
            try {
                urlUUID = UUID.fromString(url);
                preparedStatement.setObject(2, urlUUID);
                preparedStatement.setObject(3, urlUUID);
                preparedStatement.setObject(4, urlUUID);
                preparedStatement.setObject(5, urlUUID);
                int rowsUpdated = preparedStatement.executeUpdate();
                return rowsUpdated > 0;
            } catch (IllegalArgumentException e) {
                return false;
            }
        } catch (SQLException sqlException) {
            sqlException.printStackTrace();
        }
        if (connection != null) {
            try {
                connection.close();
            } catch (SQLException sqlException) {
                sqlException.printStackTrace();
            }
        }
        return false;
    }
}
