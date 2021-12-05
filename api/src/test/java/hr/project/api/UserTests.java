package hr.project.api;

import java.util.ArrayList;
import java.util.Arrays;

import com.fasterxml.jackson.databind.ObjectMapper;
import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import hr.project.api.dto.UserDto;
import hr.project.api.models.Role;
import hr.project.api.models.User;
import hr.project.api.repositories.RoleRepository;
import hr.project.api.services.UserService;

@RunWith(JUnit4.class)
@SpringBootTest
@AutoConfigureMockMvc
// @AutoConfigureTestDatabase
public class UserTests {
    @Autowired
    private WebApplicationContext context;

    @Autowired
	private MockMvc mockMvc;
    
    @Autowired
	private RoleRepository roleRepository;
    @Autowired
	private UserService userService;
    
    @BeforeEach
    public void init() {
        if(!userService.usernameExists("username")) {
            var roles = new ArrayList<Role>(Arrays.asList(new Role("ROLE_ADMIN")));
            User u = new User();
            u.setUsername("username");
            u.setPassword("password");
            u.setRoles(roles);
            userService.save(u);
        }

        if(roleRepository.findByName("ROLE_ADMIN") == null) {
            roleRepository.save(new Role("ROLE_ADMIN"));
        }
        if(roleRepository.findByName("ROLE_USER") == null) {
            roleRepository.save(new Role("ROLE_USER"));
        }

        mockMvc = MockMvcBuilders
          .webAppContextSetup(context)
          .apply(springSecurity())
          .build();
    }
    
    
	@Test
	void contextLoads() {
    }


	@Test
	public void shouldBeAbleToRegister() throws Exception {
		// .andDo(print())
        UserDto dto = new UserDto();
        dto.setUsername("username2");
        dto.setPassword("password2");
        mockMvc.perform(MockMvcRequestBuilders.post("/register")
            .content(asJsonString(dto))
            .contentType(MediaType.APPLICATION_JSON)
            .accept(MediaType.APPLICATION_JSON))
            .andDo(MockMvcResultHandlers.print())
            .andExpect(MockMvcResultMatchers.jsonPath("$.id").value(2))
            .andExpect(MockMvcResultMatchers.jsonPath("$.username").value("username2"))
            .andExpect(MockMvcResultMatchers.jsonPath("$.roleList[0]").value("ROLE_USER"));
	}

	@Test()
	public void shouldBeAbleToLogin() throws Exception {
		// .andDo(print())
        for (int i = 0; i < 20; i++) {
            System.out.println("a");
            
        }
        UserDto dto = new UserDto();
        dto.setUsername("username");
        dto.setPassword("password");
        mockMvc.perform(MockMvcRequestBuilders.post("/login")
            .content(asJsonString(dto))
            .contentType(MediaType.APPLICATION_JSON)
            .accept(MediaType.APPLICATION_JSON))
            .andDo(MockMvcResultHandlers.print())
            .andExpect(MockMvcResultMatchers.jsonPath("$.access_token").isString());
	}

    public static String asJsonString(final Object obj) {
        try {
            final ObjectMapper mapper = new ObjectMapper();
            final String jsonContent = mapper.writeValueAsString(obj);
            return jsonContent;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }  
}
