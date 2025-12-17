import '@shopify/ui-extensions/preact';
import {render} from "preact";
import {useAppMetafields,useCartLineTarget} from "@shopify/ui-extensions/checkout/preact"


export default function() {
  render(<Extension />, document.body)
}

function Extension() {
  // Get the product ID from the cart line item
  const target = useCartLineTarget();
  const {merchandise: {product: {id: productId}}} = target;
  
 

  // Use the merchant-defined metafield for shipping delay instructions and map it to a cart line
  const [productMetafield] = useAppMetafields( {
    type: "product",
    namespace: "custom",
    key: "shipping_delay",
  }).filter(
    (entry) =>  productId.endsWith(entry.target.id)
  );

 
  // Render the shipping delay instructions if applicable
  if (productMetafield?.metafield?.value) {
    return (
        <s-text tone="warning">
          {productMetafield?.metafield?.value}
        </s-text>
      );
  }
  
  return null;
}


