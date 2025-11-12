import { z } from 'zod';
import type { DocGroup } from '../doc.ts';
import { CommentSortEnum, ListingSchema, RedditUserSchema, TimePeriodEnum, TrophySchema } from '../schemas.ts';

const UserListSchema = z.object({
    name: z.string(),
    id: z.string(),
    date: z.number().optional(),
});

export const Users: DocGroup = {
    name: 'users',
    docs: [
        {
            description: 'Get information about a user.',
            method: 'GET',
            uri: '/user/{username}/about',
            requestSchema: null,
            responseSchema: RedditUserSchema,
        },
        {
            description: "Get a user's overview (posts and comments).",
            method: 'GET',
            uri: '/user/{username}/overview',
            requestSchema: z.object({
                sort: z.enum(['hot', 'new', 'top', 'controversial']).optional(),
                t: TimePeriodEnum.optional(),
                limit: z.number().optional(),
                after: z.string().optional(),
                before: z.string().optional(),
            }),
            responseSchema: ListingSchema(z.any()),
        },
        {
            description: "Get a user's submitted posts.",
            method: 'GET',
            uri: '/user/{username}/submitted',
            requestSchema: z.object({
                sort: z.enum(['hot', 'new', 'top', 'controversial']).optional(),
                t: TimePeriodEnum.optional(),
                limit: z.number().optional(),
                after: z.string().optional(),
                before: z.string().optional(),
            }),
            responseSchema: ListingSchema(z.any()),
        },
        {
            description: "Get a user's comments.",
            method: 'GET',
            uri: '/user/{username}/comments',
            requestSchema: z.object({
                sort: CommentSortEnum.optional(),
                t: TimePeriodEnum.optional(),
                limit: z.number().optional(),
                after: z.string().optional(),
                before: z.string().optional(),
            }),
            responseSchema: ListingSchema(z.any()),
        },
        {
            description: "Get a user's upvoted posts.",
            method: 'GET',
            uri: '/user/{username}/upvoted',
            requestSchema: z.object({
                limit: z.number().optional(),
                after: z.string().optional(),
                before: z.string().optional(),
            }),
            responseSchema: ListingSchema(z.any()),
        },
        {
            description: "Get a user's downvoted posts.",
            method: 'GET',
            uri: '/user/{username}/downvoted',
            requestSchema: z.object({
                limit: z.number().optional(),
                after: z.string().optional(),
                before: z.string().optional(),
            }),
            responseSchema: ListingSchema(z.any()),
        },
        {
            description: "Get a user's hidden posts.",
            method: 'GET',
            uri: '/user/{username}/hidden',
            requestSchema: z.object({
                limit: z.number().optional(),
                after: z.string().optional(),
                before: z.string().optional(),
            }),
            responseSchema: ListingSchema(z.any()),
        },
        {
            description: "Get a user's saved posts and comments.",
            method: 'GET',
            uri: '/user/{username}/saved',
            requestSchema: z.object({
                limit: z.number().optional(),
                after: z.string().optional(),
                before: z.string().optional(),
            }),
            responseSchema: ListingSchema(z.any()),
        },
        {
            description: "Get a user's gilded posts and comments.",
            method: 'GET',
            uri: '/user/{username}/gilded',
            requestSchema: z.object({
                limit: z.number().optional(),
                after: z.string().optional(),
                before: z.string().optional(),
            }),
            responseSchema: ListingSchema(z.any()),
        },
        {
            description: "Get a user's trophies.",
            method: 'GET',
            uri: '/api/v1/user/{username}/trophies',
            requestSchema: null,
            responseSchema: z.object({
                trophies: z.array(TrophySchema),
            }),
        },
        {
            description: 'Block a user.',
            method: 'POST',
            uri: '/api/block_user',
            requestSchema: z.object({
                account_id: z.string(),
            }),
            responseSchema: z.object({ success: z.boolean() }),
        },
        {
            description: 'Unblock a user.',
            method: 'POST',
            uri: '/api/unfriend',
            requestSchema: z.object({
                name: z.string(),
                type: z.literal('enemy'),
                container: z.string().optional(),
            }),
            responseSchema: z.object({ success: z.boolean() }),
        },
        {
            description: 'Report a user.',
            method: 'POST',
            uri: '/api/report_user',
            requestSchema: z.object({
                user: z.string(),
                reason: z.string(),
                details: z.string().optional(),
            }),
            responseSchema: z.object({ success: z.boolean() }),
        },
        {
            description: 'Get username availability.',
            method: 'GET',
            uri: '/api/username_available',
            requestSchema: z.object({
                user: z.string(),
            }),
            responseSchema: z.boolean(),
        },
        {
            description: 'Search for users.',
            method: 'GET',
            uri: '/users/search',
            requestSchema: z.object({
                q: z.string(),
                limit: z.number().optional(),
                after: z.string().optional(),
            }),
            responseSchema: ListingSchema(RedditUserSchema),
        },
        {
            description: 'Get list of users by IDs.',
            method: 'GET',
            uri: '/api/user_data_by_account_ids',
            requestSchema: z.object({
                ids: z.string(),
            }),
            responseSchema: z.record(z.string(), RedditUserSchema),
        },
        {
            description: 'Get popular users.',
            method: 'GET',
            uri: '/users/popular',
            requestSchema: z.object({
                limit: z.number().optional(),
                after: z.string().optional(),
            }),
            responseSchema: ListingSchema(RedditUserSchema),
        },
        {
            description: 'Get new users.',
            method: 'GET',
            uri: '/users/new',
            requestSchema: z.object({
                limit: z.number().optional(),
                after: z.string().optional(),
            }),
            responseSchema: ListingSchema(RedditUserSchema),
        },
        {
            description: 'Get list of blocked users.',
            method: 'GET',
            uri: '/prefs/blocked',
            requestSchema: null,
            responseSchema: z.array(UserListSchema),
        },
        {
            description: 'Get list of friends.',
            method: 'GET',
            uri: '/prefs/friends',
            requestSchema: null,
            responseSchema: z.array(UserListSchema),
        },
        {
            description: 'Get list of messaging contacts.',
            method: 'GET',
            uri: '/prefs/messaging',
            requestSchema: null,
            responseSchema: z.array(UserListSchema),
        },
        {
            description: 'Get list of trusted users.',
            method: 'GET',
            uri: '/prefs/trusted',
            requestSchema: null,
            responseSchema: z.array(UserListSchema),
        },
        {
            description: 'Get information about multiple users.',
            method: 'POST',
            uri: '/api/user_about',
            requestSchema: z.object({
                ids: z.array(z.string()),
            }),
            responseSchema: z.record(z.string(), RedditUserSchema),
        },
    ],
};
