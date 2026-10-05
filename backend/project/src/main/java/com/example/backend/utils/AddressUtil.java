
package com.example.backend.utils;

public class AddressUtil {

    public static String getShortAddress(String address) {

        if (address == null || address.isBlank()) {
            return address;
        }

        String[] parts = address.split(",");

        if (parts.length < 2) {
            return address;
        }

        return parts[parts.length - 2].trim()
                + ", "
                + parts[parts.length - 1].trim();
    }
}