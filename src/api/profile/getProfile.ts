const getProfile = async () => {
  const res = await fetch("/api/profile");
  return res.json();
};

export default getProfile;
