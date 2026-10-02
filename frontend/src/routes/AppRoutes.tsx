import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import MainLayout from "../components/layout/MainLayout";
const HomePage = lazy(() => import("../Page/HomePage/HomePage"));
const SearchPage = lazy(() => import("../Page/SearchPage/SearchPage"));
const RoomPage = lazy(() => import("../Page/RoomPage/RoomPage"));
const LoginPage = lazy(() => import("../Page/LoginPage/LoginPage"));
const Register = lazy(() => import("../Page/LoginPage/Register"));
const CreateCardRoom = lazy(
  () => import("../Page/CreateCardRoom/CreateCardRoom"),
);
const PageUser = lazy(() => import("../Page/Profile/PageProfile"));
const Admin = lazy(() => import("../Page/Admin/Admin"));
const FavoritrRoom = lazy(() => import("../Page/FavoriteRoom/FavoriteRoom"));
const PostedRoomsPage = lazy(
  () => import("../Page/PostedRoomsPage/PostedRoomsPage"),
);

export default function AppRoutes() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/rooms/:id" element={<RoomPage />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/create-room" element={<CreateCardRoom />} />
            <Route path="/edits" element={<CreateCardRoom />} />
          </Route>
          <Route path="/profile" element={<PageUser />} />
          <Route path="/favorites" element={<FavoritrRoom />} />
          <Route path="/mypostroom" element={<PostedRoomsPage />} />
          <Route path="/admin" element={<Admin />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
