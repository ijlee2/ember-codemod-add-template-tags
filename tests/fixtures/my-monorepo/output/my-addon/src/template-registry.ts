import type { ComponentLike } from '@glint/template';

import type NavigationMenuComponent from './components/navigation-menu.ts';
import type UiFormComponent from './components/ui/form.ts';
import type UiFormCheckboxComponent from './components/ui/form/checkbox.ts';
import type UiFormFieldComponent from './components/ui/form/field.ts';
import type UiFormInformationComponent from './components/ui/form/information.ts';
import type UiFormNumberComponent from './components/ui/form/number.gts';
import type UiFormSelectComponent from './components/ui/form/select.ts';
import type AutofocusModifier from './modifiers/autofocus.ts';

export default interface MyAddonRegistry {
  NavigationMenu: typeof NavigationMenuComponent;
  'Ui::Form': typeof UiFormComponent;
  'Ui::Form::Checkbox': typeof UiFormCheckboxComponent;
  'Ui::Form::Field': typeof UiFormFieldComponent;
  'Ui::Form::Information': typeof UiFormInformationComponent;
  'Ui::Form::Input': ComponentLike;
  'Ui::Form::Number': typeof UiFormNumberComponent;
  'Ui::Form::Select': typeof UiFormSelectComponent;
  'Ui::Form::Textarea': ComponentLike;
  'Ui::Page': ComponentLike;
  autofocus: typeof AutofocusModifier;
  'navigation-menu': typeof NavigationMenuComponent;
  'ui/form': typeof UiFormComponent;
  'ui/form/checkbox': typeof UiFormCheckboxComponent;
  'ui/form/field': typeof UiFormFieldComponent;
  'ui/form/information': typeof UiFormInformationComponent;
  'ui/form/input': ComponentLike;
  'ui/form/number': typeof UiFormNumberComponent;
  'ui/form/select': typeof UiFormSelectComponent;
  'ui/form/textarea': ComponentLike;
  'ui/page': ComponentLike;
}
