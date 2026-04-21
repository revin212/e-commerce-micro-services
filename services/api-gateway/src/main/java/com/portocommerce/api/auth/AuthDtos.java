package com.portocommerce.api.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public class AuthDtos {
  public record LoginRequest(@Email String email, @NotBlank String password) {}
  public record RegisterRequest(@NotBlank String firstName, @NotBlank String lastName, @Email String email, @NotBlank String password) {}
  public record AuthUser(String id, String name, String email) {}
  public record AuthResponse(String token, AuthUser user) {}
}
