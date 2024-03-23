import { StrapiRoutes } from "../../types";

const routes: StrapiRoutes = {
  type: "content-api",
  routes: [
    {
      method: "GET",
      path: "/render/:idOrSlug",
      handler: "client.render",
      config: {
        policies: [],
      },
    },
    {
      method: "GET",
      path: "/render/:idOrSlug/:childUIKey",
      handler: "client.renderChild",
      config: {
        policies: [],
      },
    },
    {
      method: "GET",
      path: "/",
      handler: "client.readAll",
      config: {
        policies: [],
      },
    },
    {
      method: "GET",
      path: "/",
      handler: "navigation-item.find",
      config: {
        policies: [],
      },
    },
    {
      method: "GET",
      path: "/:idOrSlug",
      handler: "navigation-item.findOne",
      config: {
        policies: [],
      },
    },
  ],
};

export default routes;
