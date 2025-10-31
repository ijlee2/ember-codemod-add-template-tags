import { LinkTo } from '@ember/routing';

import Component from '@glimmer/component';

import styles from './navigation-menu.css';

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

export default class NavigationMenu extends Component<NavigationMenuSignature> {
  styles = styles;


  <template>
  <nav aria-label={{@name}} data-test-nav={{@name}}>
  <ul class={{this.styles.list}}>
  {{#each @menuItems as |menuItem|}}
    <li>
      <LinkTo
        @route={{menuItem.route}}
        class={{local this.styles "link"}}
        data-test-link={{menuItem.label}}
      >
        {{menuItem.label}}
      </LinkTo>
    </li>
  {{/each}}
  </ul>
  </nav>
  </template>
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    NavigationMenu: typeof NavigationMenu;
    'navigation-menu': typeof NavigationMenu;
  }
}
