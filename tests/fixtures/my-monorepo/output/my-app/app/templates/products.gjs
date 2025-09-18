import { hash } from '@ember/helper';
import { t } from 'ember-intl';
import UiFormInput from 'my-addon/components/ui/form/input';
import UiFormSelect from 'my-addon/components/ui/form/select';
import UiPage from 'my-addon/components/ui/page';
import ProductsProductCard from 'my-app/components/products/product/card';
import experiment from 'my-app/helpers/experiment';
<template>
{{page-title (t "routes.products.title")}}

<UiPage @title={{t "routes.products.title"}}>
  <div
    class={{if
      (experiment name="nest-product-details" variant="v1")
      this.styles.products-with-details
      this.styles.products
    }}
  >
    <div class={{this.styles.filters}}>
      <div class={{this.styles.filter}}>
        <UiFormInput
          @data={{hash name=this.name}}
          @key="name"
          @label={{t "routes.products.filter-by.name.label"}}
          @onUpdate={{perform this.updateQueryParameters}}
          @placeholder={{t "routes.products.filter-by.name.placeholder"}}
        />
      </div>

      <div class={{this.styles.filter}}>
        <UiFormSelect
          @data={{hash sortBy=this.sortBy}}
          @key="sortBy"
          @label={{t "routes.products.sort-by.label"}}
          @onUpdate={{perform this.updateQueryParameters}}
          @options={{this.options}}
        />
      </div>
    </div>

    <div class={{this.styles.list}}>
      {{#each
        (sortBy (if this.sortBy this.sortBy "") @model)
        as |product|
      }}
        <div>
          <ProductsProductCard
            @product={{product}}
            @redirectTo={{if
              (experiment name="nest-product-details" variant="v1")
              "products.product"
              "product-details"
            }}
          />
        </div>
      {{else}}
        <p>
          {{t "routes.products.no-products-found"}}
        </p>
      {{/each}}
    </div>

    <div class={{this.styles.product-details}}>
      {{outlet}}
    </div>
  </div>
</UiPage>
</template>
