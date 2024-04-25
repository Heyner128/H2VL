module.exports = {
  apps : [{
    name   : "H2VL cms",
    script : "npm",
    args: "start",
    interpreter_args: "-w=cms"
  },
  {
    name   : "H2VL client",
    script : "npm",
    args: "start",
    interpreter_args: "-w=client"
  }
]
}