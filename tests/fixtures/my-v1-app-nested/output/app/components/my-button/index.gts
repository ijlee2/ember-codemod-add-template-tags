import type { TOC } from '@ember/component/template-only';

interface MyButtonSignature {
  Args: {
    name?: string;
  };
}

<template><button type="button" {{(if @name (modifier "log-name" @name))}}>
  Some label
</button></template>
