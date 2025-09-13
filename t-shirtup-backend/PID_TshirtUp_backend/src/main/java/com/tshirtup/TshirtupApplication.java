package com.tshirtup;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.boot.autoconfigure.domain.EntityScan;

@SpringBootApplication
@EnableJpaRepositories(basePackages = "com.tshirtup.repository")
@EntityScan(basePackages = "com.tshirtup.model")
public class TshirtupApplication {

    public static void main(String[] args) {
        SpringApplication.run(TshirtupApplication.class, args);
    }
}
