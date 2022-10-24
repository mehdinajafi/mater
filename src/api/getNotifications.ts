const getNotifications = async () => {
  const res = await fetch("/api/user/notifications");
  return res.json();
};

export default getNotifications;
