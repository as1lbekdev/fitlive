package com.fitLive.fitlive.userPanel.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI fitLiveOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("FitLive API")
                        .version("1.0")
                        .description("FitLive web sayti uchun backend API: auth, hamkorlar, fitnes zallar"));
    }
}