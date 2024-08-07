class Router {
  static type = "os-router";
  static allow = ["os-network", "os-subnet", "os-port"];
  static properties = {};

  constructor(node) {
    this.node = node;
  }

  static template = `
resource "openstack_networking_router_v2" "<%= data.name %>" {
  name = "<%= data.name %>"
  <% if (data.admin_state_up) { %>
  admin_state_up = "<%= data.admin_state_up %>"
  <% } %>
  <% if (data.external_gateway_info) { %>
  external_gateway_info {
    network_id = "<%= data.external_gateway_info.network_id %>"
    enable_snat = "<%= data.external_gateway_info.enable_snat %>"
  }
  <% } %>
}
  `;

  isConnectable(node) {
    return true;
  }
}

export { Router };
