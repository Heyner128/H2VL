import * as dotenv from 'dotenv';
import Server from "./server.js";
import HelperFunctions from "./util/helperFunctions.util.js";
import WebhookRouter from "./webhook/webhook.router.js";

dotenv.config();

(async () => {
    try {
        HelperFunctions.checkEnvironmentVariables();
        WebhookRouter.init();
        const PORT = !Number.isNaN(Number(process.env.PORT))
            ? Number(process.env.PORT)
            : 3000;
        await Server.httpServer.listen({ port: PORT });
        Server.logger.info(`App started successfully in port ${PORT}`);
    } catch (error) {
        Server.logger.error(
            new Error(`
      Fastify start error: ${error instanceof Error ? error : 'UNDEFINED'}`)
        );
        process.exit(1);
    }


})()