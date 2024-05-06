module.exports = {
  apps : [{
    name   : "H2VL cms",
    script : "npm",
    args: "start",
    cwd: "./cms",
    env: {
      NODE_ENV: "production",
    }
  },
  {
    name   : "H2VL client",
    script : "npm",
    args: "start",
    cwd: "./client",
    env: {
      NODE_ENV: "production",
    }
  },
  {
    name   : "H2VL utils api",
    script : "npm",
    args: "start",
    cwd: "./utils-api",
    env: {
      NODE_ENV: "production",
    }
  }
]
}