package com.portocommerce.api.auth;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.Date;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtService {
  private final SecretKey key;
  private final long expirationSeconds;

  public JwtService(
    @Value("${app.jwt.secret}") String secret,
    @Value("${app.jwt.expiration-seconds}") long expirationSeconds
  ) {
    byte[] keyBytes = secret.getBytes(StandardCharsets.UTF_8);
    this.key = Keys.hmacShaKeyFor(keyBytes.length >= 32 ? keyBytes : (secret + "01234567890123456789012345678901").substring(0, 32).getBytes(StandardCharsets.UTF_8));
    this.expirationSeconds = expirationSeconds;
  }

  public String generateToken(UserDetails userDetails, Map<String, Object> claims) {
    Instant now = Instant.now();
    return Jwts.builder()
      .claims(claims)
      .subject(userDetails.getUsername())
      .issuedAt(Date.from(now))
      .expiration(Date.from(now.plusSeconds(expirationSeconds)))
      .signWith(key)
      .compact();
  }

  public String extractUsername(String token) {
    return extractClaim(token, Claims::getSubject);
  }

  public boolean isTokenValid(String token, UserDetails userDetails) {
    return extractUsername(token).equals(userDetails.getUsername()) && extractClaim(token, Claims::getExpiration).after(new Date());
  }

  private <T> T extractClaim(String token, Function<Claims, T> resolver) {
    Claims claims = Jwts.parser().verifyWith(key).build().parseSignedClaims(token).getPayload();
    return resolver.apply(claims);
  }
}
