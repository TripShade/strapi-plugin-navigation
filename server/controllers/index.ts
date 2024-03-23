import { NavigationController } from "../../types";

import admin from "./admin";
import client from "./client";
import navigationItem from "./navigation-item";

const controllers: NavigationController = {
  admin,
  client,
  navigationItem,
};

export default controllers;
