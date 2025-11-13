import { z } from 'zod';
import type { DocGroup } from '../doc.ts';
import { ListingSchema } from '../schemas.ts';

const ModmailConversationSchema = z.object({
    id: z.string(),
    subject: z.string(),
    participant: z.object({
        name: z.string(),
        id: z.string(),
    }),
    owner: z.object({
        display_name: z.string(),
        type: z.string(),
        id: z.string(),
    }),
    is_auto: z.boolean(),
    is_internal: z.boolean(),
    is_highlighted: z.boolean().optional(),
    state: z.enum([
        'new',
        'inprogress',
        'mod',
        'archived',
        'highlighted',
        'notifications',
        'filtered',
        'default',
        'join_requests',
        'appeals',
    ]),
    last_updated: z.string(),
    num_messages: z.number(),
});

export const NewModmail: DocGroup = {
    name: 'new_modmail',
    docs: [
        {
            description: 'Mark multiple modmail conversations as read.',
            method: 'POST',
            uri: '/api/mod/bulk_read',
            requestSchema: z.object({
                conversation_ids: z.array(z.string()),
            }),
            responseSchema: z.object({ success: z.boolean() }),
        },
        {
            description: 'List modmail conversations for a subreddit.',
            method: 'GET',
            uri: '/api/mod/conversations',
            requestSchema: null,
            responseSchema: ListingSchema(ModmailConversationSchema),
        },
        {
            description: 'Get a specific modmail conversation.',
            method: 'GET',
            uri: '/api/mod/conversations/:conversation_id',
            requestSchema: null,
            responseSchema: ModmailConversationSchema,
        },
        {
            description: 'Approve a message in a modmail conversation.',
            method: 'POST',
            uri: '/api/mod/conversations/:conversation_id/approve',
            requestSchema: null,
            responseSchema: z.object({ success: z.boolean() }),
        },
        {
            description: 'Archive a modmail conversation.',
            method: 'POST',
            uri: '/api/mod/conversations/:conversation_id/archive',
            requestSchema: null,
            responseSchema: z.object({ success: z.boolean() }),
        },
        {
            description: 'Disapprove a message in a modmail conversation.',
            method: 'POST',
            uri: '/api/mod/conversations/:conversation_id/disapprove',
            requestSchema: null,
            responseSchema: z.object({ success: z.boolean() }),
        },
        {
            description: 'Remove highlight from a modmail conversation.',
            method: 'DELETE',
            uri: '/api/mod/conversations/:conversation_id/highlight',
            requestSchema: null,
            responseSchema: z.object({ success: z.boolean() }),
        },
        {
            description: 'Mute a user in modmail.',
            method: 'POST',
            uri: '/api/mod/conversations/:conversation_id/mute',
            requestSchema: z.object({
                num_hours: z.number().optional(),
            }),
            responseSchema: z.object({ success: z.boolean() }),
        },
        {
            description: 'Temporarily ban a user from modmail.',
            method: 'POST',
            uri: '/api/mod/conversations/:conversation_id/temp_ban',
            requestSchema: z.object({
                duration: z.number(),
            }),
            responseSchema: z.object({ success: z.boolean() }),
        },
        {
            description: 'Unarchive a modmail conversation.',
            method: 'POST',
            uri: '/api/mod/conversations/:conversation_id/unarchive',
            requestSchema: null,
            responseSchema: z.object({ success: z.boolean() }),
        },
        {
            description: 'Remove a ban from a user in modmail.',
            method: 'POST',
            uri: '/api/mod/conversations/:conversation_id/unban',
            requestSchema: null,
            responseSchema: z.object({ success: z.boolean() }),
        },
        {
            description: 'Unmute a user in modmail.',
            method: 'POST',
            uri: '/api/mod/conversations/:conversation_id/unmute',
            requestSchema: null,
            responseSchema: z.object({ success: z.boolean() }),
        },
        {
            description: 'Mark a modmail conversation as read.',
            method: 'POST',
            uri: '/api/mod/conversations/read',
            requestSchema: z.object({
                conversation_ids: z.array(z.string()),
            }),
            responseSchema: z.object({ success: z.boolean() }),
        },
        {
            description: 'Get list of subreddits where the user is a moderator.',
            method: 'GET',
            uri: '/api/mod/conversations/subreddits',
            requestSchema: null,
            responseSchema: z.array(
                z.object({
                    name: z.string(),
                    display_name: z.string(),
                    id: z.string(),
                })
            ),
        },
        {
            description: 'Mark a modmail conversation as unread.',
            method: 'POST',
            uri: '/api/mod/conversations/unread',
            requestSchema: z.object({
                conversation_ids: z.array(z.string()),
            }),
            responseSchema: z.object({ success: z.boolean() }),
        },
        {
            description: 'Get count of unread modmail conversations.',
            method: 'GET',
            uri: '/api/mod/conversations/unread/count',
            requestSchema: null,
            responseSchema: z.object({
                highlighted: z.number(),
                notifications: z.number(),
                archived: z.number(),
                new: z.number(),
                inprogress: z.number(),
                mod: z.number(),
            }),
        },
    ],
};
