import Server from '../server.js';
import WebhookProxyController from './webhook.controller.js';

function init() {
    Server.httpServer.post('/webhook-proxy', WebhookProxyController.webhookProxy);
    Server.logger.info('webhook router initialized.');
}

export default { init };