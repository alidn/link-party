package com.zas.linkparty.configuration;

import com.zas.linkparty.models.User;
import com.zas.linkparty.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;

import java.util.Optional;

public class CustomAuthenticationProvider implements AuthenticationProvider {

    UserRepository userRepository;

    @Autowired
    public CustomAuthenticationProvider(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        String name = authentication.getName();
        String password = authentication.getCredentials().toString();
        Optional<User> user = userRepository.findByUsername(name);
        if (user.isEmpty()) {
            throw new BadCredentialsException("Username doesn't exist");
        } else {
            System.out.println(user.get());
            if (user.get().getPassword().equals(password)) {
                return new UsernamePasswordAuthenticationToken(name, password, null);
            } else {
                throw new BadCredentialsException("Wrong password");
            }
        }
    }

    @Override
    public boolean supports(Class<?> aClass) {
        return aClass.equals(UsernamePasswordAuthenticationToken.class);
    }
}
