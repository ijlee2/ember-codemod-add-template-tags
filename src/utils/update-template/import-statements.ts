import { join } from 'node:path';

import type { EntityData } from '../../types/index.js';

type ImportName = string;
type ImportObjects = Map<ImportName, { isDefaultImport: boolean }>;
type ImportPath = string;
type Imports = Map<ImportPath, ImportObjects>;

function getImportName(importObjects: ImportObjects): string {
  let defaultImport: string | undefined;
  const namedImports: string[] = [];

  for (const [name, { isDefaultImport }] of importObjects) {
    if (isDefaultImport) {
      defaultImport = name;
    } else {
      namedImports.push(name);
    }
  }

  let importName = '';

  if (defaultImport) {
    importName += defaultImport;

    if (namedImports.length > 0) {
      importName += `, `;
    }
  }

  if (namedImports.length > 0) {
    importName += `{ ${namedImports.sort().join(', ')} }`;
  }

  return importName;
}

export class ImportStatements {
  declare private imports: Imports;

  constructor() {
    this.imports = new Map();
  }

  add(importName: string, entityData: EntityData): void {
    const { filePathAlias, isDefaultExport, packageName } = entityData;

    const importPath = join(packageName, filePathAlias);
    const isDefaultImport = isDefaultExport;

    if (this.imports.has(importPath)) {
      const map = this.imports.get(importPath)!;

      map.set(importName, { isDefaultImport });

      return;
    }

    this.imports.set(importPath, new Map([[importName, { isDefaultImport }]]));
  }

  exist(): boolean {
    return this.imports.size > 0;
  }

  print(): string {
    const imports = new Map(Array.from(this.imports).sort());
    const lines: string[] = [];

    for (const [importPath, importObjects] of imports) {
      const importName = getImportName(importObjects);

      lines.push(`import ${importName} from '${importPath}';`);
    }

    return lines.join('\n');
  }
}
