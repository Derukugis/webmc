// Generated by CoffeeScript 2.5.1
var CellTerrain,
  modulo = function(a, b) { return (+a % (b = +b) + b) % b; };

import {
  Block
} from './../build/Block.js';

CellTerrain = class CellTerrain {
  constructor(options) {
    this.cellSize = options.cellSize;
    this.cells = {};
    this.loadedBlocks = {};
  }

  vec3(x, y, z) {
    x = parseInt(x);
    y = parseInt(y);
    z = parseInt(z);
    return `${x}:${y}:${z}`;
  }

  computeVoxelOffset(voxelX, voxelY, voxelZ) {
    var x, y, z;
    x = modulo(voxelX, this.cellSize) | 0;
    y = modulo(voxelY, this.cellSize) | 0;
    z = modulo(voxelZ, this.cellSize) | 0;
    return y * this.cellSize * this.cellSize + z * this.cellSize + x;
  }

  computeCellForVoxel(voxelX, voxelY, voxelZ) {
    var cellX, cellY, cellZ;
    cellX = Math.floor(voxelX / this.cellSize);
    cellY = Math.floor(voxelY / this.cellSize);
    cellZ = Math.floor(voxelZ / this.cellSize);
    return [cellX, cellY, cellZ];
  }

  addCellForVoxel(voxelX, voxelY, voxelZ) {
    var cell, cellId;
    cellId = this.vec3(...this.computeCellForVoxel(voxelX, voxelY, voxelZ));
    cell = this.cells[cellId];
    if (!cell) {
      cell = new Uint32Array(this.cellSize * this.cellSize * this.cellSize);
      this.cells[cellId] = cell;
    }
    return cell;
  }

  getCellForVoxel(voxelX, voxelY, voxelZ) {
    var cellId;
    cellId = this.vec3(...this.computeCellForVoxel(voxelX, voxelY, voxelZ));
    return this.cells[cellId];
  }

  setVoxel(voxelX, voxelY, voxelZ, value) {
    var cell, voff;
    cell = this.getCellForVoxel(voxelX, voxelY, voxelZ);
    if (!cell) {
      cell = this.addCellForVoxel(voxelX, voxelY, voxelZ);
    }
    voff = this.computeVoxelOffset(voxelX, voxelY, voxelZ);
    cell[voff] = value;
  }

  getVoxel(voxelX, voxelY, voxelZ) {
    var cell, voff;
    cell = this.getCellForVoxel(voxelX, voxelY, voxelZ);
    if (!cell) {
      return 0;
    }
    voff = this.computeVoxelOffset(voxelX, voxelY, voxelZ);
    return cell[voff];
  }

  getCell(cellX, cellY, cellZ) {
    return this.cells[this.vec3(x, y, z)];
  }

  setCell(cellX, cellY, cellZ, buffer) {
    return this.cells[this.vec3(cellX, cellY, cellZ)] = buffer;
  }

  getBlock(blockX, blockY, blockZ) {
    if (this.loadedBlocks[this.getVoxel(blockX, blockY, blockZ)] === void 0) {
      this.loadedBlocks[this.getVoxel(blockX, blockY, blockZ)] = new Block.fromStateId(this.getVoxel(blockX, blockY, blockZ));
    }
    return this.loadedBlocks[this.getVoxel(blockX, blockY, blockZ)];
  }

};

export {
  CellTerrain
};
