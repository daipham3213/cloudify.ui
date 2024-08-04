class LoadBalancer {
  static type = "os-loadbalancer";
  static allow = ["os-loadbalancer", "os-server"];
  static properties = {};
}

export { LoadBalancer };
