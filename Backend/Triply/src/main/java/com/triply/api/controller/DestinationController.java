package com.triply.api.controller;

import com.triply.api.entity.Destination;
import com.triply.api.service.DestinationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/destinations")
public class DestinationController {

    @Autowired
    private DestinationService destinationService;

    @PostMapping("/add")
    public ResponseEntity<String> addDestination(@RequestBody Destination destination) {
        destinationService.addDestination(destination);
        return ResponseEntity.ok("Destination added successfully!");
    }

    @GetMapping("/viewall")
    public List<Destination> getAllDestinations() {
        return destinationService.getAllDestinations();
    }

    @GetMapping("/view/{id}")
    public ResponseEntity<Destination> getById(@PathVariable Long id) {
        return destinationService.getDestinationById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/category/{category}")
    public List<Destination> getByCategory(@PathVariable String category) {
        return destinationService.getByCategory(category);
    }

    @GetMapping("/search")
    public List<Destination> search(@RequestParam String name) {
        return destinationService.searchByName(name);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Destination> update(@PathVariable Long id, @RequestBody Destination destination) {
        return ResponseEntity.ok(destinationService.updateDestination(id, destination));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        destinationService.deleteDestination(id);
        return ResponseEntity.ok("Destination deleted successfully!");
    }
}
