# H2VL

The H2VL.fr site is composed of three main components: an API to manage mails, a Strapi CMS, and an Astro site. This repository is organized into three npm workspaces to manage these components efficiently.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
  - [Building the Workspaces](#building-the-workspaces)
  - [Starting the Workspaces](#starting-the-workspaces)
  - [Development Mode](#development-mode)
- [Environment Variables](#environment-variables)
- [PM2 Configuration](#pm2-configuration)
- [License](#license)

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/h2vl.git
   cd h2vl
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

## Usage

### Building the Workspaces

To build all the workspaces, run the following command from the root directory:
```bash
npm run build
```
This command will trigger the build process for the `cms`, `client`, and `utils-api` workspaces.

### Starting the Workspaces

To start all the workspaces, run:
```bash
npm run start
```
This command will start the `cms`, `client`, and `utils-api` workspaces.

### Development Mode

For development purposes, you can run the following commands to start the workspaces in debug mode:

- **CMS Workspace:**
  ```bash
  npm run dev --workspace=cms
  ```

- **Client Workspace:**
  ```bash
  npm run dev --workspace=client
  ```

- **Utils-API Workspace:**
  ```bash
  npm run start:dev --workspace=utils-api
  ```

## Environment Variables

Each workspace requires an `.env` file for configuration. An example environment file (`example.env`) is provided in each workspace's directory. To set up the environment variables:

1. **Copy the example environment file:**
   ```bash
   cp packages/<workspace>/example.env packages/<workspace>/.env
   ```

2. **Edit the `.env` file** with the appropriate values for your environment.

## PM2 Configuration

We use PM2 to manage our processes in production. The configuration file is located at the root of the repository and is named `pm2.config.js`. To start the application using PM2, run:

```bash
pm2 start pm2.config.js
```

### PM2 Configuration File: `pm2.config.js`

```javascript
module.exports = {
  apps: [
    {
      name: 'H2VL-CMS',
      script: 'npm',
      args: 'start --workspace=cms',
      env: {
        NODE_ENV: 'production',
      },
    },
    {
      name: 'H2VL-Client',
      script: 'npm',
      args: 'start --workspace=client',
      env: {
        NODE_ENV: 'production',
      },
    },
    {
      name: 'H2VL-Utils-API',
      script: 'npm',
      args: 'start --workspace=utils-api',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Feel free to contribute to this project by submitting issues and pull requests. For any questions or feedback, please contact the maintainers.
