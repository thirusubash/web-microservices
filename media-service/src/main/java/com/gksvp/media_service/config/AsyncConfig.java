package com.gksvp.media_service.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableAsync;

@Configuration
@EnableAsync
public class AsyncConfig {
    // You can optionally define custom Executor bean here
    // if you want to customize async execution behavior.
}
