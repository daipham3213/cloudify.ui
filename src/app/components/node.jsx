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

import { Handle } from "@xyflow/react";
import { Box, styled } from "@mui/material";
import { HandlePosition } from "../common/consts.js";

const HandleTypes = ["source", "target"];
const StyledHandle = styled(Handle)`
  background-color: ${props => props.theme.palette.primary.main};
`
const BaseNode = ({
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
  const Handler = handleComponent;
  const Handles = React.useMemo(
    () =>
      HandleTypes.map((type) =>
        HandlePosition.map((p) => (
          <Handler key={`${props.id}-${type}-${p}`} type={type} position={p} />
        )),
      ),
    [],
  );
  return (
    <Box position="relative" className="nopan selected selectable draggable">
      <Box>{children}</Box>
      <>{Handles}</>
    </Box>
  );
};

export { BaseNode };
