package com.example.backend.service;

import java.util.List;
import org.springframework.stereotype.Service;
import com.example.backend.dto.RoomCartDTO;
import com.example.backend.repository.RoomRepository;
import com.example.backend.security.JwtService;

@Service
public class CardRoomService {
    private final RoomRepository RoomRepository;
    private final JwtService jwtService;

    public CardRoomService(RoomRepository roomRepository, JwtService jwtService) {
        this.RoomRepository = roomRepository;
        this.jwtService = jwtService;
    }

    public List<RoomCartDTO> CardRoom(
            String location,
            String price,
            String area) {
        Integer minPrice = null;
        Integer maxPrice = null;

        Integer minArea = null;
        Integer maxArea = null;

        // Location
        if (location != null && location.isBlank()) {
            location = null;
        }

        // Price
        if (price != null && !price.isBlank()) {

            if (price.startsWith("under-")) {

                maxPrice = Integer.parseInt(
                        price.replace("under-", "")) * 1_000_000;

            } else if (price.startsWith("over-")) {

                minPrice = Integer.parseInt(
                        price.replace("over-", "")) * 1_000_000;

            } else {

                String[] values = price.split("-");

                minPrice = Integer.parseInt(values[0]) * 1_000_000;
                maxPrice = Integer.parseInt(values[1]) * 1_000_000;
            }
        }

        // Area
        if (area != null && !area.isBlank()) {

            if (area.startsWith("under-")) {

                maxArea = Integer.parseInt(
                        area.replace("under-", ""));

            } else if (area.startsWith("over-")) {

                minArea = Integer.parseInt(
                        area.replace("over-", ""));

            } else {

                String[] values = area.split("-");

                minArea = Integer.parseInt(values[0]);
                maxArea = Integer.parseInt(values[1]);
            }
        }

        System.out.println("location = " + location);
        System.out.println("minPrice = " + minPrice);
        System.out.println("maxPrice = " + maxPrice);
        System.out.println("minArea = " + minArea);
        System.out.println("maxArea = " + maxArea);

        List<RoomCartDTO> rooms = RoomRepository.CardRooms(
                location,
                minPrice,
                maxPrice,
                minArea,
                maxArea);

        for (RoomCartDTO room : rooms) {
            String address = room.getLocation();

            if (address != null) {
                String[] parts = address.split(",");

                if (parts.length >= 2) {
                    String shortLocation = parts[parts.length - 2].trim()
                            + ", "
                            + parts[parts.length - 1].trim();

                    room.setLocation(shortLocation);
                }
            }
        }

        return rooms;
    }

    public List<RoomCartDTO> FeaturedRooms() {
        List<RoomCartDTO> rooms = RoomRepository.findFeaturedRooms();

        if (rooms.size() < 9 && !rooms.isEmpty()) {
            int length = rooms.size();
            for (int i = length; i < 9; i++) {
                rooms.add(rooms.get(i % length));
            }
        }
        return rooms;
    }

    public List<RoomCartDTO> getFavoriteRoom() {
        String ownerId = jwtService.getCurrentUserId();
        return RoomRepository.findFavoriteRooms(ownerId);
    }
}