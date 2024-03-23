// @ts-ignore
import { Id, StrapiContext, StrapiDBQueryArgs } from "strapi-typed";
import { NavigationItem } from "../../types";
import { DEFAULT_POPULATE, getPluginModels } from "../utils";
import { getI18nStatus } from "../i18n";

const navigationItemService: (context: StrapiContext) => any = ({
  strapi,
}) => ({
  async find(): Promise<NavigationItem[]> {
    const { itemModel } = getPluginModels();
    const { enabled: i18nEnabled, locales } = await getI18nStatus({ strapi });

    let entities = await strapi.query<any>(itemModel.uid).findMany({
      limit: Number.MAX_SAFE_INTEGER,
      populate: DEFAULT_POPULATE,
    });

    if (i18nEnabled) {
      entities = entities.reduce((acc, entity) => {
        if (entity.localeCode && locales?.includes(entity.localeCode)) {
          acc.push({
            ...entity,
            localizations: entity.localizations?.filter(
              ({ localeCode }: any) =>
                localeCode && locales?.includes(localeCode)
            ),
          });
        }

        return acc;
      }, [] as NavigationItem[]);
    }

    return entities;
  },

  async findOne(id: Id): Promise<NavigationItem> {
    const { itemModel } = getPluginModels();
    const entity = await strapi
      .query<NavigationItem>(itemModel.uid)
      .findOne({ where: { id }, populate: ["related", "parent", "audience"] });

    return {
      ...entity,
    };
  },
});

export default navigationItemService;
