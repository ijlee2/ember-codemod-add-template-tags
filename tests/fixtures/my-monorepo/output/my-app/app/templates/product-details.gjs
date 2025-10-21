import { LinkTo } from '@ember/routing';
import UiPage from 'my-addon/components/ui/page';
import ProductsProductDetails from 'my-app/components/products/product/details';

<template>
{{page-title @model.name}}

<UiPage @title={{t "routes.product-details.title"}}>
  <div class={{@controller.styles.products}}>
    <div class={{@controller.styles.product-details}}>
      <ProductsProductDetails @product={{@model}} />
    </div>

    <div class={{@controller.styles.actions}}>
      <LinkTo @route="products" data-test-link="Back">
        {{t "routes.product-details.back"}}
      </LinkTo>
    </div>
  </div>
</UiPage>
</template>
