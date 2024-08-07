import { Server, Volume } from "../app/components/openstack";

const nodesTypes = {
  "os-server": Server,
  "os-volume": Volume,
};
const NodeWidth = 80;
const NodeHeight = 80;

export { nodesTypes, NodeHeight, NodeWidth };
