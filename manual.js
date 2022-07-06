// At least this works *grumple*
import SheinProduct from './lib/SheinProduct.js';

async function serveTrello() {
    let productPage = "https%3A%2F%2Fus.shein.com%2FBuckled-Lace-Up-Contrast-Patent-Shapewear-p-9103322-cat-3837.html%0A"
    let product = new SheinProduct(productPage.replaceAll('%3A', ":").replaceAll('%2F', '/'))
    await product.loadFromUrl()
    return new Response(product.json, { headers: { 'Content-type': 'application/json' } })
}

let foo = await serveTrello()
console.log(serveTrello())