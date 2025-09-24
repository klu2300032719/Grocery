package com.klef.fsd.springboot.service;

import com.klef.fsd.springboot.model.User;

public interface AuthService {
    User register(User user) throws Exception;
    User login(String username, String password) throws Exception;
}
