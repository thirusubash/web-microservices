package com.gksvp.userservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gksvp.userservice.entity.GeoLocation;

public interface GeoLocationRepository extends JpaRepository<GeoLocation, Long> {

}
