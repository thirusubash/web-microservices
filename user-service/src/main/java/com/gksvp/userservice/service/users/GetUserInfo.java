package com.gksvp.userservice.service.users;
import com.gksvp.userservice.entity.User;


public interface GetUserInfo {
   /**
 * @param mobileNo
 * @return
 * @throws Exception
 */


   User getUserByEmail(String email);
   User getUserById(Long id);
   User getUserByUsername(String username);
    // User getUserByMobileNo(String mobileNo) ;
   //  User getUserByPAN(String PAN) ;

   //  User getUserByAdhaar(String AadhaarNo) ;
}
