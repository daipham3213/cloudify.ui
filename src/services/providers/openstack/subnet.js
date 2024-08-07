class Subnet {
  static type = "os-subnet";
  static allow = ["os-port", "os-network", "os-server", "os-router"];
  static properties = {
    network_id: {
      type: "string",
      default: "",
    },
    cidr: {
      type: "string",
      default: "",
    },
    ip_version: {
      type: "string",
      default: "4",
    },
    enable_dhcp: {
      type: "boolean",
      default: true,
    },
    allocation_pools: {
      type: "array",
      default: [],
    },
    dns_nameservers: {
      type: "array",
      default: [],
    },
    host_routes: {
      type: "array",
      default: [],
    },
  };

  constructor(node) {
    this.node = node;
  }

  static template = `
resource "openstack_networking_subnet_v2" "<%= data.name %>" {
  network_id = "<%= data.network_id %>"
  cidr = "<%= data.cidr %>"
  <% if (data?.ip_version) { %>
  ip_version = "<%= data.ip_version %>"
  <% } %>
  <% if (data?.enable_dhcp) { %>
  enable_dhcp = "<%= data.enable_dhcp %>"
  <% } %>
  <% if (data?.allocation_pools) { %>
  allocation_pools = [
    <% for (const allocation_pool of data.allocation_pools) { %>
    {
      start = "<%=allocation_pool.start%>"
      end = "<%=allocation_pool.end%>"
    },
    <% } %>
  ]
  <% } %>
  <% if (data?.dns_nameservers) { %>
  dns_nameservers = [
    <% for (const dns_nameserver of data.dns_nameservers) { %>
    "<%=dns_nameserver%>",
    <% } %>
  ]
  <% } %>
  <% if (data?.host_routes) { %>
  host_routes = [
    <% for (const host_route of data.host_routes) { %>
    {
      destination = "<%=host_route.destination%>"
      nexthop = "<%=host_route.nexthop%>"
    },
    <% } %>
  ]
  <% } %>
} 
  `;

  isConnectable(node) {
    return true;
  }
}

export { Subnet };
