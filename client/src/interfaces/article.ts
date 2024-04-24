export default interface Article {
  id: number;
  attributes: {
    titre: string;
    contenu: string;
    description: string;
    createdAt: string;
    etiquette: string;
    image: {
      data: {
        attributes: {
          url: string;
        }
      }
    };
  }
}
