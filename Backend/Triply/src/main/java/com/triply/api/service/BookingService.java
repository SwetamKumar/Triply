package com.triply.api.service;

import com.triply.api.entity.Booking;
import java.util.List;
import java.util.Optional;

public interface BookingService {
    Booking createBooking(Booking booking);
    List<Booking> getAllBookings();
    Optional<Booking> getBookingById(Long id);
    List<Booking> getBookingsByEmail(String email);
    Booking updateBookingStatus(Long id, String status);
    Booking cancelBooking(Long id);
}
