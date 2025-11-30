// Helper function to escape HTML
const escapeHtml = (text: string): string => {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  }
  return text.replace(/[&<>"']/g, (m) => map[m])
}

export const contactFormTemplate = (data: {
  firstName: string
  lastName: string
  email: string
  subject: string
  message: string
}) => `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        background-color: #f5f5f5;
        padding: 20px;
      }
      .email-wrapper {
        max-width: 600px;
        margin: 0 auto;
        background: white;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      }
      .header {
        background: #1e9df1;
        color: #ffffff;
        padding: 30px 20px;
        text-align: center;
      }
      .header h1 { font-size: 24px; margin-bottom: 5px; color: #ffffff; }
      .header p { opacity: 0.9; font-size: 14px; color: #ffffff; }
      .content { padding: 30px 20px; }
      .field {
        margin-bottom: 20px;
        padding-bottom: 20px;
        border-bottom: 1px solid #e5e7eb;
      }
      .field:last-child { border-bottom: none; }
      .field-label {
        font-size: 12px;
        text-transform: uppercase;
        color: #1e9df1;
        font-weight: 600;
        letter-spacing: 0.5px;
        margin-bottom: 8px;
      }
      .field-value {
        font-size: 15px;
        color: #1f2937;
        line-height: 1.6;
      }
      .message-box {
        background: #f9fafb;
        padding: 15px;
        border-radius: 5px;
        border-left: 4px solid #1e9df1;
      }
      .footer {
        background: #f9fafb;
        padding: 20px;
        text-align: center;
        font-size: 12px;
        color: #6b7280;
      }
      .reply-button {
        display: inline-block;
        margin-top: 10px;
        padding: 10px 20px;
        background: #1e9df1;
        color: #ffffff;
        text-decoration: none;
        border-radius: 5px;
        font-weight: 600;
      }
      .reply-button:hover {
        background: #0d7fc7;
      }
    </style>
  </head>
  <body>
    <div class="email-wrapper">
      <div class="header">
        <h1>Nová správa</h1>
        <p>z kontaktného formulára</p>
      </div>

      <div class="content">
        <div class="field">
          <div class="field-label">Odosielateľ</div>
          <div class="field-value">${escapeHtml(data.firstName)} ${escapeHtml(data.lastName)}</div>
        </div>

        <div class="field">
          <div class="field-label">Email</div>
          <div class="field-value">
            <a href="mailto:${escapeHtml(data.email)}" style="color: #1e9df1; text-decoration: none;">
              ${escapeHtml(data.email)}
            </a>
          </div>
          <a href="mailto:${escapeHtml(data.email)}" class="reply-button" style="color: #ffffff !important;">Odpovedať</a>
        </div>

        ${
          data.subject
            ? `
        <div class="field">
          <div class="field-label">Predmet</div>
          <div class="field-value">${escapeHtml(data.subject)}</div>
        </div>
        `
            : ''
        }

        <div class="field">
          <div class="field-label">Správa</div>
          <div class="message-box">
            ${escapeHtml(data.message).replace(/\n/g, '<br>')}
          </div>
        </div>
      </div>

      <div class="footer">
        Prijaté ${new Date().toLocaleString('sk-SK', {
          dateStyle: 'long',
          timeStyle: 'short',
        })}
      </div>
    </div>
  </body>
</html>
`
