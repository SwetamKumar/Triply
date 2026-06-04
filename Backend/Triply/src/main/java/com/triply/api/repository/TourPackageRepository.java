package com.triply.api.repository;

import com.triply.api.entity.TourPackage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface TourPackageRepository extends JpaRepository<TourPackage, Long> {
    List<TourPackage> findByDestinationContainingIgnoreCase(String destination);
    List<TourPackage> findByPriceLessThanEqual(Double maxPrice);
}
