package com.gksvp.userservice.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.gksvp.userservice.entity.Address;

public interface AddressRepository extends JpaRepository<Address, Long> {

}
