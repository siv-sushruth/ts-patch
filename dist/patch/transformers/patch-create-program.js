"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.patchCreateProgramTransformer = patchCreateProgramTransformer;
const typescript_1 = __importDefault(require("typescript"));
/* ****************************************************************************************************************** */
// region: Utils
/* ****************************************************************************************************************** */
function patchCreateProgramTransformer(context) {
    const { factory } = context;
    let patchSuccess = false;
    return (sourceFile) => {
        if (sourceFile.fileName !== 'src/compiler/program.ts')
            throw new Error('Wrong program file sent to transformer! This should be unreachable.');
        const res = factory.updateSourceFile(sourceFile, typescript_1.default.visitNodes(sourceFile.statements, visitNode));
        if (!patchSuccess)
            throw new Error('Failed to patch createProgram function!');
        return res;
        function visitNode(node) {
            if (typescript_1.default.isFunctionDeclaration(node) && node.name?.getText() === 'createProgram') {
                const originalCreateProgram = factory.updateFunctionDeclaration(node, node.modifiers, node.asteriskToken, factory.createIdentifier('originalCreateProgram'), node.typeParameters, node.parameters, node.type, node.body);
                // function createProgram() { return tsp.originalCreateProgram(...arguments); }
                const newCreateProgram = factory.createFunctionDeclaration(undefined, undefined, 'createProgram', undefined, [], undefined, factory.createBlock([
                    factory.createReturnStatement(factory.createCallExpression(factory.createPropertyAccessExpression(factory.createIdentifier('tsp'), factory.createIdentifier('createProgram')), undefined, [factory.createSpreadElement(factory.createIdentifier('arguments'))])),
                ]));
                patchSuccess = true;
                return [newCreateProgram, originalCreateProgram];
            }
            return node;
        }
    };
}
// endregion
//# sourceMappingURL=patch-create-program.js.map