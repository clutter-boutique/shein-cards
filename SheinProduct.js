export default class SheinProduct {
    constructor(url) {
        this.url = url;
        this.data = {}
    }

    async loadFromUrl() {
        this.data = await fetch(this.url).then(async(r) => await r.text())
            .then((d) => {
                let raw = d.split('productIntroData: ')[1].split("\n")[0]

                return JSON.parse(this.fixProductJson(raw))
            })
        console.log(this.data)

    }

    get json() {
        return JSON.stringify({
            response: this.data,
            prices: this.prices,
            title: this.title,
            images: this.images,
            details: this.details,
            sizing: this.sizing

        })
    }

    get prices() {
        return this.data.detail.retailPrice.usdAmount
    }
    get title() {
        return this.data.metaInfo.meta_title.replace('| SHEIN USA', '')
    }
    get images() {
        return [
            this.data.goods_imgs.main_image.origin_image,
            ..._.map(this.data.goods_imgs.detail_image, (x) => x.origin_image)
        ]
    }

    get details() {
        let deets = {}
        for (let f of this.data.detail.productDetails) {
            deets[f.attr_name_en] = f.attr_value_en
        }
        return deets
    }

    get sizing() {
        console.log(this.data)
        return this.data.sizeInfoDes.sizeInfo.map(a => {
            console.log(this.data)
            let ret = { size: a.attr_value_name_en }
            for (let k in a) { if (!k.startsWith('attr')) ret[k] = a[k].trim() }
            return ret
        })
    }

    fixProductJson(rawString) {
        return rawString.replaceAll(/"SHEIN_KEY_.*?",/gi, "") //Useless and problematic copy
            .replaceAll(/\n|  /gi, "") //Whitespace
            .replaceAll(/\{(\d)\}/gi, "$1") //token replacement
            .replaceAll(/([a-z|0-9 ]+):\s*(\{|")/gi, '"$1":$2') // Quote Keys
            .replaceAll(/:\s?([0-9|a-z]+),/gi, ': "$1",') //Quote Numbers
            .replaceAll(/,$/gi, '') //Remove trailing comma
            .replaceAll('Waist Size ', "waist_size") //Fix waist size key
            .replaceAll("Length ", "length") // Fix length key
    }
}