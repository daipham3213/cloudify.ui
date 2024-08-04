import { BaseNode } from "../node";
import { DesktopWindowsOutlined } from "@mui/icons-material";
import { Box, Paper, Typography } from "@mui/material";

const Server = ({ data, ...props }) => {
  return (
    <Box>
      <BaseNode sourceCounts={10} targetCounts={10} {...props}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
        >
          <Box
            component={Paper}
            p={0.5}
            width="fit-content"
            display="flex"
            justifyContent="space-between"
          >
            <DesktopWindowsOutlined color="primary" />
          </Box>
        </Box>
      </BaseNode>
      <Typography sx={{ fontSize: "8px" }} variant="caption">
        {data.name}
      </Typography>
    </Box>
  );
};

export { Server };
