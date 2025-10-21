export default function formatPrice(price: number): string {
  return `$${price}`;
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'format-price': typeof formatPrice;
  }
}
