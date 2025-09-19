import { AST } from '@codemod-utils/ast-template';

import type { AllEntities, Entities } from '../../../types/index.js';
import type { ImportStatements } from '../import-statements.js';
import { getNewName } from './get-new-name.js';

type Data = {
  componentsDoubleColonized: Entities;
  entities: AllEntities;
};

export function updateTemplate(
  file: string,
  importStatements: ImportStatements,
  data: Data,
): string {
  const { componentsDoubleColonized, entities } = data;

  const traverse = AST.traverse();

  const ast = traverse(file, {
    ElementModifierStatement(node) {
      if (node.path.type !== 'PathExpression') {
        return;
      }

      const modifierName = node.path.original;
      const entityData = entities.modifiers.get(modifierName);

      if (!entityData) {
        return;
      }

      const newName = getNewName(modifierName, 'camelize');

      node.path.original = newName;
      importStatements.add(newName, entityData);
    },

    ElementNode(node) {
      const componentName = node.tag;
      const entityData = componentsDoubleColonized.get(componentName);

      if (!entityData) {
        return;
      }

      const newName = getNewName(componentName, 'remove-double-colons');

      node.tag = newName;
      importStatements.add(newName, entityData);
    },

    MustacheStatement(node) {
      if (node.path.type !== 'PathExpression') {
        return;
      }

      const helperName = node.path.original;

      if (helperName === 'component') {
        if (
          node.params.length !== 1 ||
          node.params[0]!.type !== 'StringLiteral'
        ) {
          return;
        }

        const componentName = node.params[0]!.original;
        const entityData = entities.components.get(componentName);

        if (!entityData) {
          return;
        }

        const newName = getNewName(componentName, 'pascalize');

        node.params[0] = AST.builders.path(newName);
        importStatements.add(newName, entityData);

        return;
      }

      const entityData = entities.helpers.get(helperName);

      if (!entityData) {
        return;
      }

      const newName = getNewName(helperName, 'camelize');

      node.path.original = newName;
      importStatements.add(newName, entityData);
    },

    SubExpression(node) {
      if (node.path.type !== 'PathExpression') {
        return;
      }

      const helperName = node.path.original;

      if (helperName === 'component') {
        if (
          node.params.length !== 1 ||
          node.params[0]!.type !== 'StringLiteral'
        ) {
          return;
        }

        const componentName = node.params[0]!.original;
        const entityData = entities.components.get(componentName);

        if (!entityData) {
          return;
        }

        const newName = getNewName(componentName, 'pascalize');

        node.params[0] = AST.builders.path(newName);
        importStatements.add(newName, entityData);

        return;
      }

      const entityData = entities.helpers.get(helperName);

      if (!entityData) {
        return;
      }

      const newName = getNewName(helperName, 'camelize');

      node.path.original = newName;
      importStatements.add(newName, entityData);
    },
  });

  return AST.print(ast);
}
