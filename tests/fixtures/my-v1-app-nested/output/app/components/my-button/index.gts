import logName from 'docs-app/modifiers/log-name';

import type { TOC } from '@ember/component/template-only';

interface MyButtonSignature {
  Args: {
    name?: string;
  };
}

<template><button type="button" {{(if @name (modifier logName @name))}}>
  Some label
</button></template>
