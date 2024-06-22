package com.gksvp.media_service.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.gksvp.media_service.entity.Media;

@Repository
public interface BasicRepository<T extends Media> extends JpaRepository<T, UUID> {

}