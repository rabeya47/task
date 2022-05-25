package com.example.service;

import org.springframework.stereotype.Service;

import com.example.model.User;
import com.example.repository.UserRepository;

@Service
public class MyService {

	private final UserRepository userRepo;

	public MyService(UserRepository userRepo) {
		this.userRepo = userRepo;
	}

	public User saveUser(User user) {
		user = userRepo.save(user);
		return user;
	}

	public User updateUser(User payload) {
		User userbyId = userRepo.findByUserId(payload.getUserId());
		userbyId.setPassword(payload.getPassword());
		User user = userRepo.save(userbyId);
		return user;
	}

	public User getUserByUserId(String userId) {

		return userRepo.findByUserId(userId);
	}

}
