package com.triply.api.service;

import com.triply.api.entity.Destination;
import java.util.List;
import java.util.Optional;

public interface DestinationService {
    Destination addDestination(Destination destination);
    List<Destination> getAllDestinations();
    Optional<Destination> getDestinationById(Long id);
    List<Destination> getByCategory(String category);
    List<Destination> searchByName(String name);
    Destination updateDestination(Long id, Destination destination);
    void deleteDestination(Long id);
}
