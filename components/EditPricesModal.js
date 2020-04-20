import { Modal, Form, TextContainer, TextField, FormLayout, Card, TextStyle } from "@shopify/polaris"
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
        <Form>
          <FormLayout>
            <TextContainer spacing="tight">
              <p>
                Specify a
                <TextStyle variation="strong">
                  &nbsp;fixed price&nbsp;
                </TextStyle>
                to be applied to all selected products
              </p>
            </TextContainer>

            <TextField
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
