import { useState } from "react";
import { CreatePost, LeftBar } from "../components/left-bar";
import { RightBar } from "../components/right-bar";
import { useLocation } from "react-router-dom";
import { EditProfile } from "../components/edit-profile";

export function AppLayout({ children }: { children: React.ReactNode }) {
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const location = useLocation();
  const isProfileVisible = location.pathname === "/profile";

  const handleOpenCreatePost = () => setShowCreatePost(true);
  const handleCloseCreatePost = () => setShowCreatePost(false);

  const handleOpenEditProfile = () => {
    setShowEditProfile(true);
  };

  const handleCloseEditProfile = () => setShowEditProfile(false);

  return (
    <>
      <LeftBar onOpenCreatePost={handleOpenCreatePost} />
      {children}
      <RightBar
        isProfileVisible={isProfileVisible}
        onEditProfileClick={handleOpenEditProfile}
      />
      {showCreatePost && <CreatePost onClose={handleCloseCreatePost} />}
      {showEditProfile && <EditProfile onClose={handleCloseEditProfile} />}
    </>
  );
}
