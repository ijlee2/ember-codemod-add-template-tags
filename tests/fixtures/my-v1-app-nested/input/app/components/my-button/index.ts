import templateOnlyComponent from '@ember/component/template-only';

interface MyButtonSignature {
  Args: {
    name?: string;
  };
}

export default templateOnlyComponent<MyButtonSignature>();
