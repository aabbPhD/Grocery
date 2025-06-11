export default function getImageURL(name: string) {
    //для github-pages
    if (import.meta.env.PROD) {
        const basePath = import.meta.env.BASE_URL;
        return `${basePath}img/products/${name}`
    }
    //для localhost
    return new URL('../assets/img/products/' + name, import.meta.url).href;
}