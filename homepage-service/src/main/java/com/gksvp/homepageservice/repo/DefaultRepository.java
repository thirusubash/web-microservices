package com.gksvp.homepageservice.repo;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import com.gksvp.homepageservice.enitity.Homepage;

public interface DefaultRepository<T extends Homepage> extends JpaRepository<T, Long> {

    Page<Homepage> findByIsVisibleTrue(Pageable pageable);

    Page<Homepage> findByIsVisibleTrueAndImageUuidsIsNotEmpty(Pageable pageable);
}
