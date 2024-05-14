import mjml2html from 'mjml';
import ContactFormDto from 'shared/src/interfaces/contactForm.dto';

export default function contactFormMailTemplate(
  contactFormDto: ContactFormDto,
): string {
  return mjml2html(`
        <mjml>
          <mj-body>
            <mj-section>
              <mj-column>
        
                <mj-image width="100px" src=${`${process.env.HOSTNAME_URL}/public/logo.png`}></mj-image>
        
                <mj-divider border-color="#6189E0"></mj-divider>
                
                <mj-text font-size="20px" font-family="helvetica">Un nouveau message vient d&apos;arriver sur la page de contact:</mj-text>
                
                <mj-text align="center" font-size="20px" font-family="helvetica">
                  <strong>Nom:</strong>
                  <span>${contactFormDto.name}</span>
                </mj-text>
                
                <mj-text align="center" font-size="20px" font-family="helvetica">
                  <strong>Email:</strong>
                  <span>${contactFormDto.email}</span>
                </mj-text>
                
                <mj-text align="center" font-size="20px" font-family="helvetica">
                  <strong>Message:</strong>
                  <p>${contactFormDto.message}</p>
                </mj-text>
                
              </mj-column>
            </mj-section>
          </mj-body>
        </mjml>
    `).html;
}
