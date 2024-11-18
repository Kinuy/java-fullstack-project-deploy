package springweb.backend.security;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableWebSecurity
public class SecurityConfig {


    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(a->a
                        .requestMatchers(HttpMethod.GET,"/api/todo").permitAll()
                        .requestMatchers(HttpMethod.POST,"/api/todo").authenticated()
                        .requestMatchers(HttpMethod.GET,"/api/todo/me").authenticated()
                        //.anyRequest().authenticated()
                        .anyRequest().permitAll())
                .sessionManagement(sessions-> sessions.sessionCreationPolicy(SessionCreationPolicy.ALWAYS))
                .oauth2Login(o->o.defaultSuccessUrl("http://localhost:5173"))
                .exceptionHandling(e->e.authenticationEntryPoint(new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED)));
        return http.build();
    }
}
