import { ResourceList, Banner, Heading } from "@shopify/polaris"
import { useQuery } from "react-apollo"
import { gql } from "apollo-boost"
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
      />
    </>
  )
}

export default ProductList
