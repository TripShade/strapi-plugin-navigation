//@ts-ignore
import { errors, sanitize } from "@strapi/utils";
import { Id, StringMap } from "strapi-typed";
import { ToBeFixed } from "../../types";
import { getPluginService, parseParams } from "../utils";

const clientControllers: any = {
  getService() {
    return getPluginService("navigation-item");
  },

  async find(ctx: any) {
    try {
      return await this.getService().find();
    } catch (error: unknown) {
      if (error instanceof Error) {
        return ctx.badRequest(error.message);
      }

      throw error;
    }
  },

  async findOne(ctx: any) {
    const { params = {} } = ctx;
    const { idOrSlug } = parseParams<StringMap<string>, { idOrSlug: Id }>(
      params
    );
    try {
      return await this.getService().findOne(idOrSlug);
    } catch (error: unknown) {
      if (error instanceof errors.NotFoundError) {
        return ctx.notFound((error as ToBeFixed).message);
      }

      if (error instanceof Error) {
        return ctx.badRequest(error.message);
      }

      throw error;
    }
  },
};

export default clientControllers;
