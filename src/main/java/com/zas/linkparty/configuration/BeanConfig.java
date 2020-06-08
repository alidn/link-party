package com.zas.linkparty.configuration;

import com.zas.linkparty.repositories.GroupRepository;
import com.zas.linkparty.repositories.UserRepository;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.net.URISyntaxException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

@Configuration
public class BeanConfig {
    @Bean
    public UserRepository userRepository() throws URISyntaxException, SQLException {
        return new UserRepository();
    }

    @Bean
    public GroupRepository groupRepository() {
        return new GroupRepository();
    }
}
