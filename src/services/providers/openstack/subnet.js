class Subnet {
  static type = "os-subnet";
  static allow = ["os-port", "os-network", "os-server", "os-router"];
  static properties = {};
}

export { Subnet };
