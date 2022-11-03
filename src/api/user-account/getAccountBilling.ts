const getAccountBilling = async () => {
  const res = await fetch("/api/user/billing");
  return res.json();
};

export default getAccountBilling;
