import defaultAvatar from "../assets/images/defaultAvatar.svg";

const handleImageError = (e) => {
  e.currentTarget.src = defaultAvatar;
};

export default handleImageError;
