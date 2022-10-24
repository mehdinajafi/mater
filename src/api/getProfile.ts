const getProfile = async () => {
  const res = await fetch("/api/user/profile");
  return res.json();
};

export default getProfile;
