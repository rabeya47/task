package com.example.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.model.User;
import com.example.service.MyService;
import com.example.utilities.ApiResponse;
import com.example.utilities.MyConstant;

@RestController
@RequestMapping("api/v1")
@CrossOrigin(origins = "*")
public class LoginController {

	Logger log = LoggerFactory.getLogger(LoginController.class);

	private final MyService service;
	private final ApiResponse res;

	@Autowired
	public LoginController(MyService service, ApiResponse res) {
		this.service = service;
		this.res = res;
	}

	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody User payload) {
		log.info("Invoke Login api[login(@RequestBody User payload)]");
		try {
			User dbUser = service.getUserByUserId(payload.getUserId());
			if (dbUser == null) {
				res.setMessage("User not found");
				res.setStatus(MyConstant.FAILED);
				res.setData(null);
				log.error(res.getMessage() + " with UserId : " + payload.getUserId());
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body(res);
			} else {
				if (dbUser.getPassword().equals(payload.getPassword())) {
					res.setMessage("Login Successful");
					res.setStatus(MyConstant.SUCCESS);
					res.setData(dbUser);
					log.info(res.getMessage() + " with UserId : " + dbUser.getUserId());
					return ResponseEntity.ok(res);
				} else {
					res.setMessage("userId or password does not match");
					res.setStatus(MyConstant.FAILED);
					res.setData(null);
					log.error(res.getMessage() + " with UserId : " + dbUser.getUserId());
					return ResponseEntity.status(HttpStatus.NOT_FOUND).body(res);
				}
			}
		} catch (Exception e) {
			res.setMessage(e.getMessage());
			res.setStatus(MyConstant.FAILED);
			res.setData(null);
			log.error("Server error: " + res.getMessage());
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(res);
		}
	}
}
