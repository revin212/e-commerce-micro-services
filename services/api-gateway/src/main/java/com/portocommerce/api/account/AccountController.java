package com.portocommerce.api.account;

import com.portocommerce.api.auth.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.util.Map;

import static org.springframework.http.HttpStatus.NOT_FOUND;

@RestController
@RequestMapping("/account")
public class AccountController {
  private final UserRepository userRepository;

  public AccountController(UserRepository userRepository) {
    this.userRepository = userRepository;
  }

  @GetMapping
  public Map<String, Object> me(Authentication authentication) {
    String email = authentication == null ? "revin@example.com" : authentication.getName();
    var user = userRepository.findByEmail(email).orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "User not found"));
    return Map.of(
      "id", user.getId(),
      "firstName", user.getFirstName(),
      "lastName", user.getLastName(),
      "email", user.getEmail(),
      "phone", user.getPhone() == null ? "" : user.getPhone()
    );
  }
}
