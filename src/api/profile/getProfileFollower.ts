const getProfileFollower = async () => {
  const res = await fetch("/api/profile/followers");
  return res.json();
};

export default getProfileFollower;
