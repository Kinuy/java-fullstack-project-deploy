package springweb.backend;


import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.oidcLogin;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;


@SpringBootTest
@AutoConfigureMockMvc
public class UserIntegrationTest {

    @Autowired
    MockMvc mockMvc;

    @Test
    @DirtiesContext
    @WithMockUser(username="test-user")
    void testGetMe_withLoggedInUser_expectUserName() throws Exception {
        //WHEN
        mockMvc.perform(get("/api/users/me")
                .with(oidcLogin()
                        .userInfoToken(token->token
                            .claim("login","github-username"))))
                .andExpect(status().isOk())
                .andExpect(content().string("test-user\""));
    }
    @Test
    void testGetMe_withLoggedInUser_expectAnonymousUser() throws Exception {
        mockMvc.perform(get("/api/users/me"))
                .andExpect(status().isOk())
                .andExpect(content().string("anonymousUser"));
    }
}
