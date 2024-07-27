package com.gksvp.userservice.service.userGroupRoles;

import java.util.List;
import com.gksvp.userservice.exception.NoContentFoundException;
import com.gksvp.userservice.exception.NotFoundException;

public interface UserGroupBaseService <T, R> {

    public abstract List<R> getAll();

    public abstract R getById(Long id) throws NoContentFoundException; 

    public abstract R create(T request);

    public abstract R update(Long id, T updatedRequest);

    public abstract void delete(Long id) throws NoContentFoundException;

    public abstract List<R> listAllUsers(Long id) throws NotFoundException;

    public abstract List<R> removeListofUsers(Long id, List<Long> userIdList) throws NotFoundException;
}
