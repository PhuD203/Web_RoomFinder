package com.example.backend.controller;

import com.example.backend.dto.FavoriteRequestDTO;
import com.example.backend.service.FavoriteService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/favorites")
public class FavoriteController {

    private final FavoriteService favoriteService;

    public FavoriteController(FavoriteService favoriteService) {
        this.favoriteService = favoriteService;
    }

    @PostMapping("/isFavorites")
    public boolean checkFavorite(@RequestBody FavoriteRequestDTO request) {
        return favoriteService.checkFavorite(request.getRoomId());
    }

    @PostMapping("/addFavorites")
    public boolean addFavorite(@RequestBody FavoriteRequestDTO request) {
        return favoriteService.addFavorite(request.getRoomId());
    }

    @PostMapping("/deleteFavorites")
    public boolean deleteFavorite(@RequestBody FavoriteRequestDTO request) {
        return favoriteService.deleteFavorite(request.getRoomId());
    }

    @PostMapping("/listFavoriteRoom")
    public List<String> getListFavorite() {
        return favoriteService.getListFavorite();
    }

}