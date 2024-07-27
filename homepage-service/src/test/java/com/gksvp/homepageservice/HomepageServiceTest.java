
package com.gksvp.homepageservice;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.util.Arrays;
import java.util.Optional;
import java.util.UUID;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import com.gksvp.homepageservice.repo.DefaultRepository;
import com.gksvp.homepageservice.service.HomePageService;

import com.gksvp.homepageservice.enitity.Homepage;
import com.gksvp.homepageservice.exception.NotFoundException;

public class HomepageServiceTest {

    @Mock
    private DefaultRepository<Homepage> defaultRepository;

    @InjectMocks
    private HomePageService homepageService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testRemoveImageUuid() {
        Long homepageId = 1L;
        UUID uuidToRemove = UUID.randomUUID();
        Homepage homepage = new Homepage();
        homepage.setId(homepageId);
        homepage.setImageUuids(Arrays.asList(uuidToRemove, UUID.randomUUID()));

        when(defaultRepository.findById(homepageId)).thenReturn(Optional.of(homepage));

        homepageService.removeImageUuid(homepageId, uuidToRemove);

        assertEquals(1, homepage.getImageUuids().size());
        assertFalse(homepage.getImageUuids().contains(uuidToRemove));
        verify(defaultRepository, times(1)).save(homepage);
    }

    @Test
    public void testRemoveImageUuid_NotFound() {
        Long homepageId = 1L;
        UUID uuidToRemove = UUID.randomUUID();

        when(defaultRepository.findById(homepageId)).thenReturn(Optional.empty());

        Exception exception = assertThrows(NotFoundException.class, () -> {
            homepageService.removeImageUuid(homepageId, uuidToRemove);
        });

        String expectedMessage = "Homepage not found with id: " + homepageId;
        String actualMessage = exception.getMessage();

        assertTrue(actualMessage.contains(expectedMessage));
    }
}
