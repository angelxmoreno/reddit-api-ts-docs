import { z } from 'zod';
import type { DocGroup } from '../doc.ts';

const EmojiSchema = z.object({
    name: z.string(),
    url: z.string(),
    user_flair_allowed: z.boolean().optional(),
    post_flair_allowed: z.boolean().optional(),
    mod_flair_only: z.boolean().optional(),
    created_by: z.string().optional(),
});

const EmojiListSchema = z.record(z.string(), EmojiSchema);

const EmojiUploadLeaseSchema = z.object({
    s3_upload_lease: z.object({
        action: z.string(),
        fields: z.array(
            z.object({
                name: z.string(),
                value: z.string(),
            })
        ),
    }),
});

export const Emoji: DocGroup = {
    name: 'emoji',
    docs: [
        {
            description: 'Add or update a subreddit emoji.',
            method: 'POST',
            uri: '/api/v1/{subreddit}/emoji.json',
            requestSchema: z.object({
                name: z.string(),
                s3_key: z.string(),
                mod_flair_only: z.boolean().optional(),
                post_flair_allowed: z.boolean().optional(),
                user_flair_allowed: z.boolean().optional(),
            }),
            responseSchema: z.object({ success: z.boolean() }),
        },
        {
            description: 'Delete a subreddit emoji.',
            method: 'DELETE',
            uri: '/api/v1/{subreddit}/emoji/{emoji_name}',
            requestSchema: null,
            responseSchema: z.object({ success: z.boolean() }),
        },
        {
            description: 'Acquire and return an upload lease to S3 for emoji assets.',
            method: 'POST',
            uri: '/api/v1/{subreddit}/emoji_asset_upload_s3.json',
            requestSchema: z.object({
                filepath: z.string(),
                mimetype: z.string(),
            }),
            responseSchema: EmojiUploadLeaseSchema,
        },
        {
            description: 'Set custom emoji size for a subreddit.',
            method: 'POST',
            uri: '/api/v1/{subreddit}/emoji_custom_size',
            requestSchema: z.object({
                height: z.number(),
                width: z.number(),
            }),
            responseSchema: z.object({ success: z.boolean() }),
        },
        {
            description: 'Get all emojis for a subreddit.',
            method: 'GET',
            uri: '/api/v1/{subreddit}/emojis/all',
            requestSchema: null,
            responseSchema: EmojiListSchema,
        },
    ],
};
