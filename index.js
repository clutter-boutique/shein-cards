import { getAssetFromKV } from "@cloudflare/kv-asset-handler";
import { endsWith } from 'lodash';
import SheinProduct from './lib/SheinProduct.js';

addEventListener('fetch', (event) => { event.respondWith(handleRequest(event)); });

async function handleRequest(event) {
    const request = event.request
    const requestURL = request.url.replaceAll('%3A', ":").replaceAll('%2F', '/')
    const requestPath = requestURL.replaceAll(/https:\/\/.*?\//gi, '')
    if (requestURL.endsWith('png')) return serveImage(requestURL)
    if (requestPath.startsWith('trello')) return serveTrello(event)
    if (requestPath.startsWith('productInfo')) return getProductInfo(requestURL)
    return new Response(`URL ${request.url} not found.`, { status: 404 });
}