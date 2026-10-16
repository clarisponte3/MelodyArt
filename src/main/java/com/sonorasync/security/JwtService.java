package com.sonorasync.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

/**
 * Servicio responsable de toda la lógica JWT:
 * - Generación de tokens firmados con HMAC-SHA256.
 * - Extracción del username (correo) del token.
 * - Validación de firma, expiración y coincidencia de usuario.
 *
 * <p>Usa la API de JJWT 0.12.x (Jwts.parser() en lugar del deprecado Jwts.parserBuilder()).
 */
@Slf4j
@Service
public class JwtService {

    @Value("${jwt.secret}")
    private String jwtSecret;

    @Value("${jwt.expiration-ms}")
    private long jwtExpirationMs;

    // -------------------------------------------------------------------------
    // Generación de token
    // -------------------------------------------------------------------------

    /**
     * Genera un token JWT para el usuario dado, sin claims adicionales.
     *
     * @param userDetails el usuario autenticado por Spring Security
     * @return el token JWT firmado como String
     */
    public String generateToken(UserDetails userDetails) {
        return generateToken(new HashMap<>(), userDetails);
    }

    /**
     * Genera un token JWT con claims adicionales opcionales.
     *
     * @param extraClaims mapa de claims personalizados a incluir en el payload
     * @param userDetails el usuario autenticado por Spring Security
     * @return el token JWT firmado como String
     */
    public String generateToken(Map<String, Object> extraClaims, UserDetails userDetails) {
        Date now = new Date();
        Date expiration = new Date(now.getTime() + jwtExpirationMs);

        return Jwts.builder()
                .claims(extraClaims)
                .subject(userDetails.getUsername())  // correo del usuario
                .issuedAt(now)
                .expiration(expiration)
                .signWith(getSigningKey())            // HMAC-SHA256 (inferido por el tamaño de la clave)
                .compact();
    }

    // -------------------------------------------------------------------------
    // Extracción de claims
    // -------------------------------------------------------------------------

    /**
     * Extrae el username (correo) del token JWT.
     *
     * @param token el JWT compacto (sin prefijo "Bearer ")
     * @return el subject del token, que corresponde al correo del usuario
     */
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    /**
     * Extrae un claim específico del token usando un resolver funcional.
     *
     * @param token          el JWT compacto
     * @param claimsResolver función que mapea Claims al valor deseado
     * @param <T>            tipo del claim a extraer
     * @return el valor del claim
     */
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    // -------------------------------------------------------------------------
    // Validación
    // -------------------------------------------------------------------------

    /**
     * Verifica que el token sea válido: firma correcta, no expirado y
     * correspondiente al usuario proporcionado.
     *
     * @param token       el JWT compacto
     * @param userDetails el usuario cuya identidad se quiere verificar
     * @return {@code true} si el token es válido y pertenece al usuario
     */
    public boolean isTokenValid(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return username.equals(userDetails.getUsername()) && !isTokenExpired(token);
    }

    // -------------------------------------------------------------------------
    // Métodos privados de soporte
    // -------------------------------------------------------------------------

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    /**
     * Parsea y verifica la firma del token, retornando todos los claims.
     * Usa la API JJWT 0.12.x: {@code Jwts.parser()} (no el deprecado parserBuilder()).
     */
    private Claims extractAllClaims(String token) {
        return Jwts.parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    /**
     * Construye la SecretKey a partir del valor Base64 configurado en application.properties.
     * Se decodifica de Base64 para garantizar la longitud mínima de 256 bits requerida por HS256.
     */
    private SecretKey getSigningKey() {
        byte[] keyBytes = Base64.getDecoder().decode(jwtSecret);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
