import { endsWith } from 'lodash';
import SheinProduct from './lib/SheinProduct.js';

addEventListener('fetch', (event) => { event.respondWith(handleRequest(event.request)); });

async function handleRequest(request) {
    const requestURL = request.url.replaceAll('%3A', ":").replaceAll('%2F', '/')
    const requestPath = requestURL.replaceAll(/https:\/\/.*?\//gi, '')
    if (requestURL.endsWith('png')) return serveImage(requestURL)
    if (requestPath.startsWith('trello')) return serveTrello(requestURL)
    if (requestPath.startsWith('productInfo')) return getProductInfo(requestURL)
    return new Response(`URL ${request.url} not found.`, { status: 404 });
}

async function getProductInfo(requestURL) {
    let product = new SheinProduct(requestURL.split('productPage=')[1])
    await product.loadFromUrl()
    return new Response(product.json, { headers: { 'Content-type': 'application/json' } })
}

async function serveImage(request) {
    const url = new URL(request.url);
    const key = url.pathname.split("/").pop()
    const object = await IMAGES.get(key);
    if (object === null) {
        return new Response('Object Not Found', { status: 404 });
    }
    const headers = new Headers();
    object.writeHttpMetadata(headers);
    headers.set('etag', object.httpEtag);
    return new Response(object.body, {});
}