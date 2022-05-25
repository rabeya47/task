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
@RequestMapping("api/v1/user")
@CrossOrigin(origins = "*")
public class UserContoller {
	Logger log = LoggerFactory.getLogger(UserContoller.class);

	private final MyService service;
	private final ApiResponse res;

	@Autowired
	public UserContoller(MyService service, ApiResponse res) {
		this.service = service;
		this.res = res;
	}

	@PostMapping("/save")
	public ResponseEntity<?> save(@RequestBody User payload) {
		log.info("Invoke User save api[save(@RequestBody User payload)]");
		try {
			User dbUser = service.getUserByUserId(payload.getUserId());
			if (dbUser == null) {
				User user = service.saveUser(payload);
				res.setMessage("Registration Successful");
				res.setStatus(MyConstant.SUCCESS);
				res.setData(user);
				log.info(res.getMessage() + " with UserId : " + payload.getUserId());
				return ResponseEntity.ok(res);
			} else {
				res.setMessage("userId already in use");
				res.setStatus(MyConstant.FAILED);
				res.setData(null);
				log.error(res.getMessage() + " with UserId : " + payload.getUserId());
				return ResponseEntity.status(HttpStatus.CONFLICT).body(res);
			}
		} catch (Exception e) {
			res.setMessage(e.getMessage());
			res.setStatus(MyConstant.FAILED);
			res.setData(null);
			log.error("Sarver error: " + res.getMessage());
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(res);
		}
	}

	@PostMapping("/forgetPass")
	public ResponseEntity<?> matchUser(@RequestBody User payload) {
		log.info("Invoke api for match userId[matchUser(@RequestBody User payload)]");
		try {
			User dbUser = service.getUserByUserId(payload.getUserId());
			if (dbUser == null) {
				res.setMessage("User Id not found");
				res.setStatus(MyConstant.FAILED);
				res.setData(null);
				log.error(res.getMessage() + " with UserId : " + payload.getUserId());
				return ResponseEntity.status(HttpStatus.CONFLICT).body(res);
			} else {
				res.setMessage("User Found");
				res.setStatus(MyConstant.SUCCESS);
				res.setData(dbUser);
				log.info(res.getMessage() + " with UserId : " + payload.getUserId());
				return ResponseEntity.ok(res);
			}
		} catch (Exception e) {
			res.setMessage(e.getMessage());
			res.setStatus(MyConstant.FAILED);
			res.setData(null);
			log.error("Sarver error: " + res.getMessage());
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(res);
		}
	}

	@PostMapping("/reset")
	public ResponseEntity<?> resetPassword(@RequestBody User payload) {
		log.info("Invoke api for reset password[resetPassword(@RequestBody User payload)]");
		try {
			User user = service.updateUser(payload);
			res.setMessage("Reset your password successfully");
			res.setStatus(MyConstant.SUCCESS);
			res.setData(user);
			log.info(res.getMessage() + " with UserId : " + payload.getUserId());
			return ResponseEntity.ok(res);
		} catch (Exception e) {
			res.setMessage(e.getMessage());
			res.setStatus(MyConstant.FAILED);
			res.setData(null);
			log.error("Sarver error: " + res.getMessage());
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(res);
		}
	}

}
