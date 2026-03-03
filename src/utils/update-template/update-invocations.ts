import { EOL } from 'node:os';

import { AST } from '@codemod-utils/ast-template';
import { updateTemplates } from '@codemod-utils/ast-template-tag';
import {
  camelize,
  invertDoubleColonize,
  pascalize,
} from '@codemod-utils/ember';

import type { AllEntities } from '../../types/index.js';
import { ImportStatements } from './import-statements.js';

type Data = {
  entities: AllEntities;
};

function updateTemplate(
  file: string,
  importStatements: ImportStatements,
  data: Data,
): string {
  const { entities } = data;

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

      const newName = camelize(modifierName);

      node.path.original = newName;
      importStatements.add(newName, entityData);
    },

    ElementNode(node) {
      const componentName = node.tag;

      // Don't convert native <input> and <textarea> tags
      if (componentName === 'input' || componentName === 'textarea') {
        return;
      }

      const entityName = invertDoubleColonize(componentName);
      const entityData = entities.components.get(entityName);

      if (!entityData) {
        return;
      }

      const newName = pascalize(entityName);

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

        const newName = pascalize(componentName);

        node.params[0] = AST.builders.path(newName);
        importStatements.add(newName, entityData);

        return;
      }

      const entityData = entities.helpers.get(helperName);

      if (!entityData) {
        return;
      }

      const newName = camelize(helperName);

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

        const newName = pascalize(componentName);

        node.params[0] = AST.builders.path(newName);
        importStatements.add(newName, entityData);

        return;
      }

      const entityData = entities.helpers.get(helperName);

      if (!entityData) {
        return;
      }

      const newName = camelize(helperName);

      node.path.original = newName;
      importStatements.add(newName, entityData);
    },
  });

  return AST.print(ast);
}

export function updateInvocations(file: string, data: Data): string {
  const importStatements = new ImportStatements();

  file = updateTemplates(file, (code) => {
    return updateTemplate(code, importStatements, data);
  });

  if (importStatements.exist()) {
    file = [`${importStatements.print()}${EOL}`, file].join(EOL);
  }

  return file;
}
