import { z } from 'zod';
import type { DocGroup } from '../doc.ts';
import { ListingSchema } from '../schemas.ts';

const LiveThreadSchema = z.object({
    id: z.string(),
    title: z.string(),
    description: z.string().optional(),
    resources: z.string().optional(),
    state: z.string(),
    viewer_count: z.number().optional(),
    created_utc: z.number(),
    nsfw: z.boolean().optional(),
});

const LiveUpdateSchema = z.object({
    id: z.string(),
    author: z.string(),
    body: z.string(),
    created_utc: z.number(),
    stricken: z.boolean().optional(),
});

export const LiveThreads: DocGroup = {
    name: 'live_threads',
    docs: [
        {
            description: 'Get live threads by their fullnames.',
            method: 'GET',
            uri: '/api/live/by_id/{names}',
            requestSchema: null,
            responseSchema: z.array(LiveThreadSchema),
        },
        {
            description: 'Create a new live thread.',
            method: 'POST',
            uri: '/api/live/create',
            requestSchema: z.object({
                title: z.string(),
                description: z.string().optional(),
                resources: z.string().optional(),
                nsfw: z.boolean().optional(),
            }),
            responseSchema: LiveThreadSchema,
        },
        {
            description: 'Get the currently active/happening live thread.',
            method: 'GET',
            uri: '/api/live/happening_now',
            requestSchema: null,
            responseSchema: LiveThreadSchema.optional(),
        },
        {
            description: 'Accept an invitation to contribute to a live thread.',
            method: 'POST',
            uri: '/api/live/{thread}/accept_contributor_invite',
            requestSchema: null,
            responseSchema: z.object({ success: z.boolean() }),
        },
        {
            description: 'Close a live thread permanently.',
            method: 'POST',
            uri: '/api/live/{thread}/close_thread',
            requestSchema: null,
            responseSchema: z.object({ success: z.boolean() }),
        },
        {
            description: 'Delete an update from a live thread.',
            method: 'POST',
            uri: '/api/live/{thread}/delete_update',
            requestSchema: z.object({
                id: z.string(),
            }),
            responseSchema: z.object({ success: z.boolean() }),
        },
        {
            description: 'Edit the settings of a live thread.',
            method: 'POST',
            uri: '/api/live/{thread}/edit',
            requestSchema: z.object({
                title: z.string().optional(),
                description: z.string().optional(),
                resources: z.string().optional(),
                nsfw: z.boolean().optional(),
            }),
            responseSchema: z.object({ success: z.boolean() }),
        },
        {
            description: 'Hide the associated discussion link for a live thread.',
            method: 'POST',
            uri: '/api/live/{thread}/hide_discussion',
            requestSchema: null,
            responseSchema: z.object({ success: z.boolean() }),
        },
        {
            description: 'Invite a user to contribute to a live thread.',
            method: 'POST',
            uri: '/api/live/{thread}/invite_contributor',
            requestSchema: z.object({
                name: z.string(),
                permissions: z.string().optional(),
            }),
            responseSchema: z.object({ success: z.boolean() }),
        },
        {
            description: 'Abdicate contributorship of a live thread.',
            method: 'POST',
            uri: '/api/live/{thread}/leave_contributor',
            requestSchema: null,
            responseSchema: z.object({ success: z.boolean() }),
        },
        {
            description: 'Report a live thread for violating rules.',
            method: 'POST',
            uri: '/api/live/{thread}/report',
            requestSchema: z.object({
                type: z.string(),
            }),
            responseSchema: z.object({ success: z.boolean() }),
        },
        {
            description: 'Revoke another user contributorship of a live thread.',
            method: 'POST',
            uri: '/api/live/{thread}/rm_contributor',
            requestSchema: z.object({
                id: z.string(),
            }),
            responseSchema: z.object({ success: z.boolean() }),
        },
        {
            description: 'Revoke a contributor invite to a live thread.',
            method: 'POST',
            uri: '/api/live/{thread}/rm_contributor_invite',
            requestSchema: z.object({
                id: z.string(),
            }),
            responseSchema: z.object({ success: z.boolean() }),
        },
        {
            description: 'Set permissions for a contributor on a live thread.',
            method: 'POST',
            uri: '/api/live/{thread}/set_contributor_permissions',
            requestSchema: z.object({
                name: z.string(),
                permissions: z.string(),
                type: z.enum(['liveupdate_contributor', 'liveupdate_contributor_invite']),
            }),
            responseSchema: z.object({ success: z.boolean() }),
        },
        {
            description: 'Strike (mark as incorrect) an update in a live thread.',
            method: 'POST',
            uri: '/api/live/{thread}/strike_update',
            requestSchema: z.object({
                id: z.string(),
            }),
            responseSchema: z.object({ success: z.boolean() }),
        },
        {
            description: 'Unhide the associated discussion link for a live thread.',
            method: 'POST',
            uri: '/api/live/{thread}/unhide_discussion',
            requestSchema: null,
            responseSchema: z.object({ success: z.boolean() }),
        },
        {
            description: 'Post an update to a live thread.',
            method: 'POST',
            uri: '/api/live/{thread}/update',
            requestSchema: z.object({
                body: z.string(),
            }),
            responseSchema: LiveUpdateSchema,
        },
        {
            description: 'Get the live thread content and updates.',
            method: 'GET',
            uri: '/live/{thread}',
            requestSchema: null,
            responseSchema: LiveThreadSchema,
        },
        {
            description: 'Get information about a live thread.',
            method: 'GET',
            uri: '/live/{thread}/about',
            requestSchema: null,
            responseSchema: LiveThreadSchema,
        },
        {
            description: 'Get a list of contributors for a live thread.',
            method: 'GET',
            uri: '/live/{thread}/contributors',
            requestSchema: null,
            responseSchema: z.array(
                z.object({
                    name: z.string(),
                    id: z.string(),
                    permissions: z.array(z.string()),
                })
            ),
        },
        {
            description: 'Get associated discussion posts for a live thread.',
            method: 'GET',
            uri: '/live/{thread}/discussions',
            requestSchema: null,
            responseSchema: ListingSchema(z.any()),
        },
        {
            description: 'Retrieve a specific update from a live thread.',
            method: 'GET',
            uri: '/live/{thread}/updates/{update_id}',
            requestSchema: null,
            responseSchema: LiveUpdateSchema,
        },
    ],
};
