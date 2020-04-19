import { Avatar } from "@shopify/polaris"

const ProductImage = ({ product }) => {
  const images = product.images.edges || []
  const imageSource = images.length === 0 ? null : images[0].node.originalSrc

  return (
    <Avatar
      customer
      size="medium"
      name={product.title}
      source={imageSource}
    />
  )
}

export default ProductImage
