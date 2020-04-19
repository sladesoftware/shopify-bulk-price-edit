import { useState, useEffect } from "react"
import { useQuery } from "react-apollo"
import { gql } from "apollo-boost"
import { ResourceList, Banner, Heading } from "@shopify/polaris"
import store from "store-js"
import ProductListItem from "./ProductListItem"

const GET_PRODUCTS = gql`
  query getProducts {
    products(first: 10) {
      edges {
        node {
          title
          handle
          descriptionHtml
          id
          images(first: 1) {
            edges {
              node {
                originalSrc
                altText
              }
            }
          }
          variants(first: 1) {
            edges {
              node {
                price
                id
              }
            }
          }
        }
      }
    }
  }
`

const ProductList = () => {
  const { data, loading, error } = useQuery(GET_PRODUCTS)
  const [selectedItems, setSelectedItems] = useState([])

  useEffect(() => {
    const existingProducts = store.get("product_group") || []
    setSelectedItems(existingProducts)
  }, [])

  if (loading) {
    return <p>Loading products...</p>
  }

  if (error) {
    return (
      <Banner status="critical">
        {error.message}
      </Banner>
    )
  }

  return (
    <>
      <Heading>
        Products
      </Heading>

      <ResourceList
        showHeader
        resourceName={{
          singular: "Product",
          plural: "Products"
        }}
        items={data.products.edges.map(product => product.node)}
        renderItem={product => <ProductListItem product={product} />}
        selectable
        selectedItems={selectedItems}
        onSelectionChange={items => setSelectedItems(items.map(item => item.id))}
        promotedBulkActions={[
          {
            content: "Add to group",
            disabled: selectedItems.length === 0,
            onAction: () => {
              const existingIds = store.get("product_group") || []
              const productIds = existingIds.concat(selectedItems)

              store.set("product_group", productIds)
            }
          }
        ]}
      />
    </>
  )
}

export default ProductList
