module.exports = {
  apps : [{
    name   : "H2VL cms",
    script : "npm",
    args: "start",
    cwd: "./cms"
  },
  {
    name   : "H2VL client",
    script : "npm",
    args: "start",
    cwd: "./client"
  }
]
}