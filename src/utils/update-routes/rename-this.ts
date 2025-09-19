import { AST } from '@codemod-utils/ast-template';

export function renameThis(file: string): string {
  const traverse = AST.traverse();

  const ast = traverse(file, {
    // ...
  });

  return AST.print(ast);
}
