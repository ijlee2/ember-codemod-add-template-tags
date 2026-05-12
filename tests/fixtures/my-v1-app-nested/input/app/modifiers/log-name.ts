import { modifier } from 'ember-modifier';

interface LogNameSignature {
  Args: {
    Positional: [string];
  };
  Element: Element;
}

export default modifier<LogNameSignature>(
  function logMessage(element, positional) {
    const name = positional[0];

    console.log('log-name: ' + name);
  },
);
