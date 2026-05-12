import templateOnlyComponent from '@ember/component/template-only';

interface ConditionalModifierSignature {
  Args: {
    name?: string;
  };
}

export default templateOnlyComponent<ConditionalModifierSignature>();
