package com.gksvp.company_service.entity.company;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.FetchType;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.AllArgsConstructor;
import com.gksvp.company_service.entity.AbstractAccount;
import com.gksvp.company_service.listener.AuditingEntityListener;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
@Getter
@Setter
public class Account extends AbstractAccount {

    private String accountNickName;

    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY)
    private Company company;

}