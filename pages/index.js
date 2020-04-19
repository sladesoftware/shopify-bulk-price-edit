import { Page } from "@shopify/polaris"
import { TitleBar } from "@shopify/app-bridge-react"
import store from "store-js"
import ProductList from "../components/ProductList"

const Index = () => {
  const products = store.get("product_group") || []

  return (
    <Page>
      <TitleBar
        title="Products"
        primaryAction={{
          content: products.length === 0 ? "0 products selected" : `Edit ${products.length} prices`,
          disabled: products.length === 0,
          onAction: () => console.log("TODO: Edit prices")
        }}
        secondaryActions={[
          {
            content: "Reset",
            disabled: products.length === 0,
            onAction: () => store.set("product_group", [])
          }
        ]}
      />

      <ProductList />
    </Page>
  )
}

export default Index
