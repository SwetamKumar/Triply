package com.triply.api.controller;

import com.triply.api.entity.Booking;
import com.triply.api.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "http://localhost:5175") 
public class BookingController {

    @Autowired
    private BookingService bookingService;

    // ✅ Create Booking
    @PostMapping("/create")
    public ResponseEntity<String> createBooking(@RequestBody Booking booking) {
        bookingService.createBooking(booking);
        return ResponseEntity.ok("Booking created successfully!");
    }

    // ✅ Get All Bookings
    @GetMapping("/viewall")
    public List<Booking> getAllBookings() {
        return bookingService.getAllBookings();
    }

    // ✅ Get Booking by ID
    @GetMapping("/view/{id}")
    public ResponseEntity<Booking> getById(@PathVariable Long id) {
        return bookingService.getBookingById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // ✅ FIXED: Get bookings by EMAIL (this matches your DB & logs)
    @GetMapping("/email/{email}")
    public List<Booking> getByEmail(@PathVariable String email) {
        return bookingService.getBookingsByEmail(email);
    }

    // ✅ Update booking status manually
    @PutMapping("/status/{id}")
    public ResponseEntity<Booking> updateStatus(@PathVariable Long id,
                                                @RequestParam String status) {
        return ResponseEntity.ok(
                bookingService.updateBookingStatus(id, status)
        );
    }

    // ✅ Cancel booking (sets status = CANCELLED)
    @PutMapping("/cancel/{id}")
    public ResponseEntity<Booking> cancelBooking(@PathVariable Long id) {
        return ResponseEntity.ok(
                bookingService.cancelBooking(id)
        );
    }
}