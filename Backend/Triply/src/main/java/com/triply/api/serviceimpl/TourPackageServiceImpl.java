package com.triply.api.serviceimpl;

import com.triply.api.entity.TourPackage;
import com.triply.api.repository.TourPackageRepository;
import com.triply.api.service.TourPackageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class TourPackageServiceImpl implements TourPackageService {

    @Autowired
    private TourPackageRepository tourPackageRepository;

    @Override
    public TourPackage addPackage(TourPackage tourPackage) {
        return tourPackageRepository.save(tourPackage);
    }

    @Override
    public List<TourPackage> getAllPackages() {
        return tourPackageRepository.findAll();
    }

    @Override
    public Optional<TourPackage> getPackageById(Long id) {
        return tourPackageRepository.findById(id);
    }

    @Override
    public List<TourPackage> searchByDestination(String destination) {
        return tourPackageRepository.findByDestinationContainingIgnoreCase(destination);
    }

    @Override
    public List<TourPackage> getByMaxPrice(Double maxPrice) {
        return tourPackageRepository.findByPriceLessThanEqual(maxPrice);
    }

    @Override
    public TourPackage updatePackage(Long id, TourPackage updatedData) {
        return tourPackageRepository.findById(id).map(pkg -> {
            pkg.setPackageName(updatedData.getPackageName());
            pkg.setDescription(updatedData.getDescription());
            pkg.setDestination(updatedData.getDescription());
            pkg.setDurationDays(updatedData.getDurationDays());
            pkg.setPrice(updatedData.getPrice());
            pkg.setImageUrl(updatedData.getImageUrl());
            pkg.setInclusions(updatedData.getInclusions());
            pkg.setMaxGroupSize(updatedData.getMaxGroupSize());
            pkg.setDifficulty(updatedData.getDifficulty());
            return tourPackageRepository.save(pkg);
        }).orElseThrow(() -> new RuntimeException("Package not found with id: " + id));
    }

    @Override
    public void deletePackage(Long id) {
        tourPackageRepository.deleteById(id);
    }
}
