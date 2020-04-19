import { Modal, Form, TextContainer, TextField, FormLayout } from "@shopify/polaris"
import { useState } from "react"

const EditPricesModal = ({ open, onClose, products }) => {
  const [fixedPrice, setFixedPrice] = useState()

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Bulk edit prices"
      primaryAction={{
        content: "Set prices",
        disabled: fixedPrice === null || fixedPrice === undefined,
        onAction: () => console.log("TODO")
      }}
      secondaryActions={[
        { content: "Close", onAction: onClose }
      ]}
    >
      <Modal.Section>
        <TextContainer>
          <p>Specify a fixed price to set the price of all selected products to</p>
        </TextContainer>

        <Form>
          <FormLayout>
            <TextField
              label="Fixed price"
              type="number"
              prefix="£"
              value={fixedPrice}
              onChange={setFixedPrice}
              min={0}
              autoFocus
            />
          </FormLayout>
        </Form>
      </Modal.Section>
    </Modal>
  )
}

export default EditPricesModal
