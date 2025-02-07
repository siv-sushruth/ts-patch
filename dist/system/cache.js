"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCacheRoot = getCacheRoot;
exports.getCachePath = getCachePath;
exports.getLockFilePath = getLockFilePath;
const path_1 = __importDefault(require("path"));
const os = __importStar(require("os"));
const utils_1 = require("../utils");
const config_1 = require("../config");
const fs_1 = __importDefault(require("fs"));
/* ****************************************************************************************************************** */
// region: Locals
/* ****************************************************************************************************************** */
let cacheRoot;
let lockFileRoot;
// endregion
/* ****************************************************************************************************************** */
// region: Utils
/* ****************************************************************************************************************** */
function getCacheRoot() {
    if (!cacheRoot) {
        cacheRoot =
            process.env.TSP_CACHE_DIR ||
                (0, utils_1.findCacheDirectory)({ name: 'ts-patch', cwd: path_1.default.resolve(config_1.appRoot, '..') }) ||
                path_1.default.join(os.tmpdir(), 'ts-patch');
        if (!fs_1.default.existsSync(cacheRoot))
            fs_1.default.mkdirSync(cacheRoot, { recursive: true });
    }
    return cacheRoot;
}
function getCachePath(key, ...p) {
    return path_1.default.resolve(getCacheRoot(), key, ...p);
}
function getLockFilePath(key) {
    if (!lockFileRoot) {
        lockFileRoot = path_1.default.join(getCacheRoot(), config_1.lockFileDir);
        if (!fs_1.default.existsSync(lockFileRoot))
            fs_1.default.mkdirSync(lockFileRoot, { recursive: true });
    }
    return path_1.default.join(getCacheRoot(), config_1.lockFileDir, key);
}
// endregion
//# sourceMappingURL=cache.js.map