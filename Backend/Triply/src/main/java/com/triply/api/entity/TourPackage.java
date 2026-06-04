package com.triply.api.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "tour_packages")
public class TourPackage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String packageName;

    @Column(length = 1000)
    private String description;

    private String destination;

    private Integer durationDays;

    private Double price;

    private String imageUrl;

    private String inclusions;

    private Integer maxGroupSize;

    private String difficulty;

    // ---- Constructors ----
    public TourPackage() {}

    public TourPackage(Long id, String packageName, String description,
                       String destination, Integer durationDays, Double price,
                       String imageUrl, String inclusions,
                       Integer maxGroupSize, String difficulty) {
        this.id = id;
        this.packageName = packageName;
        this.description = description;
        this.destination = destination;
        this.durationDays = durationDays;
        this.price = price;
        this.imageUrl = imageUrl;
        this.inclusions = inclusions;
        this.maxGroupSize = maxGroupSize;
        this.difficulty = difficulty;
    }

    // ---- Getters ----
    public Long getId()            { return id; }
    public String getPackageName() { return packageName; }
    public String getDescription() { return description; }
    public String getDestination() { return destination; }
    public Integer getDurationDays(){ return durationDays; }
    public Double getPrice()       { return price; }
    public String getImageUrl()    { return imageUrl; }
    public String getInclusions()  { return inclusions; }
    public Integer getMaxGroupSize(){ return maxGroupSize; }
    public String getDifficulty()  { return difficulty; }

    // ---- Setters ----
    public void setId(Long id)                   { this.id = id; }
    public void setPackageName(String packageName){ this.packageName = packageName; }
    public void setDescription(String description){ this.description = description; }
    public void setDestination(String destination){ this.destination = destination; }
    public void setDurationDays(Integer durationDays){ this.durationDays = durationDays; }
    public void setPrice(Double price)           { this.price = price; }
    public void setImageUrl(String imageUrl)     { this.imageUrl = imageUrl; }
    public void setInclusions(String inclusions) { this.inclusions = inclusions; }
    public void setMaxGroupSize(Integer maxGroupSize){ this.maxGroupSize = maxGroupSize; }
    public void setDifficulty(String difficulty) { this.difficulty = difficulty; }
}
