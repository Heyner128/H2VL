import type { FastifyRequest, FastifyReply } from 'fastify';
import axios, { AxiosResponse, AxiosRequestConfig, AxiosError } from 'axios';
import Server from '../server.js';

async function webhookProxy(
    _: FastifyRequest,
    reply: FastifyReply
): Promise<void> {
    try {
        const githubRequestConfig: AxiosRequestConfig<{
            ref: string
        }> = {
            method: 'POST',
            url: process.env.GITHUB_WEBHOOK_URL,
            headers: {
                Accept: 'application/vnd.github+json',
                Authorization: 'Bearer ' + process.env.GITHUB_WEBHOOK_TOKEN,
                "X-Github-Api-Version": '2022-11-28',
            },
            data: {
                ref: "main"
            }
        }

        Server.logger.info('Webhook request sent to github');

        const githubResponse: AxiosResponse = await axios.request(githubRequestConfig);

        reply
            .status(githubResponse.status)
            .headers(githubResponse.headers as Record<string, string>)
            .send(githubResponse.data);
    } catch (error) {

        const typedError: AxiosError = error as AxiosError;


        if(
            typedError.response
        ) {
            reply
                .status(typedError.response.status)
                .headers(typedError.response.headers as Record<string, string>)
                .send(typedError.response.data);


            Server.logger.error(`Github answered with error ${typedError.response.status} - ${JSON.stringify(typedError.response.data)}`);
        } else {
            reply
                .status(500)
                .send(typedError.message);

            Server.logger.error(typedError.message);
        }

    }
}

export default { webhookProxy };
