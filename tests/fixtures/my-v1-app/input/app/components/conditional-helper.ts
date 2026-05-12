import templateOnlyComponent from '@ember/component/template-only';

interface ConditionalHelperSignature {
  Args: {
    name?: string;
  };
}

export default templateOnlyComponent<ConditionalHelperSignature>();
