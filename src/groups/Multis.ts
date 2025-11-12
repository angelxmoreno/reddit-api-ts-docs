import { z } from 'zod';
import type { DocGroup } from '../doc.ts';

const MultiSchema = z.object({
    name: z.string(),
    display_name: z.string(),
    description_md: z.string().optional(),
    subreddits: z.array(
        z.object({
            name: z.string(),
        })
    ),
    icon_url: z.string().optional(),
    key_color: z.string().optional(),
});

export const Multis: DocGroup = {
    name: 'multis',
    docs: [
        {
            description: 'Delete a custom feed filter.',
            method: 'DELETE',
            uri: '/api/filter/{filterpath}',
            requestSchema: null,
            responseSchema: z.object({ success: z.boolean() }),
        },
        {
            description: 'Remove a subreddit from a custom feed filter.',
            method: 'DELETE',
            uri: '/api/filter/{filterpath}/r/{srname}',
            requestSchema: null,
            responseSchema: z.object({ success: z.boolean() }),
        },
        {
            description: 'Duplicate a multi or custom feed.',
            method: 'POST',
            uri: '/api/multi/copy',
            requestSchema: z.object({
                from: z.string(),
                to: z.string(),
                display_name: z.string().optional(),
            }),
            responseSchema: MultiSchema,
        },
        {
            description: "List the authenticated user's custom feeds.",
            method: 'GET',
            uri: '/api/multi/mine',
            requestSchema: null,
            responseSchema: z.array(MultiSchema),
        },
        {
            description: "List a user's public custom feeds.",
            method: 'GET',
            uri: '/api/multi/user/{username}',
            requestSchema: null,
            responseSchema: z.array(MultiSchema),
        },
        {
            description: 'Delete a multi or custom feed.',
            method: 'DELETE',
            uri: '/api/multi/{multipath}',
            requestSchema: null,
            responseSchema: z.object({ success: z.boolean() }),
        },
        {
            description: 'Get the description of a multi or custom feed.',
            method: 'GET',
            uri: '/api/multi/{multipath}/description',
            requestSchema: null,
            responseSchema: z.object({
                body_md: z.string(),
                body_html: z.string(),
            }),
        },
        {
            description: 'Remove a subreddit from a multi or custom feed.',
            method: 'DELETE',
            uri: '/api/multi/{multipath}/r/{srname}',
            requestSchema: null,
            responseSchema: z.object({ success: z.boolean() }),
        },
    ],
};
