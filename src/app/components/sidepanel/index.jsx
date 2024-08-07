import React, { useCallback } from "react";
import { Row, Col, Card, Button } from "antd";
import { useReactFlow } from "@xyflow/react";

const SidePanel = () => {
  const reactFlowInstance = useReactFlow();

  const addNode = useCallback(() => {

    const newNode = {
      id: (reactFlowInstance.getNodes().length + 1).toString(),
      data: {
        label: "Node with Toolbar",
        terraform: {
          name: "VM",
          image_id: "ami-0c55b159cbfafe1f0",
          flavor_id: "t2.micro",
          security_groups: ["default"],
          block_device: {
            uuid: "<image-id>",
            source_type: "image",
            destination_type: "local",
            boot_index: 0,
            delete_on_termination: true,
          },
        },
      },
      type: "os-server",
      position: { x: 150, y: -150 },
    };

    reactFlowInstance.setNodes((nds) => [...nds, newNode]);
  }, [reactFlowInstance]);
  return (
    <div style={{ padding: "20px" }}>
      <Row gutter={16}>
        <Col span={12}>
          <Button onClick={addNode} type="default">
            <img
              src="/openstack/openstack-instance.png"
              width={30}
              height={30}
            />
          </Button>
        </Col>
        <Col span={12}>
          <Button type="default">Button 2</Button>
        </Col>
      </Row>
      <Row gutter={16} style={{ marginTop: "16px" }}>
        <Col span={12}>
          <Button type="default">Button 3</Button>
        </Col>
        <Col span={12}>
          <Button type="default">Button 4</Button>
        </Col>
      </Row>
    </div>
  );
};

export { SidePanel };
