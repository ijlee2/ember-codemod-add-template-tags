import { AST } from '@codemod-utils/ast-template';

export function renameThis(file: string): string {
  const traverse = AST.traverse();

  const ast = traverse(file, {
    PathExpression(node) {
      if (!node.this) {
        return;
      }

      const newName = node.original.replace(/^this/, '@controller');

      return AST.builders.path(newName);
    },
  });

  return AST.print(ast);
}
