import admin from "./admin";
import client from "./client";
import navigationItem from "./navigation-item";

const routes = {
  admin,
  "content-api": client,
  navigationItem,
};

export default routes;
