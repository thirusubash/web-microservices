package com.gksvp.homepageservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class HomepageServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(HomepageServiceApplication.class, args);
	}

}
