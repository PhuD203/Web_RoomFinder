package com.example.backend.utils;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public final class DateTimeUtil {

    private DateTimeUtil() {
    }

    public static String formatDate(Object value) {

        if (value == null) {
            return "";
        }

        LocalDateTime dateTime;

        if (value instanceof Timestamp) {
            dateTime = ((Timestamp) value).toLocalDateTime();
        } else {
            dateTime = (LocalDateTime) value;
        }

        return dateTime.format(
                DateTimeFormatter.ofPattern("dd/MM/yyyy"));
    }
}