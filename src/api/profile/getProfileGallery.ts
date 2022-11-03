const getProfileGallery = async () => {
  const res = await fetch("/api/profile/gallery");
  return res.json();
};

export default getProfileGallery;
