export function formatPriceWithCommas(price: string) {
    const normalized = price.replace(/[^0-9.-]/g, "");
    const value = Number(normalized);

    if (Number.isNaN(value)) return price;

    return value.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
}

export function getDomainFromUrl(url: string) {
    try {
        const parsedUrl = new URL(url);
        return parsedUrl.hostname.replace('www.', '');
    } catch (error) {
        console.error('Invalid URL:', url);
        return '';
    }
}