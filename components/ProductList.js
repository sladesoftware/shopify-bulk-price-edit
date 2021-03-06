import { useState } from "react"
import { useQuery } from "react-apollo"
import { gql } from "apollo-boost"
import { ResourceList, Banner, Heading } from "@shopify/polaris"
import ProductListItem from "./ProductListItem"
import EditPricesModal from "./EditPricesModal"

const getFirstVariantIds = (products, selectedProductIds) =>
  products.map(product => product.node)
    .filter(product => selectedProductIds.includes(product.id))
    .map(product => product.variants.edges[0].node.id)

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
  const [selectedProducts, setSelectedProducts] = useState([])
  const [showEditModal, setShowEditModal] = useState(false)

  const { data, loading, error } = useQuery(GET_PRODUCTS)

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
        selectedItems={selectedProducts}
        onSelectionChange={setSelectedProducts}
        promotedBulkActions={[
          {
            content: `Edit ${selectedProducts.length} prices`,
            disabled: selectedProducts.length === 0,
            onAction: () => setShowEditModal(true)
          },
          {
            content: "Clear",
            disabled: selectedProducts.length === 0,
            onAction: () => setSelectedProducts([])
          }
        ]}
      />

      <EditPricesModal
        open={showEditModal}
        onClose={() => setShowEditModal(false)}
        products={getFirstVariantIds(data.products.edges, selectedProducts)}
      />
    </>
  )
}

export default ProductList
