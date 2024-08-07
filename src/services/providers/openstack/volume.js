class Volume {
  static type = "os-volume";
  static allow = ["os-server"];
  static properties = {
    name: {
      type: "string",
      default: "",
    },
    size: {
      type: "number",
      default: 1,
    },
    description: {
      type: "string",
      default: "",
    },
    availability_zone: {
      type: "string",
      default: "",
    },
    volume_type: {
      type: "string",
      default: "",
    },
    image_id: {
      type: "string",
      default: "",
    },
  };

  static template = `
resource "openstack_blockstorage_volume_v3" "<%= data.name %>" {
  name = "<%= data.name %>"
  size = "<%= data.size %>"
  <% if (data.description) { %>
  description = "<%= data.description %>"
  <% } %>
  <% if (data.availability_zone) { %>
  availability_zone = "<%= data.availability_zone %>"
  <% } %>
  <% if (data.volume_type) { %>
  volume_type = "<%= data.volume_type %>"
  <% } %>
  <% if (data.image_id) { %>
  image_id = "<%= data.image_id %>"
  <% } %>
}
  `;

  constructor(node) {
    this.node = node;
  }

  isConnectable(node) {
    return true;
  }
}

export { Volume };
