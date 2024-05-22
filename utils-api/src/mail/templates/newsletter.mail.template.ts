import mjml2html from 'mjml';
import Article from '../../interfaces/article';
import * as process from 'node:process';

export default function newsletterMailTemplate(articles: Article[], email: string): string {
  return mjml2html(`
        <mjml>
            <mj-body>
                <mj-section>
                    <mj-column>
                    
                        <mj-image 
                            width="100px" 
                            src=${`${process.env.HOSTNAME_URL}/static/logo.png`}
                            alt="logo"
                        ></mj-image>
                    
                        <mj-divider border-color="#6189E0"></mj-divider>
                    </mj-column>
                </mj-section>
                <mj-section>
                    <mj-column>
                        <mj-text font-size="15px" font-family="helvetica">Voici les dernières actualités et evenèments:</mj-text>
                    </mj-column>
                </mj-section>
                ${articles.map(
                  (article) => `
                        <mj-section padding-right="80px" padding-left="80px">
                            <mj-column>
                               <mj-image 
                                    width="100px" 
                                    src=${`${process.env.PUBLIC_STRAPI_URL + article.attributes.image.data.attributes.url}`}
                                    href=${`${process.env.PUBLIC_CLIENT_URL}/nouveautes/${article.id}`}
                                ></mj-image>
                            </mj-column>
                            <mj-column>
                                <mj-text>
                                    <a 
                                        href=${`${process.env.PUBLIC_CLIENT_URL}/nouveautes/${article.id}`}
                                        title=${`Voir ${article.attributes.titre}`}
                                        style="text-decoration: none; color: inherit"
                                    >
                                        <strong>${article.attributes.titre}</strong>
                                    </a>
                                </mj-text>
                                <mj-text>
                                    <a 
                                        href=${`${process.env.PUBLIC_CLIENT_URL}/nouveautes/${article.id}`}
                                        title=${`Voir ${article.attributes.titre}`}
                                        style="text-decoration: none; color: inherit"
                                    >
                                        ${article.attributes.description}
                                    </a>
                                </mj-text>
                            </mj-column>
                        </mj-section>
                    `,
                )}
                <mj-section>
                    <mj-column>
                        <mj-text align="center">
                            <a href=${`${process.env.PUBLIC_CLIENT_URL}/nouveautes`}>Voir toutes les nouveautés</a>
                        </mj-text>
                    </mj-column>
                </mj-section>
                <mj-section>
                    <mj-column>
                        <mj-text font-size="10px">
                            Cliquez ici si vous voulez arrêter de recevoir ces emails: 
                            <a href=${`${process.env.PUBLIC_CLIENT_URL}/desabonner?email=${email}`}>Se desabonner</a>
                        </mj-text>
                    </mj-column>
                </mj-section>
            </mj-body>
        </mjml>
    `).html;
}
