const getProfileFriends = async () => {
  const res = await fetch("/api/profile/friends");
  return res.json();
};

export default getProfileFriends;
