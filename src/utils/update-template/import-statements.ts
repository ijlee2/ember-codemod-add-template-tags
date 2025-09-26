import { join } from 'node:path';

import type { EntityData } from '../../types/index.js';

type ImportPath = string;
type ImportName = string;
type Imports = Map<ImportPath, Map<ImportName, { isDefaultImport: boolean }>>;

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

      if (map.has(importName)) {
        return;
      }

      map.set(importName, { isDefaultImport });
    } else {
      this.imports.set(
        importPath,
        new Map([[importName, { isDefaultImport }]]),
      );
    }
  }

  exist(): boolean {
    return this.imports.size > 0;
  }

  print(): string {
    const imports = new Map(Array.from(this.imports).sort());
    const lines: string[] = [];

    for (const [importPath, importObjects] of imports) {
      const defaultImports: string[] = [];
      const namedImports: string[] = [];

      for (const [name, { isDefaultImport }] of importObjects) {
        if (isDefaultImport) {
          defaultImports.push(name);
        } else {
          namedImports.push(name);
        }
      }

      namedImports.sort().join(', ');

      let line = 'import ';

      if (defaultImports.length > 0) {
        line += defaultImports[0];

        if (namedImports.length > 0) {
          line += `, `;
        }
      }

      if (namedImports.length > 0) {
        line += `{ ${namedImports.sort().join(', ')} }`;
      }

      line += ` from '${importPath}';`;

      lines.push(line);
    }

    return lines.join('\n');
  }
}
