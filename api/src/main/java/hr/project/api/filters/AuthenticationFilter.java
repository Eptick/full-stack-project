package hr.project.api.filters;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.util.StringUtils;

import hr.project.api.ProjectKeys;
import hr.project.api.dto.AccessTokenDto;
import hr.project.api.dto.UserDto;

import javax.servlet.FilterChain;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

public class AuthenticationFilter extends UsernamePasswordAuthenticationFilter
{
    private AuthenticationManager authenticationManager;
    private UserDetailsService userDetailsService;

    ProjectKeys projectKeys;

    public AuthenticationFilter(
        AuthenticationManager authenticationManager,
        ProjectKeys projectKeys,
        UserDetailsService userDetailsService)
    {
        this.authenticationManager = authenticationManager;
        this.projectKeys = projectKeys;
        this.userDetailsService = userDetailsService;
        setFilterProcessesUrl("/login");
    }
    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException
    {
        try
        {
            UserDto creds = new ObjectMapper().readValue(request.getInputStream(), UserDto.class);
            UserDetails userDetails = userDetailsService.loadUserByUsername(creds.getUsername());
            return authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(creds.getUsername(), creds.getPassword(), userDetails.getAuthorities()));
        }
        catch(IOException e)
        {
            throw new RuntimeException("Could not read request" + e);
        }
    }
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain, Authentication authentication)
    {
        Date expires = new Date(System.currentTimeMillis() + 86_400_000); // 1 day
        User user = ((User) authentication.getPrincipal());
        Map<String, Object> claims = new HashMap<String, Object>() {{
            put("roles", StringUtils.arrayToCommaDelimitedString(user.getAuthorities().toArray()));
        }}; 
        String token = Jwts.builder()
                .setClaims(claims) // first set the claims so that the setSubject and setExpiration overrides the information
                .setSubject(user.getUsername())
                .setExpiration(expires)
                .signWith(SignatureAlgorithm.RS256, projectKeys.keypair.getPrivate())
                .compact();
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            response.getWriter().write(objectMapper.writeValueAsString(new AccessTokenDto(token)));
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }

}