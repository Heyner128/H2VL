export default interface Article {
  id: number;
  attributes: {
    titre: string;
    description: string;
    image: object;
    contenu: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}
