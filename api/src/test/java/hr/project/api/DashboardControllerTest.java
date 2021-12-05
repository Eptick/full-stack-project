package hr.project.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.test.web.servlet.MockMvc;


import hr.project.api.controllers.DashboardController;
import hr.project.api.models.Restaurant;
import hr.project.api.repositories.RestaurantRepository;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

@SpringBootTest
@AutoConfigureMockMvc
// @AutoConfigureTestDatabase
public class DashboardControllerTest {

	@Autowired
	private MockMvc mockMvc;

    @Autowired
    private DashboardController dashboardController;

    @Autowired
    private RestaurantRepository restaurantRepository;

	@Test
    public void whenDashboardControllerInjected_thenNotNull() throws Exception {
        assertThat(dashboardController).isNotNull();
    }

    @Test
    public void whenGetRequestToDashboardEndPoint_thenCorrectResponse() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/dashboard/restaurants").contentType(MediaType.APPLICATION_JSON))
        .andDo(MockMvcResultHandlers.print())
        .andExpect(MockMvcResultMatchers.status().isOk())
        .andExpect(MockMvcResultMatchers.jsonPath("$.first").value(true));
    }

    @Test
    public void whenPostRequestToDashboardEndPoint_thenCorrectResponse() throws Exception {
        Restaurant restaurant = new Restaurant();
        restaurant.setName("name");
        restaurantRepository.save(restaurant);
        mockMvc.perform(MockMvcRequestBuilders.get("/dashboard/restaurants").contentType(MediaType.APPLICATION_JSON))
        .andDo(MockMvcResultHandlers.print())
        .andExpect(MockMvcResultMatchers.status().isOk())
        .andExpect(MockMvcResultMatchers.jsonPath("$.content[0].id").value(1));
    }
}