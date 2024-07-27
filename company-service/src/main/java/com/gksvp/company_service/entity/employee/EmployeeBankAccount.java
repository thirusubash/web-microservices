package com.gksvp.company_service.entity.employee;

import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.FetchType;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;
import com.gksvp.company_service.entity.AbstractAccount;
import com.gksvp.company_service.listener.AuditingEntityListener;

@Entity
@Getter
@Setter
@EntityListeners(AuditingEntityListener.class)
public class EmployeeBankAccount extends AbstractAccount {

    @ManyToOne(fetch = FetchType.LAZY)
    private Employee employee;
}
