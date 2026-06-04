package com.triply.api.controller;

import com.triply.api.entity.TourPackage;
import com.triply.api.service.TourPackageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/packages")
public class TourPackageController {

    @Autowired
    private TourPackageService tourPackageService;

    @PostMapping("/add")
    public ResponseEntity<String> addPackage(@RequestBody TourPackage tourPackage) {
        tourPackageService.addPackage(tourPackage);
        return ResponseEntity.ok("Package added successfully!");
    }

    @GetMapping("/viewall")
    public List<TourPackage> getAllPackages() {
        return tourPackageService.getAllPackages();
    }

    @GetMapping("/view/{id}")
    public ResponseEntity<TourPackage> getById(@PathVariable Long id) {
        return tourPackageService.getPackageById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/search")
    public List<TourPackage> searchByDestination(@RequestParam String destination) {
        return tourPackageService.searchByDestination(destination);
    }

    @GetMapping("/filter")
    public List<TourPackage> filterByPrice(@RequestParam Double maxPrice) {
        return tourPackageService.getByMaxPrice(maxPrice);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<TourPackage> update(@PathVariable Long id, @RequestBody TourPackage tourPackage) {
        return ResponseEntity.ok(tourPackageService.updatePackage(id, tourPackage));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        tourPackageService.deletePackage(id);
        return ResponseEntity.ok("Package deleted successfully!");
    }
}
