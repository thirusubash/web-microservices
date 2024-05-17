package com.gksvp.userservice.repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gksvp.userservice.dto.kyc.UserKYCInfoDTO;
import com.gksvp.userservice.entity.UserKYCInfo;

public interface UserKYCInfoRepository extends JpaRepository<UserKYCInfo, Long> {

    List<UserKYCInfoDTO> findByUserId(Long userId);

}
