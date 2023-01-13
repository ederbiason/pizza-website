import SanityClient from "@sanity/client";
import ImageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

export const client = SanityClient({
    projectId: process.env.SANITY_PROJECT_ID,
    dataset: 'production',
    apiVersion: "2023-01-13",
    useCdn: true,
    token: process.env.SANITY_TOKEN
})

const builder = ImageUrlBuilder(client) 

export const urlFor = (source: SanityImageSource) => builder.image(source)