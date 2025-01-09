# dost

A simple and efficient CLI tool for compressing and decompressing files using Brotli compression.

This project was built using [Bun](https://bun.sh), a fast all-in-one JavaScript runtime, ensuring quick startup times and efficient dependency management.

---

## Features

- **Compress Files**: Use Brotli compression for compact and efficient storage.
- **Decompress Files**: Restore compressed files to their original state.
- **Custom File Format**: Compressed files are saved with a `.dost` extension, preserving metadata such as the original file name.

---

## Requirements

- **Bun Runtime**: Version `1.1.42` or newer is recommended. Install Bun by following the instructions at [bun.sh](https://bun.sh).

---

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd dost
   ```

2. Install dependencies:
   ```bash
   bun install
   ```

---

## Usage

### 1. Compress a File

```bash
bun run index.js comp <file>
```

Example:

```bash
bun run index.js comp example.txt
```

- Compresses `example.txt` into `example.dost`.

---

### 2. Decompress a File

```bash
bun run index.js decomp <file>
```

Example:

```bash
bun run index.js decomp example.dost
```

- Decompresses `example.dost` and restores the original file.

---

## How It Works

### Compression

1. The file content is compressed using Brotli, with maximum compression settings (`quality: 11`, `window size: 22`).
2. Metadata (original file name) is stored alongside the compressed data in the `.dost` file.

### Decompression

1. The `.dost` file is parsed to extract metadata and the compressed content.
2. Brotli decompression is applied to restore the original file.

---

## Project Setup

This project was initialized with:

```bash
bun init
```

### Bun Advantages

- Lightning-fast installation and execution.
- Built-in TypeScript and JavaScript support.
- All-in-one tooling for modern JavaScript applications.

---

## Contribution

Contributions are welcome! If you encounter issues or have ideas for improvements, feel free to submit a pull request or open an issue.

---

## License

This project is licensed under the [MIT License](./LICENSE).

---

## Acknowledgments

- Built with 💙 using [Bun](https://bun.sh).
- Compression powered by Brotli from Node.js's `zlib` module.
