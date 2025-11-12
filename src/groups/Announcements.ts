import { z } from 'zod';
import type { DocGroup } from '../doc.ts';

// Announcement schemas
const AnnouncementSchema = z.object({
    id: z.string(),
    title: z.string(),
    text: z.string(),
    sticky: z.boolean().optional(),
    created_utc: z.number(),
    read: z.boolean().optional(),
});

const AnnouncementListSchema = z.array(AnnouncementSchema);

const AnnouncementIdsSchema = z.object({
    ids: z.array(z.string()),
});

export const Announcements: DocGroup = {
    name: 'announcements',
    docs: [
        {
            description: 'Fetch announcements from Reddit.',
            method: 'GET',
            uri: '/api/announcements/v1',
            requestSchema: null,
            responseSchema: AnnouncementListSchema,
        },
        {
            description: 'Retrieve unread announcements for the authenticated user.',
            method: 'GET',
            uri: '/api/announcements/v1/unread',
            requestSchema: null,
            responseSchema: AnnouncementListSchema,
        },
        {
            description: 'Mark announcements as hidden if they belong to the authenticated user.',
            method: 'POST',
            uri: '/api/announcements/v1/hide',
            requestSchema: AnnouncementIdsSchema,
            responseSchema: z.object({ success: z.boolean() }),
        },
        {
            description: 'Mark announcements as read if they belong to the authenticated user.',
            method: 'POST',
            uri: '/api/announcements/v1/read',
            requestSchema: AnnouncementIdsSchema,
            responseSchema: z.object({ success: z.boolean() }),
        },
        {
            description: 'Mark all unread announcements as read for the authenticated user.',
            method: 'POST',
            uri: '/api/announcements/v1/read_all',
            requestSchema: null,
            responseSchema: z.object({ success: z.boolean() }),
        },
    ],
};
