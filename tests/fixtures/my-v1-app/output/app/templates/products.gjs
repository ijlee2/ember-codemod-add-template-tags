import { array, hash } from '@ember/helper';
import ProductsProductCard from 'docs-app/components/products/product/card';
import UiFormInput from 'docs-app/components/ui/form/input';
import UiPage from 'docs-app/components/ui/page';
<template>
{{page-title "Products"}}

<UiPage @title="Products">
  <div
    class={{local
      this.styles
      (if
        this.isPartOfNestProductDetailsExperiment
        (array "shared-layout" "products-with-details")
        (array "shared-layout" "products")
      )
      "sticky-container"
    }}
  >
    <div class={{this.styles.filters}}>
      <div class={{this.styles.filter}}>
        <UiFormInput
          @changeset={{hash name=this.name}}
          @key="name"
          @label="Filter by"
          @onUpdate={{this.updateQueryParameters}}
          @placeholder="Cake, pasta, etc."
        />
      </div>
    </div>

    <div class={{this.styles.list}}>
      {{#each this.filteredProducts as |product|}}
        <ProductsProductCard @product={{product}} />
      {{else}}
        <p>
          No products found.
        </p>
      {{/each}}
    </div>

    <div class={{this.styles.product-details}}>
      {{outlet}}
    </div>
  </div>
</UiPage>
</template>
