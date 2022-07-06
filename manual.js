// At least this works *grumple*
import SheinProduct from './lib/SheinProduct.js';

async function serveTrello() {
    let productPage = "https://us.shein.com/Buckled-Lace-Up-Contrast-Patent-Shapewear-p-9103322-cat-3837.html"
    let product = new SheinProduct(productPage)
    await product.loadFromUrl()
    return new Response(product.json, { headers: { 'Content-type': 'application/json' } })
}

let foo = await serveTrello()
console.log(serveTrello())