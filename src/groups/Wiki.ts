import { z } from 'zod';
import type { DocGroup } from '../doc.ts';
import { ListingSchema } from '../schemas.ts';

const WikiPageSchema = z.object({
    content_md: z.string(),
    content_html: z.string(),
    revision_by: z.object({
        name: z.string(),
        id: z.string(),
    }),
    revision_date: z.number(),
    may_revise: z.boolean(),
});

const WikiPageSettingsSchema = z.object({
    permlevel: z.number(),
    editors: z.array(z.string()),
    listed: z.boolean(),
});

export const Wiki: DocGroup = {
    name: 'wiki',
    docs: [
        {
            description: 'Add a wiki editor to a page.',
            method: 'POST',
            uri: '/api/wiki/alloweditor/add',
            requestSchema: z.object({
                page: z.string(),
                username: z.string(),
            }),
            responseSchema: z.object({ success: z.boolean() }),
        },
        {
            description: 'Remove a wiki editor from a page.',
            method: 'POST',
            uri: '/api/wiki/alloweditor/del',
            requestSchema: z.object({
                page: z.string(),
                username: z.string(),
            }),
            responseSchema: z.object({ success: z.boolean() }),
        },
        {
            description: 'Manage wiki page permissions.',
            method: 'POST',
            uri: '/api/wiki/alloweditor/{act}',
            requestSchema: z.object({
                page: z.string(),
                username: z.string(),
            }),
            responseSchema: z.object({ success: z.boolean() }),
        },
        {
            description: 'Edit a wiki page.',
            method: 'POST',
            uri: '/api/wiki/edit',
            requestSchema: z.object({
                page: z.string(),
                content: z.string(),
                reason: z.string().optional(),
                previous: z.string().optional(),
            }),
            responseSchema: z.object({ success: z.boolean() }),
        },
        {
            description: 'Hide a wiki page from the list.',
            method: 'POST',
            uri: '/api/wiki/hide',
            requestSchema: z.object({
                page: z.string(),
                revision: z.string(),
            }),
            responseSchema: z.object({ success: z.boolean() }),
        },
        {
            description: 'Revert a wiki page to a previous revision.',
            method: 'POST',
            uri: '/api/wiki/revert',
            requestSchema: z.object({
                page: z.string(),
                revision: z.string(),
            }),
            responseSchema: z.object({ success: z.boolean() }),
        },
        {
            description: 'Get discussions for a wiki page.',
            method: 'GET',
            uri: '/wiki/discussions/{page}',
            requestSchema: null,
            responseSchema: ListingSchema(z.any()),
        },
        {
            description: 'List all wiki pages in a subreddit.',
            method: 'GET',
            uri: '/wiki/pages',
            requestSchema: null,
            responseSchema: z.array(z.string()),
        },
        {
            description: 'View all wiki revisions.',
            method: 'GET',
            uri: '/wiki/revisions',
            requestSchema: null,
            responseSchema: ListingSchema(z.any()),
        },
        {
            description: 'View revisions for a specific wiki page.',
            method: 'GET',
            uri: '/wiki/revisions/{page}',
            requestSchema: null,
            responseSchema: ListingSchema(z.any()),
        },
        {
            description: 'Get settings for a wiki page.',
            method: 'GET',
            uri: '/wiki/settings/{page}',
            requestSchema: null,
            responseSchema: WikiPageSettingsSchema,
        },
        {
            description: 'View a wiki page.',
            method: 'GET',
            uri: '/wiki/{page}',
            requestSchema: null,
            responseSchema: WikiPageSchema,
        },
    ],
};
