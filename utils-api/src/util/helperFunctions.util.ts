function checkEnvironmentVariables() {
    const requiredVariables: string[] = [
        'GITHUB_WEBHOOK_URL',
        'GITHUB_WEBHOOK_TOKEN'
    ]

    requiredVariables.forEach(requiredVariable => {
        if(!process.env[requiredVariable]) {
            throw new Error(`The environment variable "${requiredVariable}" is - missing`);
        }
    })
}

export default { checkEnvironmentVariables };