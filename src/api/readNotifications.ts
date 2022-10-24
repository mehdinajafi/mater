const readNotifications = async () => {
  const res = await fetch("/api/user/notification/mark-as-read");
  return res.json();
};

export default readNotifications;
