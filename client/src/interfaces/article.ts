export default interface Article {
  id: Number;
  attributes: {
    titre: String;
    contenu: String;
    description: String;
    createdAt: String;
    etiquette: String;
    image: {
      data: {
        attributes: {
          url: String;
        }
      }
    };
  }
}
