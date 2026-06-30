export function sanitizeProductImageUrl(url: string | null): string {
    if (!url) {
        return '/assets/no_image_available.jpg';
    }
    if (url.startsWith("//")) {
        return `https:${url}`;
    }
    return url;
}

