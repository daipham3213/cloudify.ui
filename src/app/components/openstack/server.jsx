import React, { useCallback, useEffect, useState } from "react";
import {
  Handle,
  Position,
  useNodesState,
  useReactFlow,
  useUpdateNodeInternals,
} from "@xyflow/react";
import { Button, Card, Drawer, Input, Space, Form } from "antd";

const ServerDrawer = ({ data, open, onClose, onSave }) => {
  return (
    <Drawer
      title={`Instace ${data.name}`}
      onClose={onClose}
      open={open}
      onClick={(e) => e.stopPropagation()}
    >
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        style={{ maxWidth: 600 }}
        onFinish={onSave}
        initialValues={data}
      >
        <Space>
          <Button onClick={onClose}>Cancel</Button>
          <Button htmlType="submit" type="primary">
            Save
          </Button>
        </Space>
        <Form.Item label="name" name="name">
          <Input />
        </Form.Item>
        <Form.Item label="Image" name="image_id">
          <Input />
        </Form.Item>
        <Form.Item label="Flavor" name="flavor_id">
          <Input />
        </Form.Item>
      </Form>
    </Drawer>
  );
};

const Server = ({ data, ...props }) => {
  const { getNode, setNodes } = useReactFlow();
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const onSave = (values) => {
    const currentNode = getNode(props.id);
    currentNode.data.terraform = {
      ...currentNode.data.terraform,
      ...values,
    };
    setNodes((nodes) =>
      nodes.map((node) => (node.id === props.id ? currentNode : node)),
    );
    onClose();
  };

  return (
    <Card onClick={showDrawer}>
      <img
        src="/openstack/openstack-instance.png"
        alt="icon"
        style={{ width: "30px", height: "30px" }}
      />
      <div style={{ fontSize: "xx-small", textAlign: "center" }}>
        {data.terraform.name}
      </div>
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />

      <ServerDrawer
        open={open}
        onClose={onClose}
        data={data.terraform}
        onSave={onSave}
      />
    </Card>
  );
};

export { Server };
