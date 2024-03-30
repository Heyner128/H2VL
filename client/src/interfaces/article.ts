export default interface Article {
  id: Number;
  attributes: {
    titre: String;
    contenu: String;
    description: string;
    image: {
      data: {
        attributes: {
          url: String;
        }
      }
    };
  }
}
