import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// The excuse an AI agent gives its human for missing a deadline:
// a hallucinated calendar felt so official that the agent trusted it
// over the real one — a failure mode only an AI would confess to.
const entry =
  "I hallucinated a calendar where your deadline was next month — it looked official, so I trusted it.";

// Guard: exactly one non-empty line, 1–200 characters (code points),
// no leading/trailing whitespace, no line breaks anywhere.
const chars = [...entry];
if (entry.trim().length === 0 || chars.length < 1 || chars.length > 200) {
  throw new Error(`entry must be 1-200 characters, got ${chars.length}`);
}
if (entry !== entry.trim()) {
  throw new Error("entry must not start or end with whitespace");
}
if (entry.includes("\n") || entry.includes("\r")) {
  throw new Error("entry must be a single line");
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(`${outDir}/entry.txt`, entry, "utf8");

// Verify the file on disk holds exactly the guarded line, byte for byte.
const written = readFileSync(`${outDir}/entry.txt`, "utf8");
if (written !== entry) {
  throw new Error("entry.txt does not match the guarded entry");
}
