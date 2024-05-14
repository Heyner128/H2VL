export default interface Article {
    id: number;
    attributes: {
        titre: string;
        contenu: string;
        description: string;
        createdAt: string;
        "type_d_article": {
            data: {
                attributes: {
                    value: string;
                };
            };
        };
        image: {
            data: {
                attributes: {
                    url: string;
                };
            };
        };
    };
}
