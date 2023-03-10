export class MetaData {
    title?: string = '';
    description?: string = ``;
    image?: string = `${process.env.NEXT_PUBLIC_CLIENT_URL}/assets/site-preview.png`;
    type?: string = 'website';
    structuredData?: string = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Website",
        "url": `${process.env.NEXT_PUBLIC_CLIENT_URL}`,
        "name": "",
        "description": "",
        "publisher": {
            "@type": "Organization",
            "name": "",
            "logo": {
                "@type": "ImageObject",
                "url": "" // complete url
            }
        },
        "potentialAction": {
            "@type": "SearchAction",
            "target": `${process.env.NEXT_PUBLIC_CLIENT_URL}/search?q={search_term_string}`,
            "query-input": "required name=search_term_string"
        }
    });
    constructor(partial: Partial<MetaData>) {
        Object.assign(this, partial);
    }
}