package com.triply.api.serviceimpl;

import com.triply.api.entity.Destination;
import com.triply.api.repository.DestinationRepository;
import com.triply.api.service.DestinationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class DestinationServiceImpl implements DestinationService {

    @Autowired
    private DestinationRepository destinationRepository;

    @Override
    public Destination addDestination(Destination destination) {
        return destinationRepository.save(destination);
    }

    @Override
    public List<Destination> getAllDestinations() {
        return destinationRepository.findAll();
    }

    @Override
    public Optional<Destination> getDestinationById(Long id) {
        return destinationRepository.findById(id);
    }

    @Override
    public List<Destination> getByCategory(String category) {
        return destinationRepository.findByCategory(category);
    }

    @Override
    public List<Destination> searchByName(String name) {
        return destinationRepository.findByNameContainingIgnoreCase(name);
    }

    @Override
    public Destination updateDestination(Long id, Destination updatedData) {
        return destinationRepository.findById(id).map(dest -> {
            dest.setName(updatedData.getName());
            dest.setLocation(updatedData.getLocation());
            dest.setDescription(updatedData.getDescription());
            dest.setImageUrl(updatedData.getImageUrl());
            dest.setCategory(updatedData.getCategory());
            dest.setRating(updatedData.getRating());
            dest.setBestTimeToVisit(updatedData.getBestTimeToVisit());
            return destinationRepository.save(dest);
        }).orElseThrow(() -> new RuntimeException("Destination not found with id: " + id));
    }

    @Override
    public void deleteDestination(Long id) {
        destinationRepository.deleteById(id);
    }
}
