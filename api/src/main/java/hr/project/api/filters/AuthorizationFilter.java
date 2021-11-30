package hr.project.api.filters;

import io.jsonwebtoken.Jwts;

import org.springframework.security.authentication.*;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import hr.project.api.ProjectKeys;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.io.IOException;

public class AuthorizationFilter extends BasicAuthenticationFilter
{
    ProjectKeys projectKeys;
    AuthenticationManager authenticationManager;
    UserDetailsService userDetailsService;
    public AuthorizationFilter(
        AuthenticationManager authenticationManager,
        ProjectKeys projectKey,
        UserDetailsService userDetailsService)
    {
        super(authenticationManager);
        this.projectKeys = projectKey;
        this.authenticationManager = authenticationManager;
        this.userDetailsService = userDetailsService;
    }

    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws IOException, ServletException
    {
        String header = request.getHeader("Authorization");
        if(header == null || !header.startsWith("Bearer"))
        {
            filterChain.doFilter(request,response);
            return;
        }
        UsernamePasswordAuthenticationToken authenticationToken = getAuthentication(request);
        SecurityContextHolder.getContext().setAuthentication(authenticationToken);
        filterChain.doFilter(request,response);
    }
    private UsernamePasswordAuthenticationToken getAuthentication(HttpServletRequest request)
    {
        String token = request.getHeader("Authorization");
        if(token != null)
        {
            String user = Jwts.parser().setSigningKey(projectKeys.keypair.getPublic())
                    .parseClaimsJws(token.replace("Bearer",""))
                    .getBody()
                    .getSubject();
            if(user != null)
            {
                UserDetails userDetails = userDetailsService.loadUserByUsername(user);
                return new UsernamePasswordAuthenticationToken(user, null, userDetails.getAuthorities());
            }
            return null;
        }
        return null;
    }

}