package com.gksvp.media_service.service;

import java.util.UUID;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import com.gksvp.media_service.entity.Media;

public interface BasicCurdInterface<T extends Media> {
    Page<T> getAll(Pageable pageable);

    T getByUUID(UUID uuid);

    T disable(UUID id);
}
