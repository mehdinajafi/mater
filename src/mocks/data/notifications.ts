import { nanoid } from "nanoid";

const notifications = [
  {
    id: nanoid(),
    read: false,
    title: "Your order is placed",
    dec: "waiting for shipping",
    time: 1666631654794,
    icon: "https://www.dropbox.com/s/iv3vsr5k6ib2pqx/avatar_default.jpg?dl=1",
  },
  {
    id: nanoid(),
    read: false,
    title: "Your order is placed",
    dec: "waiting for shipping",
    time: 1666631654794,
    icon: "https://www.dropbox.com/s/iv3vsr5k6ib2pqx/avatar_default.jpg?dl=1",
  },
  {
    id: nanoid(),
    read: true,
    title: "Your order is placed",
    dec: "waiting for shipping",
    time: 1666631654794,
    icon: "https://www.dropbox.com/s/iv3vsr5k6ib2pqx/avatar_default.jpg?dl=1",
  },
  {
    id: nanoid(),
    read: true,
    title: "Your order is placed",
    dec: "waiting for shipping",
    time: 1666631654794,
    icon: "https://www.dropbox.com/s/iv3vsr5k6ib2pqx/avatar_default.jpg?dl=1",
  },
];

export default notifications;
