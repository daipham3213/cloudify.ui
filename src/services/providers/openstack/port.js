class Port {
  static type = "os-port";
  static allow = ["os-server", "os-subnet", "os-network"];
  static properties = {};

  constructor(node) {
    this.node = node;
  }

  static template = ``;
  isConnectable(node) {
    return true;
  }
}

export { Port };
