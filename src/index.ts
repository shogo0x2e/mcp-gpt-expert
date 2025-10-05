#!/usr/bin/env node

/**
 * MCP GPT Expert Server
 * Entry point for the MCP server
 */

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

console.log("MCP GPT Expert Server starting...");

// Placeholder - actual implementation will be added in later issues
const server = new Server(
  {
    name: "mcp-gpt-expert",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.log("MCP GPT Expert Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
