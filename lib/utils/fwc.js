const chokidar = require("chokidar");
const path = require("path");
const fs = require("fs-extra");
const { logSuccess } = require("./logMessage");

class FWC {
  constructor({ cleanBeforeCopy = false }) {
    this.foldersPaths = [];
    this.watchers = [];
    this.cleanBeforeCopy = cleanBeforeCopy;
  }

  // Adds a new folder path with its source and destination directories
  add(source = "", destination = "", options = {}) {
    this.#_validateDir(source);
    this.#_validateDir(destination);

    if (this.#_isFolderAdded(source)) {
      throw new Error(`Source directory "${source}" is already added.`);
    }

    fs.ensureDirSync(source);
    fs.ensureDirSync(destination);

    const defaultFsOptions = {
      overwrite: true,
      errorOnExist: false,
      filter: () => true,
    };

    this.foldersPaths.push({
      source: path.join(process.cwd(), source),
      destination: path.join(process.cwd(), destination),
      options: { ...defaultFsOptions, ...options },
    });
  }

  // Private method to validate directory strings
  #_validateDir(dir) {
    if (typeof dir !== "string" || dir.trim() === "") {
      throw new Error("Directory paths must be non-empty strings.");
    }
  }

  // Checks if a folder with the given source is already added
  #_isFolderAdded(source) {
    return this.foldersPaths.some((folder) => folder.source === source);
  }

  // Copies all folders from source to destination
  async copy() {
    if (this.cleanBeforeCopy) {
      await this.clean();
    }

    await Promise.all(
      this.foldersPaths.map(({ source, destination, options }) =>
        fs
          .copy(source, destination, options)
          .catch((err) =>
            this.#_logError(
              `Error copying folder from ${source} to ${destination}`,
              err,
            ),
          ),
      ),
    );
    console.log("Folders copied successfully");
  }

  // Cleans all destination directories (empties them)
  async clean() {
    await Promise.all(
      this.foldersPaths.map(({ destination }) =>
        fs
          .emptyDir(destination)
          .catch((err) =>
            this.#_logError(`Error cleaning directory ${destination}`, err),
          ),
      ),
    );
    return "Directories cleaned successfully";
  }

  // Starts watching all source directories for changes
  watch() {
    this.foldersPaths.forEach(({ source, destination }) => {
      const watcher = chokidar.watch(source, {
        persistent: true,
        ignoreInitial: false,
        ignorePermissionErrors: false,
        followSymlinks: false,
      });

      // Event listeners for file and directory changes
      watcher
        .on("add", (filePath) =>
          this.#_handleAdd(filePath, source, destination),
        )
        .on("change", (filePath) =>
          this.#_handleChange(filePath, source, destination),
        )
        .on("unlink", (filePath) =>
          this.#_handleUnlink(filePath, source, destination),
        )
        .on("addDir", (dirPath) =>
          this.#_handleAddDir(dirPath, source, destination),
        )
        .on("unlinkDir", (dirPath) =>
          this.#_handleUnlinkDir(dirPath, source, destination),
        )
        .on("error", (error) =>
          this.#_logError(`Watcher error in ${source}`, error),
        );

      this.watchers.push({ source, destination, watcher });
    });
    logSuccess("ap-ssg watching ");
  }

  stop() {
    this.watchers.forEach(({ watcher, source }) => {
      if (watcher) {
        watcher.close();
        console.log(`Stopped watching directory: ${source}`);
      }
    });

    this.foldersPaths = [];
    this.watchers = [];
  }

  // Handles file addition or change events
  async #_handleAdd(filePath, sourceDir, targetDir) {
    await this.#_copyFile(filePath, sourceDir, targetDir);
  }

  // Handles directory addition events
  async #_handleAddDir(dirPath, sourceDir, targetDir) {
    const relativePath = path.relative(sourceDir, dirPath);
    const targetPath = path.join(targetDir, relativePath);

    try {
      await fs.ensureDir(targetPath);
    } catch (err) {
      this.#_logError(`Error creating directory ${targetPath}`, err);
    }
  }

  // Handles file change events
  async #_handleChange(filePath, sourceDir, targetDir) {
    await this.#_copyFile(filePath, sourceDir, targetDir);
  }

  // Handles file removal events
  async #_handleUnlink(filePath, sourceDir, targetDir) {
    const relativePath = path.relative(sourceDir, filePath);
    const targetPath = path.join(targetDir, relativePath);
    try {
      await fs.remove(targetPath);
    } catch (err) {
      this.#_logError(`Error removing file from ${targetPath}`, err);
    }
  }

  // Handles directory removal events
  async #_handleUnlinkDir(dirPath, sourceDir, targetDir) {
    const relativePath = path.relative(sourceDir, dirPath);
    const targetPath = path.join(targetDir, relativePath);

    try {
      await fs.remove(targetPath);
    } catch (err) {
      this.#_logError(`Error removing directory ${targetPath}`, err);
    }
  }

  // Copies a file from source to target directory
  async #_copyFile(filePath, sourceDir, targetDir) {
    const relativePath = path.relative(sourceDir, filePath);
    const targetPath = path.join(targetDir, relativePath);
    const targetDirPath = path.dirname(targetPath);

    await fs.ensureDir(targetDirPath);

    try {
      await fs.copy(filePath, targetPath, { overwrite: true });
    } catch (err) {
      this.#_logError(
        `Error copying file from ${filePath} to ${targetPath}`,
        err,
      );
    }
  }

  // Logs error messages
  #_logError(message, error) {
    console.error(message, error);
  }
}

module.exports = { FWC };
