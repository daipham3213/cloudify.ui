/*
  A base Node component for all other Customized Node to extend
  Basic functionalities includes:
    - Context Menu
    - Node Icon
    - Async Loader
  Extended Customize Node should implement:
    - Renderer
 */
import React from "react";

import { Handle, Position, useStore, useUpdateNodeInternals } from "@xyflow/react";
import styled from "styled-components";

const StyledHandle = styled(Handle)`
    min-width: 2px;
    min-height: 2px;
    width: 5px;
    height: 5px;
`;

const BaseNode = React.memo(
  ({
     toolbarVisible,
     toolbarPosition,
     children,
     onEditClick,
     onRemoveClick,
     isConnectable,
     sourcePosition,
     targetPosition,
     data,
     handleComponent = StyledHandle,
     ...props
   }) => {
    const [edgeCount, setEdgeCount] = React.useState(0);
    const updateNodeInternals = useUpdateNodeInternals();

    const edges = useStore((state) => {
      const eds = state.edges.filter((edge) => edge.target === props.id);
      if (eds.length !== edgeCount) {
        setEdgeCount(() => {
          updateNodeInternals(props.id);
          return eds.length;
        });
      }
      return eds;
    });
    const Handler = handleComponent;
    const nid = `in-${edges.length + 1}`;
    return (
      <div className="nopan selected selectable draggable">
        <div>
          {edges.map((edge, i) => (
            <Handler
              id={edge.targetHandle}
              key={edge.id + edge.targetHandle}
              type="target"
              position={Position.Left}
              style={{ top: i * 10 }}
              isConnectable={false}
            />
          ))}
          <Handler
            id={nid}
            key={nid}
            type="target"
            position={Position.Left}
            style={{ top: edges.length * 10 }}
            onConnect={(params) => console.log("handle onConnect", params)}
            isConnectable={true}
          />
          {children}
          <Handler
            type="source"
            position={Position.Right}
            id="a"
            style={{ top: 10, background: "#555" }}
            isConnectable={isConnectable}
          />
        </div>
      </div>
    );
  }
);
export { BaseNode };
