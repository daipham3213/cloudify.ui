class SecurityGroup {
  static type = "os-secgroup";
  static allow = ["os-port", "os-server"];
  static properties = {
    name: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
      required: false,
    },
    rules: {
      type: "array",
      required: false,
      default: [],
      items: {
        type: "object",
        properties: {
          direction: {
            type: "string",
            required: true,
            enum: ["ingress", "egress"],
          },
          ethertype: {
            type: "string",
            required: true,
            enum: ["IPv4", "IPv6"],
          },
          port_range_max: {
            type: "number",
            required: false,
          },
          port_range_min: {
            type: "number",
            required: false,
          },
          protocol: {
            type: "string",
            required: true,
            enum: ["tcp", "udp", "icmp", "icmpv6"],
          },
          remote_group_id: {
            type: "string",
            required: false,
          },
          remote_ip_prefix: {
            type: "string",
            required: false,
          },
        },
      },
    },
  };

  constructor(node) {
    this.node = node;
  }

  static template = `
resource "openstack_compute_secgroup_v2" "<%= data.name %>" {
  name        = "<%= data.name %>"
  <% if (data.description) { %>
  description = "<%= data.description %>"
  <% } %>
}
<% if (data.rules) { %>
<% for (let i = 0; i < data.rules.length; i ++) { %>
resource "openstack_compute_secgroup_rule_v2" "<%= data.name %>-rule-<%= i %>" {
<% if (data.rules[i].direction) { %>
  direction = "<%= data.rules[i].direction %>"
<% } %>
<% if (data.rules[i].ethertype) { %>
  ethertype = "<%= data.rules[i].ethertype %>"
<% } %>
<% if (data.rules[i].port_range_max) { %>
  port_range_max = <%= data.rules[i].port_range_max %>
<% } %>
<% if (data.rules[i].port_range_min) { %>
  port_range_min = <%= data.rules[i].port_range_min %>
<% } %>
<% if (data.rules[i].protocol) { %>
  protocol = "<%= data.rules[i].protocol %>"
<% } %>
<% if (data.rules[i].remote_group_id) { %>
  remote_group_id = "<%= data.rules[i].remote_group_id %>"
<% } %>
<% if (data.rules[i].remote_ip_prefix) { %>
  remote_ip_prefix = "<%= data.rules[i].remote_ip_prefix %>"
<% } %>
  security_group_id = openstack_compute_secgroup_v2.<%= data.name %>.id
}
<% } %>
  `;

  isConnectable(node) {
    return true;
  }
}

export { SecurityGroup };
