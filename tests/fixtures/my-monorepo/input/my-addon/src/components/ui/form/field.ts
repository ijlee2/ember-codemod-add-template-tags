import Component from '@glimmer/component';

import styles from './field.module.css';

interface UiFormFieldSignature {
  Args: {
    errorMessage?: string;
    isInline?: boolean;
    isWide?: boolean;
  };
  Blocks: {
    field: [
      {
        inputId: string;
      },
    ];
    label: [
      {
        inputId: string;
      },
    ];
  };
}

export default class UiFormField extends Component<UiFormFieldSignature> {
  styles = styles;
}
