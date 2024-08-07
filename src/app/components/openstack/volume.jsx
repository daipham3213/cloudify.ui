import { BaseNode } from "../node";
import { Card } from "antd";
import { Handle, Position, NodeResizer } from "@xyflow/react";
import React from "react";

const Volume = ({ data, ...props }) => {
  return (
    <Card
    >
      <img src={'/openstack/volume.png'} alt="icon" style={{ width: '30px', height: '30px' }} />
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </Card>
  );
};

export { Volume };
