import { z } from 'zod';
import type { DocGroup } from '../doc.ts';
import { ListingSchema, TimePeriodEnum } from '../schemas.ts';

const SearchParamsSchema = z.object({
    q: z.string(),
    sort: z.enum(['relevance', 'hot', 'top', 'new', 'comments']).optional(),
    t: TimePeriodEnum.optional(),
    type: z.enum(['link', 'sr', 'user']).optional(),
    restrict_sr: z.boolean().optional(),
    limit: z.number().optional(),
    after: z.string().optional(),
    before: z.string().optional(),
});

export const Search: DocGroup = {
    name: 'search',
    docs: [
        {
            description: 'Search posts and comments across Reddit.',
            method: 'GET',
            uri: '/search',
            requestSchema: SearchParamsSchema,
            responseSchema: ListingSchema(z.any()),
        },
    ],
};
