package com.zas.linkparty.configuration;

import com.zas.linkparty.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private UserRepository userRepository;

    @Autowired
    public SecurityConfig(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.httpBasic().and().authorizeRequests()
                .antMatchers("/api").authenticated()
                .antMatchers("/api/*").authenticated()
                .antMatchers("/api/*/*").authenticated()
                .antMatchers("/api/*/*/*").authenticated()
                .antMatchers("/auth/login").authenticated()
                .and().cors().and().csrf().disable();
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.authenticationProvider(new CustomAuthenticationProvider(this.userRepository));
    }


}
