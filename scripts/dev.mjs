import { spawn } from "node:child_process";

const isWindows = process.platform === "win32";
const npmCommand = isWindows ? "npm.cmd" : "npm";
const children = [
  spawn("node", ["server.js"], {
    env: { ...process.env, PORT: process.env.PORT || "3001" },
    stdio: "inherit",
  }),
  spawn(npmCommand, ["run", "dev:vite"], {
    stdio: "inherit",
  }),
];

function shutdown(signal) {
  for (const child of children) {
    child.kill(signal);
  }
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

for (const child of children) {
  child.on("exit", (code) => {
    if (code && code !== 0) {
      shutdown("SIGTERM");
      process.exit(code);
    }
  });
}
