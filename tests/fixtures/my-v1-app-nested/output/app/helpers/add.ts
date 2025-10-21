export default function add(...values: number[]): number {
  return values.reduce((accumulator, value) => accumulator + value, 0);
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    add: typeof add;
  }
}
