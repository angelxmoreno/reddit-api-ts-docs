import { z } from 'zod';
import type { DocGroup } from '../doc.ts';
import { ListingSchema } from '../schemas.ts';

const ComposeMessageSchema = z.object({
    to: z.string(),
    subject: z.string(),
    text: z.string(),
    from_sr: z.string().optional(),
    g_recaptcha_response: z.string().optional(),
});

const MessageIdSchema = z.object({
    id: z.string(),
});

const PaginationParamsSchema = z.object({
    limit: z.number().optional(),
    after: z.string().optional(),
    before: z.string().optional(),
});

export const PrivateMessages: DocGroup = {
    name: 'private_messages',
    docs: [
        {
            description: 'Compose and send a private message.',
            method: 'POST',
            uri: '/api/compose',
            requestSchema: ComposeMessageSchema,
            responseSchema: z.object({ success: z.boolean() }),
        },
        {
            description: 'Delete a private message.',
            method: 'POST',
            uri: '/api/del_msg',
            requestSchema: MessageIdSchema,
            responseSchema: z.object({ success: z.boolean() }),
        },
        {
            description: 'Mark all messages as read for the authenticated user.',
            method: 'POST',
            uri: '/api/read_all_messages',
            requestSchema: null,
            responseSchema: z.object({ success: z.boolean() }),
        },
        {
            description: 'Mark a specific message as read.',
            method: 'POST',
            uri: '/api/read_message',
            requestSchema: MessageIdSchema,
            responseSchema: z.object({ success: z.boolean() }),
        },
        {
            description: 'View message inbox for the authenticated user.',
            method: 'GET',
            uri: '/message/inbox',
            requestSchema: PaginationParamsSchema,
            responseSchema: ListingSchema(z.any()),
        },
        {
            description: 'View sent messages for the authenticated user.',
            method: 'GET',
            uri: '/message/sent',
            requestSchema: PaginationParamsSchema,
            responseSchema: ListingSchema(z.any()),
        },
        {
            description: 'View unread messages for the authenticated user.',
            method: 'GET',
            uri: '/message/unread',
            requestSchema: PaginationParamsSchema,
            responseSchema: ListingSchema(z.any()),
        },
        {
            description: 'Generic message endpoint for accessing different message views.',
            method: 'GET',
            uri: '/message/{where}',
            requestSchema: PaginationParamsSchema,
            responseSchema: ListingSchema(z.any()),
        },
    ],
};
