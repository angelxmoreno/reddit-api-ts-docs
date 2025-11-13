import { z } from 'zod';
import type { DocGroup } from '../doc.ts';
import { ListingSchema, TimePeriodEnum } from '../schemas.ts';

const ListingParamsSchema = z.object({
    limit: z.number().optional(),
    after: z.string().optional(),
    before: z.string().optional(),
    count: z.number().optional(),
    show: z.enum(['all']).optional(),
    t: TimePeriodEnum.optional(),
});

export const Listings: DocGroup = {
    name: 'listings',
    docs: [
        {
            description: 'View best posts based on Reddit algorithm.',
            method: 'GET',
            uri: '/best',
            requestSchema: ListingParamsSchema,
            responseSchema: ListingSchema(z.any()),
        },
        {
            description: 'Get items by their fullnames (comma-separated).',
            method: 'GET',
            uri: '/by_id/{names}',
            requestSchema: null,
            responseSchema: ListingSchema(z.any()),
        },
        {
            description: 'Retrieve comments for an article.',
            method: 'GET',
            uri: '/comments/{article}',
            requestSchema: ListingParamsSchema,
            responseSchema: ListingSchema(z.any()),
        },
        {
            description: 'View controversial posts.',
            method: 'GET',
            uri: '/controversial',
            requestSchema: ListingParamsSchema,
            responseSchema: ListingSchema(z.any()),
        },
        {
            description: 'Return a listing of posts which are duplicates of the specified article.',
            method: 'GET',
            uri: '/duplicates/{article}',
            requestSchema: ListingParamsSchema,
            responseSchema: ListingSchema(z.any()),
        },
        {
            description: 'View hot posts.',
            method: 'GET',
            uri: '/hot',
            requestSchema: ListingParamsSchema,
            responseSchema: ListingSchema(z.any()),
        },
        {
            description: 'View newest posts.',
            method: 'GET',
            uri: '/new',
            requestSchema: ListingParamsSchema,
            responseSchema: ListingSchema(z.any()),
        },
        {
            description: 'View rising posts.',
            method: 'GET',
            uri: '/rising',
            requestSchema: ListingParamsSchema,
            responseSchema: ListingSchema(z.any()),
        },
        {
            description: 'View top posts.',
            method: 'GET',
            uri: '/top',
            requestSchema: ListingParamsSchema,
            responseSchema: ListingSchema(z.any()),
        },
        {
            description: 'Generic sort endpoint for listings.',
            method: 'GET',
            uri: '/{sort}',
            requestSchema: ListingParamsSchema,
            responseSchema: ListingSchema(z.any()),
        },
    ],
};
