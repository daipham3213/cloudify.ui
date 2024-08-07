import React from "react";
import "@xyflow/react/dist/style.css";
import { Col, ConfigProvider, Row } from "antd";
import { ReactFlowProvider } from "@xyflow/react";

import { Graph } from "./views";
import { SidePanel } from "./components/sidepanel/index.jsx";

function App() {
  return (
    <ConfigProvider>
      <ReactFlowProvider>
        <Row style={{ minHeight: "100vh" }}>
          <Col span={4}>
            <SidePanel />
          </Col>
          <Col span={20}>
            <Graph />
          </Col>
        </Row>
      </ReactFlowProvider>
    </ConfigProvider>
  );
}

export default App;
