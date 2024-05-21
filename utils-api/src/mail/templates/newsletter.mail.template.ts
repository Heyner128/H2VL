import mjml2html from 'mjml';
import Article from "../../interfaces/article";
import * as process from "node:process";

export default function newsletterMailTemplate(
    articles: Article[]
): string {
    return mjml2html(`
        <mjml>
            <mj-body>
                <mj-section>
                    <mj-column>
                    
                        <mj-image width="100px" src=${`${process.env.HOSTNAME_URL}/static/logo.png`}></mj-image>
                    
                        <mj-divider border-color="#6189E0"></mj-divider>
                    </mj-column>
                </mj-section>
                <mj-section>
                    <mj-column>
                        <mj-text font-size="15px" font-family="helvetica">Voici les dernières actualités et evenèments:</mj-text>
                    </mj-column>
                </mj-section>
                ${
                    articles.map(article => (`
                        <mj-section padding-right="80px" padding-left="80px">
                            <mj-column>
                              <mj-image width="100px" src=${`${process.env.PUBLIC_STRAPI_URL + article.attributes.image.data.attributes.url}`}></mj-image>
                            </mj-column>
                            <mj-column>
                                <mj-text><strong>${article.attributes.titre}</strong></mj-text>
                                <mj-text>${article.attributes.description}</mj-text>
                            </mj-column>
                        </mj-section>
                    `))
                }
            </mj-body>
        </mjml>
    `).html;
}
