import React from "react";
import "@xyflow/react/dist/style.css";

import { ReactFlowProvider } from "@xyflow/react";
import { Graph } from "./views";

function App() {
  return (
    <ReactFlowProvider>
      <Graph />
    </ReactFlowProvider>
  );
}

export default App;
