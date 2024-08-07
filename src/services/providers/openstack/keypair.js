class Keypair {
  static type = "os-keypair";
  static allow = ["os-server"];
  static properties = {};

  constructor(node) {
    this.node = node;
  }

  static template = ``;

  isConnectable(node) {
    return true;
  }
}

export { Keypair };
