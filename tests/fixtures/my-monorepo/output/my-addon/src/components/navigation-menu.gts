import { LinkTo } from '@ember/routing';

import type { TOC } from '@ember/component/template-only';

type MenuItem = {
  label: string;
  route: string;
};

interface NavigationMenuSignature {
  Args: {
    menuItems: MenuItem[];
    name?: string;
  };
}

<template><nav aria-label={{@name}} data-test-nav={{@name}}>
  <ul class="navigation-menu-list">
    {{#each @menuItems as |menuItem|}}
      <li>
        <LinkTo
          @route={{menuItem.route}}
          class="navigation-menu-link"
          data-test-link={{menuItem.label}}
        >
          {{menuItem.label}}
        </LinkTo>
      </li>
    {{/each}}
  </ul>
</nav></template>
