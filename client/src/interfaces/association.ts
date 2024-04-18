export default interface Association {
    attributes: {
        titre: string;
        contenu: string;
        phrase: string;
        image: {
            data: {
                attributes: {
                    url: String;
                }
            }
        };
    }
}