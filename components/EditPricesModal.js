import { useState } from "react"
import { useMutation } from "react-apollo"
import { gql } from "apollo-boost"
import {
  Banner,
  Form,
  FormLayout,
  Modal,
  TextField,
  TextStyle
} from "@shopify/polaris"

const UPDATE_PRODUCT = gql`
  mutation updateProduct($input: ProductVariantInput!) {
    productVariantUpdate(input: $input) {
      userErrors {
        field
        message
      }
      product {
        id
      }
      productVariant {
        id
      }
    }
  }
`

const EditPricesModal = ({ open, onClose, products }) => {
  const [showSuccess, setShowSuccess] = useState(false)
  const [showError, setShowError] = useState(false)
  const [fixedPrice, setFixedPrice] = useState()

  const [ updateProduct, { loading, error } ] = useMutation(UPDATE_PRODUCT, {
    onCompleted() {
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 2000)
    },
    onError: () => setShowError(true)
  })

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Bulk edit prices"
      primaryAction={{
        content: "Set prices",
        disabled: fixedPrice === null || fixedPrice === undefined || loading,
        onAction: () => updateProduct({
          variables: {
            input: {
              id: products[0],
              price: fixedPrice
            }
          }
        })
      }}
      secondaryActions={[
        { content: "Close", onAction: onClose, disabled: loading }
      ]}
    >
      <Modal.Section>
        {showSuccess && (
          <Banner status="success" onDismiss={() => setShowSuccess(false)}>
            {`Successfully updated ${products.length} products`}
          </Banner>
        )}

        {!!error && showError && (
          <Banner status="critical" onDismiss={() => setShowError(false)}>
            {error.message}
          </Banner>
        )}

        <Banner status="info">
          Note that all price changes will currently only be applied to the first
          variant of the selected products
        </Banner>

        <Form>
          <FormLayout>
            <p>
              Specify a
              <TextStyle variation="strong">
              &nbsp;fixed price&nbsp;
              </TextStyle>
              to be applied to all selected products
            </p>

            <TextField
              type="number"
              prefix="£"
              value={fixedPrice}
              onChange={setFixedPrice}
              min={0}
              disabled={loading}
              autoFocus
            />
          </FormLayout>
        </Form>
      </Modal.Section>
    </Modal>
  )
}

export default EditPricesModal
