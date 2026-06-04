package com.triply.api.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "destinations")
public class Destination {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String location;

    @Column(length = 1000)
    private String description;

    private String imageUrl;

    private String category;

    private Double rating;

    private String bestTimeToVisit;

    // ---- Constructors ----
    public Destination() {}

    public Destination(Long id, String name, String location, String description,
                       String imageUrl, String category, Double rating,
                       String bestTimeToVisit) {
        this.id = id;
        this.name = name;
        this.location = location;
        this.description = description;
        this.imageUrl = imageUrl;
        this.category = category;
        this.rating = rating;
        this.bestTimeToVisit = bestTimeToVisit;
    }

    // ---- Getters ----
    public Long getId()                 { return id; }
    public String getName()             { return name; }
    public String getLocation()         { return location; }
    public String getDescription()      { return description; }
    public String getImageUrl()         { return imageUrl; }
    public String getCategory()         { return category; }
    public Double getRating()           { return rating; }
    public String getBestTimeToVisit()  { return bestTimeToVisit; }

    // ---- Setters ----
    public void setId(Long id)                        { this.id = id; }
    public void setName(String name)                  { this.name = name; }
    public void setLocation(String location)          { this.location = location; }
    public void setDescription(String description)    { this.description = description; }
    public void setImageUrl(String imageUrl)          { this.imageUrl = imageUrl; }
    public void setCategory(String category)          { this.category = category; }
    public void setRating(Double rating)              { this.rating = rating; }
    public void setBestTimeToVisit(String b)          { this.bestTimeToVisit = b; }
}
