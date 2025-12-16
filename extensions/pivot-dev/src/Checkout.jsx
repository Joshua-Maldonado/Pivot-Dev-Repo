import '@shopify/ui-extensions/preact';
import {render} from "preact";
import {useAppMetafields} from "@shopify/ui-extensions/checkout/preact"


export default function() {
  render(<Extension />, document.body)
}

function Extension() {
  // Get the product ID from the cart line item
  const {merchandise: {product: {id: productId}}} = shopify.lines.value[0];
  console.log('Product ID:', productId);

  // Use the merchant-defined metafield for shipping delay instructions and map it to a cart line
  const [productMetafield] = useAppMetafields( {
    type: "product",
    namespace: "custom",
    key: "shipping_delay",
  }).filter(
    (entry) =>  productId.endsWith(entry.target.id)
  );
  console.log('Product Metafield:', productMetafield);
  // Render the shipping delay instructions if applicable
  if (productMetafield?.metafield?.value) {
    return (
        <s-text>
          {productMetafield?.metafield?.value}
        </s-text>
      );
  }
  else {
    return (
      <s-text>
          Ships in 3-5 business days
        </s-text>
    )
  }
  
  return null;
}