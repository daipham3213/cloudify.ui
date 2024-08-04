class SecurityGroup {
  static type = "os-secgroup";
  static allow = ["os-port", "os-server"];
  static properties = {};
}

export { SecurityGroup };
