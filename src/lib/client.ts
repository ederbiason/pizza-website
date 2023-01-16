import SanityClient from "@sanity/client";
import ImageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

const sanityProjectId = process.env.SANITY_STUDIO_PROJECT_ID

export const client = SanityClient({
    projectId: '3obrfqir',
    dataset: 'production',
    apiVersion: "2023-01-13",
    useCdn: true,
    token: process.env.SANITY_STUDIO_TOKEN
})

const builder = ImageUrlBuilder(client) 

export const urlFor = (source: SanityImageSource) => builder.image(source)