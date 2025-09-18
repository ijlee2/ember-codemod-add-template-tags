import { helper } from '@ember/component/helper';

const formatPrice = helper(([price]) => {
  return`$${price}`;
});

export default formatPrice;
