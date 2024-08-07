import { useCallback } from "react";
import { useReactFlow } from "@xyflow/react";
import { Dropdown, Menu } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const items = [
  {
    key: "delete",
    label: "Delete",
    icon: <DeleteOutlined />,
  },
  {
    key: "edit",
    label: "Edit",
    icon: <EditOutlined />,
  },
];
const ContextMenu = ({ id, ...rest }) => {
  const xyflow = useReactFlow();
  const deleteNode = useCallback(() => {
    xyflow.setNodes((nodes) => nodes.filter((node) => node.id !== id));
    xyflow.setEdges((edges) =>
      edges.filter((edge) => edge.source !== id && edge.target !== id),
    );
  }, [id, xyflow]);

  return (
    <Dropdown
      items={items}
      trigger={["contextMenu"]}
      onClick={(e) => {
        console.log(e);
      }}
      {...rest}
    />
  );
};
export { ContextMenu };
