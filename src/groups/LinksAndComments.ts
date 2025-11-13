import { z } from 'zod';
import type { DocGroup } from '../doc.ts';
import { CommentSortEnum, ListingSchema } from '../schemas.ts';

const SubmitSchema = z
    .object({
        sr: z.string(),
        kind: z.enum(['link', 'self', 'image', 'video', 'videogif']),
        title: z.string(),
        url: z.string().optional(),
        text: z.string().optional(),
        sendreplies: z.boolean().optional(),
        nsfw: z.boolean().optional(),
        spoiler: z.boolean().optional(),
        resubmit: z.boolean().optional(),
    })
    .superRefine((data, ctx) => {
        // Link posts require url
        if (data.kind === 'link' && !data.url) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: 'url is required for link posts',
                path: ['url'],
            });
        }
        // Self posts require text
        if (data.kind === 'self' && !data.text) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: 'text is required for self posts',
                path: ['text'],
            });
        }
    });

const ThingIdSchema = z.object({
    id: z.string(),
});

export const LinksAndComments: DocGroup = {
    name: 'links_and_comments',
    docs: [
        {
            description: 'Submit a new comment or reply to a message.',
            method: 'POST',
            uri: '/api/comment',
            requestSchema: z.object({
                thing_id: z.string(),
                text: z.string(),
            }),
            responseSchema: z.any(),
        },
        {
            description: 'Delete a link or comment.',
            method: 'POST',
            uri: '/api/del',
            requestSchema: ThingIdSchema,
            responseSchema: z.object({ success: z.boolean() }),
        },
        {
            description: 'Edit the body text of a comment or self-post.',
            method: 'POST',
            uri: '/api/editusertext',
            requestSchema: z.object({
                thing_id: z.string(),
                text: z.string(),
            }),
            responseSchema: z.any(),
        },
        {
            description: 'Follow or unfollow a post.',
            method: 'POST',
            uri: '/api/follow_post',
            requestSchema: z.object({
                fullname: z.string(),
                follow: z.boolean(),
            }),
            responseSchema: z.object({ success: z.boolean() }),
        },
        {
            description: 'Hide a link from the user view.',
            method: 'POST',
            uri: '/api/hide',
            requestSchema: ThingIdSchema,
            responseSchema: z.object({ success: z.boolean() }),
        },
        {
            description: 'Return a listing of things specified by their fullnames.',
            method: 'GET',
            uri: '/api/info',
            requestSchema: z.object({
                id: z.string().optional(),
                url: z.string().optional(),
            }),
            responseSchema: ListingSchema(z.any()),
        },
        {
            description: 'Lock a link or comment, preventing new child comments.',
            method: 'POST',
            uri: '/api/lock',
            requestSchema: ThingIdSchema,
            responseSchema: z.object({ success: z.boolean() }),
        },
        {
            description: 'Mark a link as NSFW.',
            method: 'POST',
            uri: '/api/marknsfw',
            requestSchema: ThingIdSchema,
            responseSchema: z.object({ success: z.boolean() }),
        },
        {
            description: 'Retrieve additional comments omitted from a base comment tree.',
            method: 'GET',
            uri: '/api/morechildren',
            requestSchema: z.object({
                link_id: z.string(),
                children: z.string(),
                sort: CommentSortEnum.optional(),
            }),
            responseSchema: z.any(),
        },
        {
            description: 'Report a link, comment, or message to moderators.',
            method: 'POST',
            uri: '/api/report',
            requestSchema: z.object({
                thing_id: z.string(),
                reason: z.string().optional(),
            }),
            responseSchema: z.object({ success: z.boolean() }),
        },
        {
            description: 'Save a link or comment for later viewing.',
            method: 'POST',
            uri: '/api/save',
            requestSchema: z.object({
                id: z.string(),
                category: z.string().optional(),
            }),
            responseSchema: z.object({ success: z.boolean() }),
        },
        {
            description: 'Get a list of categories in which things are currently saved.',
            method: 'GET',
            uri: '/api/saved_categories',
            requestSchema: null,
            responseSchema: z.array(
                z.object({
                    category: z.string(),
                    count: z.number(),
                })
            ),
        },
        {
            description: 'Enable or disable inbox replies for a link or comment.',
            method: 'POST',
            uri: '/api/sendreplies',
            requestSchema: z.object({
                id: z.string(),
                state: z.boolean(),
            }),
            responseSchema: z.object({ success: z.boolean() }),
        },
        {
            description: "Set or unset 'contest mode' for a link's comments.",
            method: 'POST',
            uri: '/api/set_contest_mode',
            requestSchema: z.object({
                id: z.string(),
                state: z.boolean(),
            }),
            responseSchema: z.object({ success: z.boolean() }),
        },
        {
            description: 'Set or unset a link as the sticky post in a subreddit.',
            method: 'POST',
            uri: '/api/set_subreddit_sticky',
            requestSchema: z.object({
                id: z.string(),
                state: z.boolean(),
                num: z.number().int().min(1).max(2).optional(),
            }),
            responseSchema: z.object({ success: z.boolean() }),
        },
        {
            description: 'Set a suggested sort order for a link.',
            method: 'POST',
            uri: '/api/set_suggested_sort',
            requestSchema: z.object({
                id: z.string(),
                sort: CommentSortEnum.optional(),
            }),
            responseSchema: z.object({ success: z.boolean() }),
        },
        {
            description: 'Mark content as a spoiler.',
            method: 'POST',
            uri: '/api/spoiler',
            requestSchema: ThingIdSchema,
            responseSchema: z.object({ success: z.boolean() }),
        },
        {
            description: 'Record link visit data for analytics.',
            method: 'POST',
            uri: '/api/store_visits',
            requestSchema: z.object({
                links: z.array(z.string()),
            }),
            responseSchema: z.object({ success: z.boolean() }),
        },
        {
            description: 'Submit a new link or self-post to a subreddit.',
            method: 'POST',
            uri: '/api/submit',
            requestSchema: SubmitSchema,
            responseSchema: z.object({
                success: z.boolean(),
                id: z.string().optional(),
                name: z.string().optional(),
                url: z.string().optional(),
            }),
        },
        {
            description: 'Unhide a previously hidden link.',
            method: 'POST',
            uri: '/api/unhide',
            requestSchema: ThingIdSchema,
            responseSchema: z.object({ success: z.boolean() }),
        },
        {
            description: 'Unlock a previously locked post or comment.',
            method: 'POST',
            uri: '/api/unlock',
            requestSchema: ThingIdSchema,
            responseSchema: z.object({ success: z.boolean() }),
        },
        {
            description: 'Remove the NSFW marking from a link.',
            method: 'POST',
            uri: '/api/unmarknsfw',
            requestSchema: ThingIdSchema,
            responseSchema: z.object({ success: z.boolean() }),
        },
        {
            description: 'Remove a previously saved link or comment.',
            method: 'POST',
            uri: '/api/unsave',
            requestSchema: ThingIdSchema,
            responseSchema: z.object({ success: z.boolean() }),
        },
        {
            description: 'Remove the spoiler marking from content.',
            method: 'POST',
            uri: '/api/unspoiler',
            requestSchema: ThingIdSchema,
            responseSchema: z.object({ success: z.boolean() }),
        },
        {
            description: 'Cast a vote on a link or comment.',
            method: 'POST',
            uri: '/api/vote',
            requestSchema: z.object({
                id: z.string(),
                dir: z.enum(['-1', '0', '1']),
            }),
            responseSchema: z.object({ success: z.boolean() }),
        },
    ],
};
