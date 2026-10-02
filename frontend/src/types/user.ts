export type InfoProfile = {
  name: string;
  phone: string;
  email: string;
  joinedAt: string;
  status: string;
  avatar: string | null;
};

export type UserContent = {
  id: string;
  name: string;
  email: string;
  phone: string;
  joinedAt: string;
  avatar: string;
  status: "Active" | "Block";
  postCount: number;
  favoriteCount: number;
};

export type UserContentProps = {
  users: UserContent[];
};
