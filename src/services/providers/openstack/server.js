class Server {
  static type = "os-server";
  static allow = ["os-volume", "os-port", "os-keypair"];
  static properties = {
    name: {
      type: "string",
      default: "",
    },
    count: {
      type: "number",
      default: 1,
    },
    image_id: {
      type: "string",
      default: "",
    },
    key_name: {
      type: "string",
      default: "",
    },
    availability_zone: {
      type: "string",
      default: "",
    },
    user_data: {
      type: "string",
      default: "",
    },
    flavor_id: {
      type: "string",
      default: "",
    },
    security_groups: {
      type: "array",
      default: [],
    },
    networks: {
      type: "array",
      default: [],
    },
    block_devices: {
      type: "array",
      default: [],
    },
  };

  constructor(node) {
    this.node = node;
  }

  static template = `
resource "openstack_compute_instance_v2" "<%= data.name %>" {
  name        = "<%= data.name %>"
  <% if (data.count && data.count > 1) { %>
  count       = <%= data.count %>
  <% } %>
  <% if (data.image_id) { %>
  image_id    = "<%= data.image_id %>"
  <% } %>
  <% if (data.key_name) { %>
  key_name    = "<%= data.key_name %>"
  <% } %>
  <% if (data.availability_zone) { %>
  availability_zone = "<%= data.availability_zone %>"
  <% } %>
  <% if (data.user_data) { %>
  admin_pass = "<%= data.admin_pass %>"
  <% } %>
  <% if (data.user_data) { %>
  user_data  = <<EOF
<%= data.user_data %>
EOF
  <% } %>

  flavor_id   = "<%= data.flavor_id %>"
  <% if (data.security_groups) { %>
  security_groups = [
    <% for (const security_group of data.security_groups) { %>
    "<%=security_group%>",
    <% } %>
  ]
  <% } %>
  
  <% if (data.networks) { %>
  <% data.networks.forEach((network) => { %>
  network {
    <% if (network.uuid) { %>
    uuid = "<%= network.uuid %>"
    <% } %>
    
    <% if (network.name) { %>
    name = "<%= network.name %>"
    <% } %>
    
    <% if (network.port) { %>
    port = "<%= network.port %>"
    <% } %> 
    
    <% if (network.fixed_ip_v4) { %>
    fixed_ip_v4 = "<%= network.fixed_ip_v4 %>"
    <% } %>
  }
  <% }) %>
  <% } %>
  <% if (data.block_devices) { %>
  <% data.block_devices.forEach((block_device) => { %>
  block_device {
    <% if (block_device.uuid) { %>
    uuid = "<%= block_device.uuid %>"
    <% } %>
    <% if (block_device.source_type) { %>
    source_type = "<%= block_device.source_type %>"
    <% } %>
    <% if (block_device.destination_type) { %>
    destination_type = "<%= block_device.destination_type %>"
    <% } %>
    <% if (block_device.boot_index) { %>
    boot_index = <%= block_device.boot_index %>
    <% } %>
    <% if (block_device.delete_on_termination) { %>
    delete_on_termination = <%= block_device.delete_on_termination %>
    <% } %>
  }
  <% }) %>
}
  `;

  isConnectable(node) {
    return true;
  }
}

export { Server };
