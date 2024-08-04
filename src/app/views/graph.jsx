import { useCallback, useRef } from "react";
import {
  addEdge,
  Background,
  Controls,
  MiniMap,
  ReactFlow,
  reconnectEdge,
  useEdgesState,
  useNodesState,
} from "@xyflow/react";
import { nodesTypes } from "../../config";

const initialNodes = [
  { id: "a", type: "input", position: { x: 0, y: 0 }, data: { label: "wire" } },
  {
    id: "b",
    type: "os-server",
    position: { x: -100, y: 100 },
    data: { name: "nodeTypes" },
  },
  { id: "c", position: { x: 100, y: 100 }, data: { label: "your ideas" } },
  {
    id: "d",
    type: "output",
    position: { x: 0, y: 200 },
    data: { label: "with React Flow" },
  },
];

const initialEdges = [
  { id: "a->c", source: "a", target: "c", animated: true },
  {
    id: "b->d",
    source: "b",
    target: "d",
  },
  { id: "c->d", source: "c", target: "d", animated: true },
];
const Graph = () => {
  const edgeReconnectSuccessful = useRef(true);
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

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
  return (
    <ReactFlow
      nodes={nodes}
      onNodesChange={onNodesChange}
      edges={edges}
      onEdgesChange={onEdgesChange}
      onReconnect={onReconnect}
      onReconnectStart={onReconnectStart}
      onReconnectEnd={onReconnectEnd}
      onConnect={onConnect}
      nodeTypes={nodesTypes}
      fitView
    >
      <Background variant="lines" />
      <MiniMap />
      <Controls />
    </ReactFlow>
  );
};

export { Graph };
