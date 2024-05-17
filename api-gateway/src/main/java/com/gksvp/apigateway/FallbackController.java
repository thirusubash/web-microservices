package com.gksvp.apigateway;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/fallback")
public class FallbackController {

    @GetMapping
    public ResponseEntity<String> fallbackMessage(Exception ex) {
       
        if (ex instanceof io.netty.handler.codec.http.TooLongHttpHeaderException) {
            return new ResponseEntity<>("Request header exceeds allowed size limit (413 Requested Entity Too Large)", HttpStatus.PAYLOAD_TOO_LARGE);
        } else {
        
            return new ResponseEntity<>("Service unavailable. Please try again later (503 Service Unavailable)", HttpStatus.SERVICE_UNAVAILABLE);
        }
        
    }
}
