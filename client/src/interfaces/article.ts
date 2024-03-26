import type { ApiArticleArticle } from "@strapi-types";

export default interface Article {
  id: Number;
  attributes: ApiArticleArticle["attributes"];
}
