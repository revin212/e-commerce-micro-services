package com.portocommerce.api.auth;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {
  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;
  private final JwtService jwtService;
  private final AuthenticationManager authenticationManager;

  public AuthController(
    UserRepository userRepository,
    PasswordEncoder passwordEncoder,
    JwtService jwtService,
    AuthenticationManager authenticationManager
  ) {
    this.userRepository = userRepository;
    this.passwordEncoder = passwordEncoder;
    this.jwtService = jwtService;
    this.authenticationManager = authenticationManager;
  }

  @PostMapping("/register")
  public AuthDtos.AuthResponse register(@Valid @RequestBody AuthDtos.RegisterRequest request) {
    if (userRepository.findByEmail(request.email()).isPresent()) {
      throw new ResponseStatusException(HttpStatus.CONFLICT, "Email already exists");
    }
    UserEntity user = new UserEntity();
    user.setFirstName(request.firstName());
    user.setLastName(request.lastName());
    user.setEmail(request.email());
    user.setPasswordHash(passwordEncoder.encode(request.password()));
    UserEntity saved = userRepository.save(user);
    String token = jwtService.generateToken(
      new org.springframework.security.core.userdetails.User(saved.getEmail(), saved.getPasswordHash(), java.util.List.of()),
      Map.of("role", saved.getRole(), "uid", saved.getId())
    );
    return new AuthDtos.AuthResponse(token, new AuthDtos.AuthUser(saved.getId(), saved.getFirstName() + " " + saved.getLastName(), saved.getEmail()));
  }

  @PostMapping("/login")
  public AuthDtos.AuthResponse login(@Valid @RequestBody AuthDtos.LoginRequest request) {
    authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.email(), request.password()));
    UserEntity user = userRepository.findByEmail(request.email())
      .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid credentials"));
    String token = jwtService.generateToken(
      new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPasswordHash(), java.util.List.of()),
      Map.of("role", user.getRole(), "uid", user.getId())
    );
    return new AuthDtos.AuthResponse(token, new AuthDtos.AuthUser(user.getId(), user.getFirstName() + " " + user.getLastName(), user.getEmail()));
  }
}
