import { nanoid } from "nanoid";

const currentUser = {
  id: nanoid(),
  name: "Mehdi Najafi",
  role: "admin",
  email: "dev.mehdinajafi@gmail.com",
  avatar: "https://www.dropbox.com/s/iv3vsr5k6ib2pqx/avatar_default.jpg?dl=1",
  bio: "I am Front-end devloper.",
  publicAccount: false,
  phoneNumber: "+989123456789",
  address: "Alborz",
  countryCode: "ir",
  region: "Alborz",
  city: "Alborz",
  zipcode: 123456,
};

export default currentUser;
