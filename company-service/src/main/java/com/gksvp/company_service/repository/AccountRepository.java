package com.gksvp.company_service.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.gksvp.company_service.entity.company.Account;

@Repository
public interface AccountRepository extends JpaRepository<Account, Long> {

    @Modifying
    @Query("UPDATE Account a SET a.isPrimary = CASE WHEN a.id = :accountId THEN true ELSE false END WHERE a.company.id = :companyId")
    void disableAllOtherPrimaryAccounts(Long companyId, Long accountId);

}
