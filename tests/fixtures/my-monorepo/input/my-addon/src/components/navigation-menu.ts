import { templateOnlyComponent as toc } from '@ember/component/template-only';

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

export default toc<NavigationMenuSignature>();
