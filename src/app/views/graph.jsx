import { useCallback, useRef, useState } from "react";
import {
  addEdge,
  Background,
  Controls,
  MiniMap,
  Panel,
  ReactFlow,
  reconnectEdge,
  useEdgesState,
  useNodesState,
} from "@xyflow/react";
import { ContextMenu } from "../components/context-menu";
import { NodeHeight, nodesTypes, NodeWidth } from "../../config";
import * as dagre from "@dagrejs/dagre";

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const getLayoutedElements = (nodes, edges, direction = "TB") => {
  const isHorizontal = direction === "LR";
  dagreGraph.setGraph({ rankdir: direction });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: NodeWidth, height: NodeHeight });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  const newNodes = nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    return {
      ...node,
      targetPosition: isHorizontal ? "left" : "top",
      sourcePosition: isHorizontal ? "right" : "bottom",
      // We are shifting the dagre node position (anchor=center center) to the top left
      // so it matches the React Flow node anchor point (top left).
      position: {
        x: nodeWithPosition.x - NodeWidth / 2,
        y: nodeWithPosition.y - NodeHeight / 2,
      },
    };
  });

  return { nodes: newNodes, edges };
};
const position = { x: 0, y: 0 };
const initialNodes = [
  {
    id: "a",
    type: "os-server",
    data: {
      label: "wire",
      terraform: {
        name: "VM1",
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
    position,
  },
  {
    id: "b",
    type: "os-volume",
    data: { name: "nodeTypes" },
    position,
  },
  {
    id: "c",
    type: "os-volume",
    data: { label: "your ideas" },
    position,
  },
  {
    id: "d",
    type: "os-server",
    data: {
      label: "wire",
      terraform: {
        name: "VM2",
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
    position,
  },
];

const initialEdges = [];

const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
  initialNodes,
  initialEdges,
);
const Graph = () => {
  const edgeReconnectSuccessful = useRef(true);

  const ref = useRef(null);
  const [menu, setMenu] = useState(null);

  const [nodes, setNodes, onNodesChange] = useNodesState(layoutedNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(layoutedEdges);

  const onConnect = useCallback(
    (connection) => setEdges((edges) => addEdge(connection, edges)),
    [setEdges],
  );

  const onReconnectStart = useCallback(() => {
    edgeReconnectSuccessful.current = false;
  }, []);

  const onReconnect = useCallback((oldEdge, newConnection) => {
    edgeReconnectSuccessful.current = true;
    setEdges((els) => reconnectEdge(oldEdge, newConnection, els));
  }, []);

  const onReconnectEnd = useCallback((_, edge) => {
    if (!edgeReconnectSuccessful.current) {
      setEdges((eds) => eds.filter((e) => e.id !== edge.id));
    }

    edgeReconnectSuccessful.current = true;
  }, []);

  const onLayout = useCallback(
    (direction) => {
      const { nodes: layoutedNodes, edges: layoutedEdges } =
        getLayoutedElements(nodes, edges, direction);

      setNodes([...layoutedNodes]);
      setEdges([...layoutedEdges]);
    },
    [nodes, edges],
  );

  const onNodeContextMenu = useCallback(
    (event, node) => {
      // Prevent native context menu from showing
      event.preventDefault();

      // Calculate position of the context menu. We want to make sure it
      // doesn't get positioned off-screen.
      const pane = ref.current.getBoundingClientRect();
      setMenu({
        id: node.id,
        top: event.clientY < pane.height - 200 && event.clientY,
        left: event.clientX < pane.width - 200 && event.clientX,
        right: event.clientX >= pane.width - 200 && pane.width - event.clientX,
        bottom:
          event.clientY >= pane.height - 200 && pane.height - event.clientY,
      });
    },
    [setMenu],
  );

  const onPaneClick = useCallback(() => setMenu(null), [setMenu]);

  return (
    <ReactFlow
      ref={ref}
      nodes={nodes}
      onNodesChange={onNodesChange}
      edges={edges}
      onEdgesChange={onEdgesChange}
      onReconnect={onReconnect}
      onReconnectStart={onReconnectStart}
      onReconnectEnd={onReconnectEnd}
      onConnect={onConnect}
      onNodeContextMenu={onNodeContextMenu}
      onPaneClick={onPaneClick}
      nodeTypes={nodesTypes}
      defaultEdgeOptions={{
        type: "smoothstep",
      }}
      isValidConnection={(connection) => {
        return true;
      }}
      fitView
    >
      {/*{menu && <ContextMenu onClick={onPaneClick} {...menu} />}*/}
      <Background variant="lines" />
      <MiniMap />
      <Controls />
      <Panel position="top-right">
        <button onClick={() => onLayout("TB")}>vertical layout</button>
        <button onClick={() => onLayout("LR")}>horizontal layout</button>
      </Panel>
    </ReactFlow>
  );
};

export { Graph };
