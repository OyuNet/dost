import { test, expect } from "bun:test";
import fs from "fs";
import { compress, decompress } from "./index.js"; // Adjust the path as needed

// Test Helpers
const createTestFile = (fileName, content) => {
  fs.writeFileSync(fileName, content, "utf8");
};

const deleteFile = (fileName) => {
  if (fs.existsSync(fileName)) {
    fs.unlinkSync(fileName);
  }
};

// Test Cases
test("Compress and Decompress a file", () => {
  const inputFileName = "test-input.txt";
  const compressedFileName = "test-input.dost";
  const fileContent = "This is a test file content.";

  // Create a test input file
  createTestFile(inputFileName, fileContent);

  // Test compress
  compress(inputFileName);
  expect(fs.existsSync(compressedFileName)).toBe(true);

  // Test decompress
  decompress(compressedFileName);
  expect(fs.existsSync(inputFileName)).toBe(true);

  // Verify the content matches
  const decompressedContent = fs.readFileSync(inputFileName, "utf8");
  expect(decompressedContent).toBe(fileContent);

  // Clean up
  deleteFile(inputFileName);
  deleteFile(compressedFileName);
});

test("Decompress should restore metadata correctly", () => {
  const inputFileName = "test-meta.txt";
  const compressedFileName = "test-meta.dost";
  const fileContent = "Testing metadata restoration.";

  // Create a test input file
  createTestFile(inputFileName, fileContent);

  // Compress the file
  compress(inputFileName);

  // Verify metadata (original file name)
  const compressedFileData = fs.readFileSync(compressedFileName);
  const metaLength = parseInt(compressedFileData.slice(0, 8).toString(), 10);
  const metadata = JSON.parse(
    compressedFileData.slice(8, 8 + metaLength).toString(),
  );
  expect(metadata.fileName).toBe(inputFileName);

  // Clean up
  deleteFile(inputFileName);
  deleteFile(compressedFileName);
});
