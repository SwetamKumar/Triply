package com.triply.api.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.LocalDate;

@Entity
@Table(name = "bookings")
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String customerName;

    @Column(nullable = false)
    private String customerEmail;

    private String customerPhone;

    private Long packageId;

    private String packageName;

    private LocalDate travelDate;

    private Integer numberOfTravelers;

    private Double totalAmount;

    private String status;

    private LocalDate bookingDate;

    // ---- Constructors ----
    public Booking() {}

    public Booking(Long id, String customerName, String customerEmail,
                   String customerPhone, Long packageId, String packageName,
                   LocalDate travelDate, Integer numberOfTravelers,
                   Double totalAmount, String status, LocalDate bookingDate) {
        this.id = id;
        this.customerName = customerName;
        this.customerEmail = customerEmail;
        this.customerPhone = customerPhone;
        this.packageId = packageId;
        this.packageName = packageName;
        this.travelDate = travelDate;
        this.numberOfTravelers = numberOfTravelers;
        this.totalAmount = totalAmount;
        this.status = status;
        this.bookingDate = bookingDate;
    }

    // ---- Getters ----
    public Long getId()                    { return id; }
    public String getCustomerName()        { return customerName; }
    public String getCustomerEmail()       { return customerEmail; }
    public String getCustomerPhone()       { return customerPhone; }
    public Long getPackageId()             { return packageId; }
    public String getPackageName()         { return packageName; }
    public LocalDate getTravelDate()       { return travelDate; }
    public Integer getNumberOfTravelers()  { return numberOfTravelers; }
    public Double getTotalAmount()         { return totalAmount; }
    public String getStatus()              { return status; }
    public LocalDate getBookingDate()      { return bookingDate; }

    // ---- Setters ----
    public void setId(Long id)                          { this.id = id; }
    public void setCustomerName(String customerName)    { this.customerName = customerName; }
    public void setCustomerEmail(String customerEmail)  { this.customerEmail = customerEmail; }
    public void setCustomerPhone(String customerPhone)  { this.customerPhone = customerPhone; }
    public void setPackageId(Long packageId)            { this.packageId = packageId; }
    public void setPackageName(String packageName)      { this.packageName = packageName; }
    public void setTravelDate(LocalDate travelDate)     { this.travelDate = travelDate; }
    public void setNumberOfTravelers(Integer n)         { this.numberOfTravelers = n; }
    public void setTotalAmount(Double totalAmount)      { this.totalAmount = totalAmount; }
    public void setStatus(String status)                { this.status = status; }
    public void setBookingDate(LocalDate bookingDate)   { this.bookingDate = bookingDate; }
}
