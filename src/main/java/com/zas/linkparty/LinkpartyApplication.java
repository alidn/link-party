package com.zas.linkparty;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

import javax.sql.DataSource;

@SpringBootApplication
public class LinkpartyApplication {

    public static void main(String[] args) {
        SpringApplication.run(LinkpartyApplication.class, args);
    }

}
