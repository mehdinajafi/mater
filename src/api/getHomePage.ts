const getHomePage = async () => {
  const res = await fetch("/api");
  return res.json();
};

export default getHomePage;
