class Network {
  static type = "os-network";
  static allow = ["os-server", "os-subnet", "os-port", "os-router"];
  static properties = {
    admin_state_up: {
      type: "boolean",
      default: true,
    },
    region: {
      type: "string",
      default: "RegionOne",
    },
    name: {
      type: "string",
      default: "",
    },
  };

  constructor(node) {
    this.node = node;
  }

  static template = `
resource "openstack_networking_network_v2" "<%= data.name %>" {
  <% if (data?.admin_state_up) { %>
  admin_state_up = "<%= data.admin_state_up %>"
  <% } %>
  <% if (data?.region) { %> 
  region = "<%= data.region %>" 
  <% } %>
  <% if (data?.name) { %>
  name = "<%= data.name %>"
  <% } %>
} 
  `;

  isConnectable(node) {
    return true;
  }
}

export { Network };
