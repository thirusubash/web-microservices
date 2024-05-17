package com.gksvp.userservice.service.users;
public interface CheckUserInfo {
  
    boolean isEmailTaken(String email);
    boolean isUsernameTaken(String username);
    // boolean isAdhaartaekenTaken(String username);
    // boolean isPanTaken(String username) ;
    // boolean isMobileTaken(String mobile);
}
