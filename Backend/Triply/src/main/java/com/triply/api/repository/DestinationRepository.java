package com.triply.api.repository;

import com.triply.api.entity.Destination;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface DestinationRepository extends JpaRepository<Destination, Long> {
    List<Destination> findByCategory(String category);
    List<Destination> findByNameContainingIgnoreCase(String name);
}
