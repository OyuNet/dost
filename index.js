import fs from "fs";
import { brotliCompressSync, brotliDecompressSync, constants } from "zlib";
import { program } from "commander";

// Brotli compression settings (for maximum compression)
const BROTLI_OPTIONS = {
  [constants.BROTLI_PARAM_QUALITY]: 11, // Maximum quality (0-11)
  [constants.BROTLI_PARAM_LGWIN]: 22, // Window size (10-24)
};

/**
 * Compresses a file using Brotli and saves the compressed data along with metadata.
 * @param {string} filePath - The path to the file to compress.
 */
function compress(filePath) {
  const fileName = filePath.split("/").pop(); // Extract the file name
  const fileData = fs.readFileSync(filePath); // Read the file content
  const compressedData = brotliCompressSync(fileData, {
    params: BROTLI_OPTIONS,
  }); // Perform compression

  const metaData = JSON.stringify({ fileName });
  const combinedData = Buffer.concat([
    Buffer.from(metaData.length.toString().padStart(8, "0")), // Metadata length (8 bytes)
    Buffer.from(metaData), // Metadata
    compressedData, // Compressed content
  ]);

  const outputFileName = `${fileName.split(".")[0]}.dost`;
  fs.writeFileSync(outputFileName, combinedData);
  console.log(`Compression completed: ${outputFileName}`);
}

/**
 * Decompresses a `.dost` file, restores the original file content, and saves it.
 * @param {string} filePath - The path to the `.dost` file to decompress.
 */
function decompress(filePath) {
  const fileData = fs.readFileSync(filePath); // Read the compressed file

  // Extract the metadata length (first 8 bytes)
  const metaLength = parseInt(fileData.slice(0, 8).toString(), 10);

  // Parse the metadata
  const metaData = JSON.parse(fileData.slice(8, 8 + metaLength).toString());

  // Extract the compressed content
  const compressedData = fileData.slice(8 + metaLength);

  // Decompress the content
  const decompressedData = brotliDecompressSync(compressedData);

  // Save the decompressed content using the original file name
  fs.writeFileSync(metaData.fileName, decompressedData);
  console.log(`Decompression completed: ${metaData.fileName}`);
}

// Configure CLI commands
program.command("comp <file>").description("Compress a file").action(compress);

program
  .command("decomp <file>")
  .description("Decompress a file")
  .action(decompress);

program.parse();
