package com.zas.linkparty.configuration;

import com.zas.linkparty.repositories.GroupRepository;
import com.zas.linkparty.repositories.TagRepository;
import com.zas.linkparty.repositories.UserRepository;
import com.zas.linkparty.repositories.queries.BookmarkQueries;
import com.zas.linkparty.repositories.queries.GroupQueries;
import com.zas.linkparty.repositories.queries.TagQueries;
import com.zas.linkparty.repositories.queries.UserQueries;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.quartz.QuartzProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.repository.NoRepositoryBean;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import javax.sql.DataSource;
import java.net.URI;
import java.net.URISyntaxException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

@Configuration
public class BeanConfig {
    @Autowired
    DataSource dataSource;

    @Bean
    public UserRepository userRepository() {
        return new UserRepository(new JdbcTemplate(dataSource), userQueries());
    }

    @Bean
    public JdbcTemplate jdbcTemplate() {
        return new JdbcTemplate(dataSource);
    }

    @Bean
    public GroupRepository groupRepository() {
        return new GroupRepository(userRepository(), new JdbcTemplate(dataSource), groupQueries());
    }

    @Bean
    public TagRepository tagRepository() {
        return new TagRepository(jdbcTemplate());
    }


    @Bean
    public BookmarkQueries bookmarkQueries() {
        return new BookmarkQueries();
    }

    @Bean
    public UserQueries userQueries() {
        return new UserQueries();
    }

    @Bean
    public TagQueries tagQueries() {
        return new TagQueries();
    }

    @Bean
    public GroupQueries groupQueries() {
        return new GroupQueries();
    }
}
