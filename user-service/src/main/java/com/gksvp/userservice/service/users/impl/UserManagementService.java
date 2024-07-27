package com.gksvp.userservice.service.users.impl;

import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import com.gksvp.userservice.dto.address.AddressCreateRequest;
import com.gksvp.userservice.dto.phone.PhoneNumberDTO;
import com.gksvp.userservice.entity.Address;
import com.gksvp.userservice.entity.PhoneNumber;
import com.gksvp.userservice.entity.User;
import com.gksvp.userservice.exception.NoContentFoundException;
import com.gksvp.userservice.exception.UnauthorizedOperationException;
import com.gksvp.userservice.exception.NotFoundException;
import com.gksvp.userservice.repository.AddressRepository;
import com.gksvp.userservice.repository.GroupRepository;
import com.gksvp.userservice.repository.PhoneNumberRepository;
import com.gksvp.userservice.repository.RoleRepository;
import com.gksvp.userservice.repository.UserRepository;
import com.gksvp.userservice.service.users.UserAddressManagementService;
import com.gksvp.userservice.service.users.UserPhoneNoManagementService;

public class UserManagementService implements UserPhoneNoManagementService , UserAddressManagementService    {

  private final ModelMapper modelMapper;
  private final UserRepository userRepository;
  private final PhoneNumberRepository phoneNumberRepository;
  private final AddressRepository addressRepository;
  private PasswordEncoder passwordEncoder;
  private GroupRepository groupRepository;
  private RoleRepository roleRepository;

    public UserManagementService(ModelMapper modelMapper, PasswordEncoder passwordEncoder,
            UserRepository userRepository, RoleRepository roleRepository, GroupRepository groupRepository,
            PhoneNumberRepository phoneNumberRepository,AddressRepository addressRepository) {
        this.modelMapper = modelMapper;
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.groupRepository = groupRepository;
        this.phoneNumberRepository = phoneNumberRepository;
        this.addressRepository = addressRepository;
    }

 
   
@Override
public String  addPhoneNumber(Long user_id, PhoneNumberDTO phoneNumbersDTO) throws Exception {
    User user = userRepository.findById(user_id)
            .orElseThrow(() -> new NoContentFoundException("User not found  : "+ user_id));
    PhoneNumber phoneNumber = new PhoneNumber();
    phoneNumber.setUser(user);
    phoneNumber.setNumber(phoneNumbersDTO.getNumber());
    PhoneNumber saved=phoneNumberRepository.save(phoneNumber);
    return saved.getCountryCode()+" : "+ saved.getNumber() +"added to "+user_id;
}



    @Override
    public String  updatePhoneNumber(Long phoneNumberid, PhoneNumberDTO phoneNumbersDTO) throws Exception {
        PhoneNumber phonenNumber=phoneNumberRepository.findById(phoneNumberid).orElseThrow(() -> new NullPointerException(phoneNumberid +"is not found !"));
        phonenNumber.setCountryCode(phoneNumbersDTO.getCountryCode());
        phonenNumber.setNumber(phoneNumbersDTO.getNumber());
        phonenNumber.setCountryName(phoneNumbersDTO.getCountryName());
        phonenNumber.setPrimary(phoneNumbersDTO.isPrimary());
        PhoneNumber savednumber=phoneNumberRepository.save(phonenNumber);
       return phoneNumbersDTO.getNumber() + "Updated to "+savednumber.getNumber() + savednumber.getCountryCode();
    }

    @Override
    public String removePhoneNumber(Long id) {
        if(!phoneNumberRepository.existsById(id)){
              throw new NotFoundException(" Phone Number not found ");
        }
        phoneNumberRepository.deleteById(id);
        return "delted " +id;
    }



    @Override
    public String  addAddress(Long userId, AddressCreateRequest newAddress) {
      Address address=modelMapper.map(newAddress, Address.class);
      address.setUser(userRepository.findById(userId).orElse(null));
      Address savedAddress=addressRepository.save(address);

      return "Address Saved "+savedAddress.getId();
    }
    



    @Override
    public String removeAddress(Long userId, Long addressId) {
    
      return addressRepository.findById(addressId)
          .map(address -> {
            if (!address.getUser().getId().equals(userId)) {
              throw new UnauthorizedOperationException("You can only remove your own addresses");
            }
            addressRepository.delete(address);
            return "Address removed successfully"; 
          })
          .orElseThrow(() -> new NotFoundException("Address with ID " + addressId + " not found"));
    }
    

  
}
