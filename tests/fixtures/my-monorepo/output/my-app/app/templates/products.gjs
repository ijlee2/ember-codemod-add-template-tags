import { hash } from '@ember/helper';
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
      @controller.styles.products-with-details
      @controller.styles.products
    }}
  >
    <div class={{@controller.styles.filters}}>
      <div class={{@controller.styles.filter}}>
        <UiFormInput
          @data={{hash name=@controller.name}}
          @key="name"
          @label={{t "routes.products.filter-by.name.label"}}
          @onUpdate={{perform @controller.updateQueryParameters}}
          @placeholder={{t "routes.products.filter-by.name.placeholder"}}
        />
      </div>

      <div class={{@controller.styles.filter}}>
        <UiFormSelect
          @data={{hash sortBy=@controller.sortBy}}
          @key="sortBy"
          @label={{t "routes.products.sort-by.label"}}
          @onUpdate={{perform @controller.updateQueryParameters}}
          @options={{@controller.options}}
        />
      </div>
    </div>

    <div class={{@controller.styles.list}}>
      {{#each
        (sort-by (if @controller.sortBy @controller.sortBy "") @model)
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

    <div class={{@controller.styles.product-details}}>
      {{outlet}}
    </div>
  </div>
</UiPage>
</template>
