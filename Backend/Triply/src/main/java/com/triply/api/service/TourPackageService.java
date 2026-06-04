package com.triply.api.service;

import com.triply.api.entity.TourPackage;
import java.util.List;
import java.util.Optional;

public interface TourPackageService {
    TourPackage addPackage(TourPackage tourPackage);
    List<TourPackage> getAllPackages();
    Optional<TourPackage> getPackageById(Long id);
    List<TourPackage> searchByDestination(String destination);
    List<TourPackage> getByMaxPrice(Double maxPrice);
    TourPackage updatePackage(Long id, TourPackage tourPackage);
    void deletePackage(Long id);
}
