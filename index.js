import SheinProduct from '../SheinProduct.js';
addEventListener('fetch', (event) => { return event.respondWith(handleRequest(event.request)); });


async function handleRequest(request) {
    if (request.url.endsWith('png')) return serveImage(request)
    if (request.url.pathname.startsWith('/trello')) return serveTrello(request)
    if (request.url.pathname.startsWith('/productInfo')) return getProductInfo(request)
    return new Response(`URL ${request.url} not found.`, { status: 404 });
}

async function serveTrello(request) {
    let productPage = url.searchParams.get('productPage')
    let product = new SheinProduct(productPage)
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

function assembleData(raw) {
    let data = JSON.parse(fixProductJson(raw))
    return {
        title: data.metaInfo.meta_title.replace('| SHEIN USA', ''),
        price: data.detail.retailPrice.usdAmount,
        sizes: getSizeInfo(data),
        details: getProductDetails(data),
        images: getImages(data)
    }

}