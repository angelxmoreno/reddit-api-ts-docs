import { z } from 'zod';
import type { DocGroup } from '../doc.ts';
import { ListingSchema } from '../schemas.ts';

const ModActionSchema = z.object({
    id: z.string(),
    action: z.string(),
    mod: z.string(),
    target_fullname: z.string().optional(),
    target_author: z.string().optional(),
    target_title: z.string().optional(),
    target_permalink: z.string().optional(),
    target_body: z.string().optional(),
    created_utc: z.number(),
    subreddit: z.string(),
    description: z.string().optional(),
    details: z.string().optional(),
});

const StylesheetSchema = z.object({
    stylesheet: z.string(),
    images: z.array(
        z.object({
            name: z.string(),
            url: z.string(),
        })
    ),
});

export const Moderation: DocGroup = {
    name: 'moderation',
    docs: [
        {
            description: 'Get a list of recently edited things.',
            method: 'GET',
            uri: '/about/edited',
            requestSchema: null,
            responseSchema: ListingSchema(z.any()),
        },
        {
            description: 'Get a list of recent moderation actions.',
            method: 'GET',
            uri: '/about/log',
            requestSchema: null,
            responseSchema: ListingSchema(ModActionSchema),
        },
        {
            description: 'Get items in the moderation queue.',
            method: 'GET',
            uri: '/about/modqueue',
            requestSchema: null,
            responseSchema: ListingSchema(z.any()),
        },
        {
            description: 'Get reported items.',
            method: 'GET',
            uri: '/about/reports',
            requestSchema: null,
            responseSchema: ListingSchema(z.any()),
        },
        {
            description: 'Get items marked as spam.',
            method: 'GET',
            uri: '/about/spam',
            requestSchema: null,
            responseSchema: ListingSchema(z.any()),
        },
        {
            description: 'Get unmoderated items.',
            method: 'GET',
            uri: '/about/unmoderated',
            requestSchema: null,
            responseSchema: ListingSchema(z.any()),
        },
        {
            description: 'Accept an invite to moderate a subreddit.',
            method: 'POST',
            uri: '/api/accept_moderator_invite',
            requestSchema: z.object({
                api_type: z.string().optional(),
            }),
            responseSchema: z.object({ success: z.boolean() }),
        },
        {
            description: 'Approve a link or comment.',
            method: 'POST',
            uri: '/api/approve',
            requestSchema: z.object({
                id: z.string(),
            }),
            responseSchema: z.object({ success: z.boolean() }),
        },
        {
            description: 'Distinguish a comment or link.',
            method: 'POST',
            uri: '/api/distinguish',
            requestSchema: z.object({
                id: z.string(),
                how: z.enum(['yes', 'no', 'admin', 'special']),
                sticky: z.boolean().optional(),
            }),
            responseSchema: z.any(),
        },
        {
            description: 'Ignore future reports on a thing.',
            method: 'POST',
            uri: '/api/ignore_reports',
            requestSchema: z.object({
                id: z.string(),
            }),
            responseSchema: z.object({ success: z.boolean() }),
        },
        {
            description: 'Abdicate approved submitter status in a subreddit.',
            method: 'POST',
            uri: '/api/leavecontributor',
            requestSchema: z.object({
                id: z.string(),
            }),
            responseSchema: z.object({ success: z.boolean() }),
        },
        {
            description: 'Abdicate moderator status in a subreddit.',
            method: 'POST',
            uri: '/api/leavemoderator',
            requestSchema: z.object({
                id: z.string(),
            }),
            responseSchema: z.object({ success: z.boolean() }),
        },
        {
            description: 'Remove a link, comment, or modmail message.',
            method: 'POST',
            uri: '/api/remove',
            requestSchema: z.object({
                id: z.string(),
                spam: z.boolean().optional(),
            }),
            responseSchema: z.object({ success: z.boolean() }),
        },
        {
            description: 'Approve and show a comment that was removed.',
            method: 'POST',
            uri: '/api/show_comment',
            requestSchema: z.object({
                id: z.string(),
            }),
            responseSchema: z.object({ success: z.boolean() }),
        },
        {
            description: 'Snooze reports on a thing.',
            method: 'POST',
            uri: '/api/snooze_reports',
            requestSchema: z.object({
                id: z.string(),
                reason: z.string().optional(),
            }),
            responseSchema: z.object({ success: z.boolean() }),
        },
        {
            description: 'Unignore reports on a thing.',
            method: 'POST',
            uri: '/api/unignore_reports',
            requestSchema: z.object({
                id: z.string(),
            }),
            responseSchema: z.object({ success: z.boolean() }),
        },
        {
            description: 'Unsnooze reports on a thing.',
            method: 'POST',
            uri: '/api/unsnooze_reports',
            requestSchema: z.object({
                id: z.string(),
            }),
            responseSchema: z.object({ success: z.boolean() }),
        },
        {
            description: 'Update the crowd control level for a subreddit.',
            method: 'POST',
            uri: '/api/update_crowd_control_level',
            requestSchema: z.object({
                level: z.number().min(0).max(3),
            }),
            responseSchema: z.object({ success: z.boolean() }),
        },
        {
            description: 'Get the stylesheet for a subreddit.',
            method: 'GET',
            uri: '/stylesheet',
            requestSchema: null,
            responseSchema: StylesheetSchema,
        },
    ],
};
