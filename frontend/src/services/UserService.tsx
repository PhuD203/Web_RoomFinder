import api from "./api";

export const getUserProfile = async () => {
  const response = await api.get("/userprofile");
  return response.data;
};

export const getAvatar = async () => {
  const response = await api.get("/userprofile/avatar");
  return response.data;
};

export const updateUserProfile = async (
  data: {
    name?: string;
    phone?: string;
  },
  avatarFile?: File | null,
) => {
  const formData = new FormData();

  if (data.name !== undefined) {
    formData.append("name", data.name);
  }

  if (data.phone !== undefined) {
    formData.append("phone", data.phone);
  }

  if (avatarFile) {
    formData.append("avatar", avatarFile);
  }

  const response = await api.put("/userprofile/update", formData);

  return response.data;
};

export const blockUserProfile = async () => {
  const response = await api.get("/userprofile/block");
  return response.data;
};

export const getUserType = async () => {
  const response = await api.get("/userprofile/type");
  return response.data;
};
