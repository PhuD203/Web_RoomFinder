package com.example.backend.service;

import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import com.example.backend.dto.CoordinatesDTO;
import com.example.backend.dto.CreateRoomDTO;
import com.example.backend.dto.OwnerDTO;
import com.example.backend.dto.RoomDetailDTO;
import com.example.backend.dto.RoomInfoDTO;
import com.example.backend.dto.RoomTitleDTO;
import com.example.backend.dto.UpdateRoomDTO;
import com.example.backend.entity.Amenity;
import com.example.backend.entity.Coordinate;
import com.example.backend.entity.Room;
import com.example.backend.entity.RoomImage;
import com.example.backend.entity.User;
import com.example.backend.repository.AmenityRepository;
import com.example.backend.repository.CoordinateRepository;
import com.example.backend.repository.RoomImageRepository;
import com.example.backend.repository.RoomRepository;
import com.example.backend.repository.UserRepository;
import com.example.backend.security.JwtService;
import jakarta.transaction.Transactional;
import java.nio.file.Path;
import java.util.UUID;

@Service
public class RoomService {
        private final RoomRepository roomRepository;
        private final RoomImageRepository roomImageRepository;
        private final AmenityRepository amenityRepository;
        private final UserRepository userRepository;
        private final CoordinateRepository coordinatesRepository;
        private final JwtService jwtService;
        private final FileStorageService fileStorageService;

        public RoomService(
                        RoomRepository roomRepository,
                        RoomImageRepository roomImageRepository,
                        AmenityRepository amenityRepository,
                        UserRepository userRepository,
                        CoordinateRepository coordinatesRepository,
                        JwtService jwtService,
                        FileStorageService fileStorageService) {
                this.roomRepository = roomRepository;
                this.roomImageRepository = roomImageRepository;
                this.amenityRepository = amenityRepository;
                this.userRepository = userRepository;
                this.coordinatesRepository = coordinatesRepository;
                this.jwtService = jwtService;
                this.fileStorageService = fileStorageService;
        }

        public RoomDetailDTO getRoomDetail(String roomId) {
                RoomTitleDTO room = roomRepository.titleRoomID(roomId);
                RoomInfoDTO roomInfo = roomRepository.InfoRoomID(roomId);
                String coordinatesId = roomRepository.getCoordinatesId(roomId);
                String ownerId = roomRepository.getOwnerId(roomId);
                OwnerDTO owner = userRepository.getUser(ownerId);
                CoordinatesDTO coordinates = coordinatesRepository.getCoordinatesById(coordinatesId);
                List<String> amenities = amenityRepository.getAmenitiesByRoomId(roomId);
                List<String> picture = roomImageRepository.getPicturesByRoomId(roomId);
                String location = null;
                String address = room.getAddress();
                if (address != null) {
                        String[] parts = address.split(",");
                        if (parts.length >= 2) {
                                String shortLocation = parts[parts.length - 2].trim()
                                                + ", "
                                                + parts[parts.length - 1].trim();
                                location = shortLocation;
                        }
                }
                return new RoomDetailDTO(
                                room.getId(),
                                room.getTitle(),
                                room.getPrice(),
                                room.getArea(),
                                location,
                                room.getAddress(),
                                room.getDescription(),
                                picture,
                                amenities,
                                owner,
                                roomInfo,
                                coordinates);
        }

        public String createRommDetail(CreateRoomDTO dto) {
                try {

                        String ownerId = jwtService.getCurrentUserId();

                        User owner = userRepository.findById(ownerId)
                                        .orElseThrow(() -> new RuntimeException("Không tìm thấy người dùng"));

                        if (dto.getCoordinates() == null) {
                                throw new RuntimeException("Thiếu tọa độ");
                        }

                        Coordinate coordinate = new Coordinate();

                        coordinate.setLatitude(
                                        dto.getCoordinates().getLatitude());

                        coordinate.setLongitude(
                                        dto.getCoordinates().getLongitude());

                        Coordinate savedCoordinate = coordinatesRepository.save(coordinate);

                        if (dto.getRoomInfo() == null) {
                                throw new RuntimeException("Thiếu thông tin phòng");
                        }

                        Room room = new Room();

                        room.setTitle(dto.getTitle());
                        room.setPrice(dto.getPrice());
                        room.setArea(dto.getArea());
                        room.setAddress(dto.getAddress());
                        room.setDescription(dto.getDescription());

                        room.setType(
                                        dto.getRoomInfo().getType());

                        room.setPeople(
                                        dto.getRoomInfo().getPeople());

                        room.setFurniture(
                                        dto.getRoomInfo().getFurniture());

                        room.setElectricity(
                                        dto.getRoomInfo().getElectricity());

                        room.setWater(
                                        dto.getRoomInfo().getWater());

                        room.setOther(
                                        dto.getRoomInfo().getOther());

                        room.setStatus("Chờ duyệt");

                        room.setOwner(owner);

                        room.setCoordinates(savedCoordinate);

                        Room savedRoom = roomRepository.save(room);

                        if (dto.getAmenities() != null) {

                                for (String amenityName : dto.getAmenities()) {

                                        if (amenityName == null ||
                                                        amenityName.trim().isEmpty()) {
                                                continue;
                                        }

                                        Amenity amenity = new Amenity();

                                        amenity.setName(amenityName);

                                        amenity.setRoom(savedRoom);

                                        amenityRepository.save(amenity);
                                }
                        }

                        if (dto.getImages() != null &&
                                        !dto.getImages().isEmpty()) {

                                int index = 1;

                                for (MultipartFile image : dto.getImages()) {

                                        if (image == null ||
                                                        image.isEmpty()) {
                                                continue;
                                        }

                                        String UrlName = savedRoom.getId().toString() + "_" + index + "__";
                                        // Lưu file thật vào server
                                        String imagePath = fileStorageService.saveFile(
                                                        image,
                                                        "Room",
                                                        null,
                                                        UrlName);

                                        // Lưu đường dẫn vào DB
                                        RoomImage roomImage = new RoomImage();

                                        roomImage.setImageUrl(imagePath);

                                        roomImage.setImageIndex(index);

                                        roomImage.setRoom(savedRoom);

                                        roomImageRepository.save(roomImage);

                                        index++;
                                }
                        }

                        return "Đã đăng bài thành công";

                } catch (Exception e) {

                        e.printStackTrace();

                        throw new RuntimeException(
                                        "Không thể đăng bài: " + e.getMessage(),
                                        e);
                }
        }

        @Transactional
        public String UpdateRoomDetail(UpdateRoomDTO dto) {
                try {
                        // 1. LẤY USER HIỆN TẠI
                        String ownerId = jwtService.getCurrentUserId();

                        userRepository.findById(ownerId)
                                        .orElseThrow(() -> new RuntimeException("Không tìm thấy người dùng"));
                        // User owner = userRepository.findById(ownerId)
                        // .orElseThrow(() ->
                        // new RuntimeException("Không tìm thấy người dùng")
                        // );
                        // 2. KIỂM TRA ROOM ID
                        if (dto.getRoomId() == null ||
                                        dto.getRoomId().trim().isEmpty()) {

                                throw new RuntimeException("Thiếu roomId");
                        }

                        Room room = roomRepository.findById(dto.getRoomId())
                                        .orElseThrow(() -> new RuntimeException("Không tìm thấy phòng"));
                        // 3. KIỂM TRA QUYỀN
                        if (!room.getOwner().getId().equals(ownerId)) {

                                throw new RuntimeException(
                                                "Bạn không có quyền cập nhật phòng này");
                        }
                        // 4. CẬP NHẬT THÔNG TIN CƠ BẢN
                        room.setTitle(dto.getTitle());
                        room.setPrice(dto.getPrice());
                        room.setArea(dto.getArea());
                        room.setDescription(dto.getDescription());
                        room.setAddress(dto.getAddress());
                        // 5. CẬP NHẬT ROOM INFO
                        if (dto.getRoomInfo() == null) {

                                throw new RuntimeException(
                                                "Thiếu thông tin phòng");
                        }

                        room.setType(
                                        dto.getRoomInfo().getType());

                        room.setPeople(
                                        dto.getRoomInfo().getPeople());

                        room.setFurniture(
                                        dto.getRoomInfo().getFurniture());

                        room.setElectricity(
                                        dto.getRoomInfo().getElectricity());

                        room.setWater(
                                        dto.getRoomInfo().getWater());

                        room.setOther(
                                        dto.getRoomInfo().getOther());
                        // 6. ĐỔI STATUS
                        room.setStatus("pending");
                        // 7. CẬP NHẬT COORDINATES
                        if (dto.getCoordinates() == null) {

                                throw new RuntimeException(
                                                "Thiếu tọa độ");
                        }

                        Coordinate coordinate = room.getCoordinates();

                        if (coordinate == null) {

                                coordinate = new Coordinate();
                        }

                        coordinate.setLatitude(
                                        dto.getCoordinates().getLatitude());

                        coordinate.setLongitude(
                                        dto.getCoordinates().getLongitude());

                        Coordinate savedCoordinate = coordinatesRepository.save(coordinate);

                        room.setCoordinates(savedCoordinate);

                        // =====================================
                        // 8. LƯU ROOM
                        // =====================================

                        Room savedRoom = roomRepository.save(room);

                        // =====================================
                        // 9. CẬP NHẬT AMENITIES
                        // =====================================

                        amenityRepository.deleteByRoom_Id(
                                        savedRoom.getId());

                        if (dto.getAmenities() != null) {

                                for (String amenityName : dto.getAmenities()) {

                                        if (amenityName == null ||
                                                        amenityName.trim().isEmpty()) {

                                                continue;
                                        }

                                        Amenity amenity = new Amenity();

                                        amenity.setName(
                                                        amenityName.trim());

                                        amenity.setRoom(
                                                        savedRoom);

                                        amenityRepository.save(
                                                        amenity);
                                }
                        }

                        // =====================================
                        // 10. XÓA ẢNH
                        // =====================================

                        if (dto.getDeletedIndexes() != null &&
                                        !dto.getDeletedIndexes().isEmpty()) {

                                List<RoomImage> deletedImages = roomImageRepository
                                                .findByRoom_IdAndImageIndexIn(
                                                                savedRoom.getId(),
                                                                dto.getDeletedIndexes());

                                // ---------------------------------
                                // XÓA FILE VẬT LÝ
                                // ---------------------------------

                                for (RoomImage image : deletedImages) {

                                        String imageUrl = image.getImageUrl();

                                        if (imageUrl == null ||
                                                        imageUrl.trim().isEmpty()) {

                                                continue;
                                        }

                                        String relativePath = imageUrl.replaceFirst("^/+", "");

                                        Path imagePath = Paths.get("backend", "project")
                                                        .resolve(relativePath)
                                                        .toAbsolutePath();

                                        Files.deleteIfExists(imagePath);
                                }

                                // ---------------------------------
                                // XÓA DATABASE
                                // ---------------------------------

                                roomImageRepository.deleteAll(
                                                deletedImages);

                                // =================================
                                // 11. LẤY ẢNH CÒN LẠI
                                // =================================

                                List<RoomImage> remainingImages = roomImageRepository
                                                .findByRoom_IdOrderByImageIndexAsc(
                                                                savedRoom.getId());
                                // =================================
                                // 12. ĐỔI TẤT CẢ FILE SANG TÊN TẠM
                                // =================================
                                for (RoomImage image : remainingImages) {

                                        String oldUrl = image.getImageUrl();

                                        if (oldUrl == null || oldUrl.trim().isEmpty()) {
                                                continue;
                                        }

                                        // URL trong DB: /images/Room/xxx.png
                                        String relativePath = oldUrl.replaceFirst("^/+", "");

                                        // File thật: backend/project/images/Room/xxx.png
                                        Path oldPath = Paths.get("backend", "project")
                                                        .resolve(relativePath)
                                                        .toAbsolutePath();

                                        if (!Files.exists(oldPath)) {
                                                throw new RuntimeException(
                                                                "Không tìm thấy file ảnh: " + oldPath);
                                        }

                                        String oldFileName = oldPath.getFileName().toString();

                                        String extension = "";
                                        int dotIndex = oldFileName.lastIndexOf(".");

                                        if (dotIndex >= 0) {
                                                extension = oldFileName.substring(dotIndex);
                                        }

                                        // Tên tạm
                                        String tempFileName = savedRoom.getId()
                                                        + "_TEMP_"
                                                        + UUID.randomUUID()
                                                        + extension;

                                        Path tempPath = oldPath.resolveSibling(tempFileName);

                                        Files.move(oldPath, tempPath);

                                        // DB vẫn lưu URL, KHÔNG lưu physical path
                                        image.setImageUrl(
                                                        "/images/Room/" + tempFileName);
                                }

                                // =================================
                                // 13. ĐÁNH LẠI INDEX
                                // =================================
                                for (int i = 1; i <= remainingImages.size(); i++) {

                                        RoomImage image = remainingImages.get(i - 1);

                                        String tempUrl = image.getImageUrl();

                                        // /images/Room/xxx_TEMP_xxx.png
                                        String relativePath = tempUrl.replaceFirst("^/+", "");

                                        // File thật
                                        Path tempPath = Paths.get("backend", "project")
                                                        .resolve(relativePath)
                                                        .toAbsolutePath();

                                        String tempFileName = tempPath.getFileName().toString();

                                        String extension = "";
                                        int dotIndex = tempFileName.lastIndexOf(".");

                                        if (dotIndex >= 0) {
                                                extension = tempFileName.substring(dotIndex);
                                        }

                                        String newFileName = savedRoom.getId()
                                                        + "_"
                                                        + i
                                                        + "_Room"
                                                        + extension;

                                        Path newPath = tempPath.resolveSibling(newFileName);

                                        Files.move(tempPath, newPath);

                                        image.setImageIndex(i);

                                        // DB lưu URL
                                        image.setImageUrl(
                                                        "/images/Room/" + newFileName);
                                }

                                // Lưu DB
                                roomImageRepository.saveAll(remainingImages);

                        }

                        // =====================================
                        // 14. THÊM ẢNH MỚI
                        // =====================================

                        if (dto.getImages() != null &&
                                        !dto.getImages().isEmpty()) {

                                // Query DB 1 lần
                                List<RoomImage> currentImages = roomImageRepository
                                                .findByRoom_IdOrderByImageIndexAsc(
                                                                savedRoom.getId());

                                int nextIndex = currentImages.size() + 1;

                                for (MultipartFile image : dto.getImages()) {

                                        if (image == null ||
                                                        image.isEmpty()) {

                                                continue;
                                        }

                                        int index = nextIndex++;

                                        // =================================
                                        // TÊN FILE
                                        // =================================

                                        String urlName = savedRoom.getId().toString()
                                                        + "_"
                                                        + index
                                                        + "__";

                                        // =================================
                                        // LƯU FILE
                                        // =================================

                                        String imagePath = fileStorageService.saveFile(
                                                        image,
                                                        "Room",
                                                        null,
                                                        urlName);

                                        // =================================
                                        // LƯU DATABASE
                                        // =================================

                                        RoomImage roomImage = new RoomImage();

                                        roomImage.setImageUrl(
                                                        imagePath);

                                        roomImage.setImageIndex(
                                                        index);

                                        roomImage.setRoom(
                                                        savedRoom);

                                        roomImageRepository.save(
                                                        roomImage);
                                }
                        }

                        // =====================================
                        // 15. HOÀN TẤT
                        // =====================================

                        return "Cập nhật bài đăng thành công";

                } catch (Exception e) {

                        throw new RuntimeException(
                                        "Không thể cập nhật bài đăng: "
                                                        + e.getMessage(),
                                        e);
                }
        }

        public String changeStatus(String roomId, String status) {
                try {
                        if (status == null
                                        || (!status.equals("pending")
                                                        && !status.equals("approved")
                                                        && !status.equals("rejected"))) {
                                throw new IllegalArgumentException("Status không hợp lệ");
                        }

                        Room room = roomRepository.findById(roomId)
                                        .orElseThrow(() -> new RuntimeException("Không tìm thấy phòng"));

                        room.setStatus(status);
                        roomRepository.save(room);

                        return "Đổi trạng thái thành công";

                } catch (Exception e) {
                        throw new RuntimeException("Đổi trạng thái thất bại: " + e.getMessage(), e);
                }
        }
}
