import { ResourceList, Stack, TextStyle } from "@shopify/polaris"
import ProductImage from "./ProductImage"

const ProductListItem = ({ product }) => (
  <ResourceList.Item
    id={product.id}
    accessibilityLabel={`View details for ${product.title}`}
    media={<ProductImage product={product} />}
  >
    <Stack>
      <Stack.Item fill>
        <h3>
          <TextStyle variation="strong">
            {product.title}
          </TextStyle>
        </h3>
      </Stack.Item>

      <Stack.Item>
        <p>£{product.variants.edges[0].node.price}</p>
      </Stack.Item>
    </Stack>
  </ResourceList.Item>
)

export default ProductListItem
