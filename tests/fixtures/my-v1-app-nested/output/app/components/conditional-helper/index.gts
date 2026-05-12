import hello from 'docs-app/helpers/hello';

import type { TOC } from '@ember/component/template-only';

interface ConditionalHelperSignature {
  Args: {
    name?: string;
  };
}

<template><div>
  {{(if
    (not-eq @name undefined) (helper hello @name) "hello"
  )}}
</div></template>
