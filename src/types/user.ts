export interface User {
  id: number;
  fullname: string;
  email: string;
}

export interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

export interface SearchResult {
  name: string
  username: string
  bio:string
  avatar:string
}

export interface Follows{
  name: string
  username: string
  bio:string
  avatar:string
  follow: boolean
}

export interface FollowsContentProps {
  activeTab: "followers" | "following";
  setActiveTab: (tab: "followers" | "following") => void;
}

export interface ProfileContent {
  name: string
  username: string
  content:string
  avatar:string
  image: string
  post_date: string
  likeCount: number
  commentCount: number
}
