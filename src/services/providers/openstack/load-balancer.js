class LoadBalancer {
  static type = "os-loadbalancer";
  static allow = ["os-loadbalancer", "os-server"];
  static properties = {
    name: {
      type: "string",
      default: "",
    },
    description: {
      type: "string",
      default: "",
    },
    listeners: {
      type: "array",
      default: [],
    },
    pools: {
      type: "array",
      default: [],
    },
    members: {
      type: "array",
      default: [],
    },
    healthmonitors: {
      type: "array",
      default: [],
    },
    l7policies: {
      type: "array",
      default: [],
    },
    l7rules: {
      type: "array",
      default: [],
    },
  };

  constructor(node) {
    this.node = node;
  }

  static template = `
resource "openstack_networking_loadbalancer_v2" "<%= data.name %>" {
  name = "<%= data.name %>"
  <% if (data.description) { %>
  description = "<%= data.description %>"
  <% } %>
}%>
<% if (data.listeners) { %>
<% data.listeners.forEach((listener) => { %>
resource "openstack_networking_listener_v2" "<%= listener.name %>" {
  name = "<%= listener.name %>"
  protocol = "<%= listener.protocol %>"
  protocol_port = "<%= listener.protocol_port %>"
  loadbalancer_id = openstack_networking_loadbalancer_v2.<%= data.name %>.id
}
<% }%>
}) %>
<% } %>
<% if (data.pools) { %>
<% data.pools.forEach((pool) => { %>
resource "openstack_networking_pool_v2" "<%= pool.name %>" {
  name = "<%= pool.name %>"
  protocol = "<%= pool.protocol %>"
  lb_algorithm = "<%= pool.lb_algorithm %>"
  listener_id = openstack_networking_listener_v2.<%= pool.listener_name %>.id
}
<% }%>
}) %>
<% } %>
<% if (data.members) { %>
<% data.members.forEach((member) => { %>
resource "openstack_networking_member_v2" "<%= member.name %>" {
  name = "<%= member.name %>"
  address = "<%= member.address %>"
  protocol_port = "<%= member.protocol_port %>"
  pool_id = openstack_networking_pool_v2.<%= member.pool_name %>.id
}
<% }%>
}) %>
<% } %>

<% if (data.healthmonitors) { %>
<% data.healthmonitors.forEach((healthmonitor) => { %>
resource "openstack_networking_healthmonitor_v2" "<%= healthmonitor.name %>" {
  name = "<%= healthmonitor.name %>"
  type = "<%= healthmonitor.type %>"
  delay = "<%= healthmonitor.delay %>"
  timeout = "<%= healthmonitor.timeout %>"
  max_retries = "<%= healthmonitor.max_retries %>"
  pool_id = openstack_networking_pool_v2.<%= healthmonitor.pool_name %>.id
}
<% }%>
}) %>
<% } %>

<% if (data.l7policies) { %>
<% data.l7policies.forEach((l7policy) => { %>
resource "openstack_networking_lbaas_l7policy_v2" "<%= l7policy.name %>" {
  name = "<%= l7policy.name %>"
  action = "<%= l7policy.action %>"
  listener_id = openstack_networking_listener_v2.<%= l7policy.listener_name %>.id
}
<% }%>
}) %>
<% } %>
<% if (data.l7rules) { %>
<% data.l7rules.forEach((l7rule) => { %>
resource "openstack_networking_lbaas_l7rule_v2" "<%= l7rule.name %>" {
  name = "<%= l7rule.name %>"
  type = "<%= l7rule.type %>"
  compare_type = "<%= l7rule.compare_type %>"
  key = "<%=l7rule.key %>"
  value = "<%= l7rule.value %>"
  invert = "<%= l7rule.invert %>"
  l7policy_id = openstack_networking_lbaas_l7policy_v2.<%= l7rule.l7policy_name %>.id
}
<% } %>
}) %>
<% } %>

  `;

  isConnectable(node) {
    return true;
  }
}

export { LoadBalancer };
