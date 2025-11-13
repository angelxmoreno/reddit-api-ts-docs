import { z } from 'zod';
import type { DocGroup } from '../doc.ts';
import { ListingSchema, SubredditTypeEnum } from '../schemas.ts';

const SubredditSchema = z.object({
    id: z.string(),
    name: z.string(),
    display_name: z.string(),
    display_name_prefixed: z.string(),
    title: z.string(),
    public_description: z.string(),
    description: z.string(),
    subscribers: z.number(),
    accounts_active: z.number().optional(),
    created: z.number(),
    created_utc: z.number(),
    over18: z.boolean(),
    subreddit_type: SubredditTypeEnum,
    submit_link_label: z.string().optional(),
    submit_text_label: z.string().optional(),
    url: z.string(),
    user_is_moderator: z.boolean().optional(),
    user_is_subscriber: z.boolean().optional(),
});

const SubredditSettingsSchema = z.object({
    title: z.string(),
    public_description: z.string().optional(),
    description: z.string().optional(),
    submit_text: z.string().optional(),
    subreddit_type: SubredditTypeEnum,
    link_type: z.enum(['any', 'link', 'self']).optional(),
    allow_images: z.boolean().optional(),
    allow_videos: z.boolean().optional(),
    content_options: z.string().optional(),
    wiki_edit_age: z.number().optional(),
    wiki_edit_karma: z.number().optional(),
    spam_links: z.enum(['low', 'high', 'all']).optional(),
    spam_selfposts: z.enum(['low', 'high', 'all']).optional(),
    spam_comments: z.enum(['low', 'high', 'all']).optional(),
    over_18: z.boolean().optional(),
    allow_top: z.boolean().optional(),
    show_media: z.boolean().optional(),
    exclude_banned_modqueue: z.boolean().optional(),
    public_traffic: z.boolean().optional(),
    collapse_deleted_comments: z.boolean().optional(),
    suggested_comment_sort: z.string().optional(),
    header_hover_text: z.string().optional(),
});

const BannedUserSchema = z.object({
    name: z.string(),
    note: z.string().optional(),
    date: z.number(),
    days_left: z.number().optional(),
});

const ModeratorSchema = z.object({
    name: z.string(),
    id: z.string(),
    mod_permissions: z.array(z.string()),
    date: z.number().optional(),
});

const SubredditRulesSchema = z.object({
    rules: z.array(
        z.object({
            kind: z.string(),
            description: z.string(),
            short_name: z.string(),
            violation_reason: z.string(),
            created_utc: z.number(),
            priority: z.number().optional(),
        })
    ),
});

const SubredditTrafficSchema = z.object({
    day: z.array(z.tuple([z.number(), z.number(), z.number()])),
    hour: z.array(z.tuple([z.number(), z.number(), z.number()])),
    month: z.array(z.tuple([z.number(), z.number(), z.number()])),
});

export const Subreddits: DocGroup = {
    name: 'subreddits',
    docs: [
        {
            description: 'Get information about a subreddit.',
            method: 'GET',
            uri: '/r/{subreddit}/about',
            requestSchema: null,
            responseSchema: SubredditSchema,
        },
        {
            description: 'Get the rules for a subreddit.',
            method: 'GET',
            uri: '/r/{subreddit}/about/rules',
            requestSchema: null,
            responseSchema: SubredditRulesSchema,
        },
        {
            description: 'Get traffic statistics for a subreddit.',
            method: 'GET',
            uri: '/r/{subreddit}/about/traffic',
            requestSchema: null,
            responseSchema: SubredditTrafficSchema,
        },
        {
            description: 'Delete the header image of a subreddit.',
            method: 'POST',
            uri: '/api/delete_sr_header',
            requestSchema: z.object({
                r: z.string(),
            }),
            responseSchema: z.object({ success: z.boolean() }),
        },
        {
            description: 'Delete an image from a subreddit.',
            method: 'POST',
            uri: '/api/delete_sr_image',
            requestSchema: z.object({
                img_name: z.string(),
            }),
            responseSchema: z.object({ success: z.boolean() }),
        },
        {
            description: 'Delete the icon/banner from a subreddit.',
            method: 'POST',
            uri: '/api/delete_sr_img',
            requestSchema: z.object({
                img_name: z.string(),
            }),
            responseSchema: z.object({ success: z.boolean() }),
        },
        {
            description: 'Add or remove a user as a friend of a subreddit.',
            method: 'POST',
            uri: '/api/friend',
            requestSchema: z.object({
                name: z.string(),
                type: z.enum([
                    'friend',
                    'moderator',
                    'contributor',
                    'banned',
                    'muted',
                    'wikibanned',
                    'wikicontributor',
                ]),
                r: z.string(),
                note: z.string().optional(),
                duration: z.number().optional(),
                permissions: z.string().optional(),
            }),
            responseSchema: z.object({ success: z.boolean() }),
        },
        {
            description: 'Return a list of broken images for a subreddit.',
            method: 'GET',
            uri: '/api/subreddit_stylesheet',
            requestSchema: null,
            responseSchema: z.object({
                images: z.array(
                    z.object({
                        name: z.string(),
                        url: z.string(),
                        link: z.string().optional(),
                    })
                ),
                stylesheet: z.string(),
            }),
        },
        {
            description: 'Get the sidebar for a subreddit.',
            method: 'GET',
            uri: '/api/sidebar',
            requestSchema: null,
            responseSchema: z.string(),
        },
        {
            description: 'Create or update a subreddit.',
            method: 'POST',
            uri: '/api/site_admin',
            requestSchema: SubredditSettingsSchema.extend({
                name: z.string(),
                sr: z.string().optional(),
            }),
            responseSchema: z.object({ success: z.boolean() }),
        },
        {
            description: 'Subscribe or unsubscribe from a subreddit.',
            method: 'POST',
            uri: '/api/subscribe',
            requestSchema: z.object({
                action: z.enum(['sub', 'unsub']),
                sr_name: z.string().optional(),
                sr: z.string().optional(),
            }),
            responseSchema: z.object({ success: z.boolean() }),
        },
        {
            description: 'Upload a stylesheet for a subreddit.',
            method: 'POST',
            uri: '/api/subreddit_stylesheet',
            requestSchema: z.object({
                op: z.enum(['save', 'preview']),
                stylesheet_contents: z.string(),
                reason: z.string().optional(),
            }),
            responseSchema: z.object({ success: z.boolean() }),
        },
        {
            description: 'Remove a relationship between a user and a subreddit.',
            method: 'POST',
            uri: '/api/unfriend',
            requestSchema: z.object({
                name: z.string(),
                type: z.enum([
                    'friend',
                    'enemy',
                    'moderator',
                    'contributor',
                    'banned',
                    'muted',
                    'wikibanned',
                    'wikicontributor',
                ]),
                id: z.string(),
            }),
            responseSchema: z.object({ success: z.boolean() }),
        },
        {
            description: 'Upload an image to a subreddit.',
            method: 'POST',
            uri: '/api/upload_sr_img',
            requestSchema: z.object({
                file: z.string(),
                name: z.string(),
                upload_type: z.enum(['img', 'header', 'icon', 'banner']),
                img_type: z.enum(['png', 'jpg']),
            }),
            responseSchema: z.object({
                img_src: z.string(),
                errors: z.array(z.string()).optional(),
            }),
        },
        {
            description: 'Get list of banned users in a subreddit.',
            method: 'GET',
            uri: '/about/banned',
            requestSchema: null,
            responseSchema: ListingSchema(BannedUserSchema),
        },
        {
            description: 'Get list of approved contributors in a subreddit.',
            method: 'GET',
            uri: '/about/contributors',
            requestSchema: null,
            responseSchema: ListingSchema(z.any()),
        },
        {
            description: 'Get list of moderators for a subreddit.',
            method: 'GET',
            uri: '/about/moderators',
            requestSchema: null,
            responseSchema: z.array(ModeratorSchema),
        },
        {
            description: 'Get list of users muted in a subreddit.',
            method: 'GET',
            uri: '/about/muted',
            requestSchema: null,
            responseSchema: ListingSchema(z.any()),
        },
        {
            description: 'Get list of users banned from wiki in a subreddit.',
            method: 'GET',
            uri: '/about/wikibanned',
            requestSchema: null,
            responseSchema: ListingSchema(z.any()),
        },
        {
            description: 'Get list of approved wiki contributors.',
            method: 'GET',
            uri: '/about/wikicontributors',
            requestSchema: null,
            responseSchema: ListingSchema(z.any()),
        },
        {
            description: 'Get my moderated subreddits.',
            method: 'GET',
            uri: '/subreddits/mine/moderator',
            requestSchema: null,
            responseSchema: ListingSchema(SubredditSchema),
        },
        {
            description: 'Get my subscribed subreddits.',
            method: 'GET',
            uri: '/subreddits/mine/subscriber',
            requestSchema: null,
            responseSchema: ListingSchema(SubredditSchema),
        },
        {
            description: 'Get subreddits where I am an approved contributor.',
            method: 'GET',
            uri: '/subreddits/mine/contributor',
            requestSchema: null,
            responseSchema: ListingSchema(SubredditSchema),
        },
        {
            description: 'Search for subreddits.',
            method: 'GET',
            uri: '/subreddits/search',
            requestSchema: z.object({
                q: z.string(),
                limit: z.number().optional(),
                after: z.string().optional(),
            }),
            responseSchema: ListingSchema(SubredditSchema),
        },
        {
            description: 'Get popular subreddits.',
            method: 'GET',
            uri: '/subreddits/popular',
            requestSchema: null,
            responseSchema: ListingSchema(SubredditSchema),
        },
        {
            description: 'Get new subreddits.',
            method: 'GET',
            uri: '/subreddits/new',
            requestSchema: null,
            responseSchema: ListingSchema(SubredditSchema),
        },
        {
            description: 'Get default subreddits.',
            method: 'GET',
            uri: '/subreddits/default',
            requestSchema: null,
            responseSchema: ListingSchema(SubredditSchema),
        },
        {
            description: 'Get gold-only subreddits.',
            method: 'GET',
            uri: '/subreddits/gold',
            requestSchema: null,
            responseSchema: ListingSchema(SubredditSchema),
        },
        {
            description: 'Ban a user from a subreddit.',
            method: 'POST',
            uri: '/api/friend',
            requestSchema: z.object({
                name: z.string(),
                ban_reason: z.string().optional(),
                ban_message: z.string().optional(),
                duration: z.number().optional(),
                note: z.string().optional(),
                type: z.literal('banned'),
                r: z.string(),
            }),
            responseSchema: z.object({ success: z.boolean() }),
        },
        {
            description: 'Set permissions for a moderator.',
            method: 'POST',
            uri: '/api/setpermissions',
            requestSchema: z.object({
                name: z.string(),
                type: z.literal('moderator'),
                permissions: z.string(),
                r: z.string(),
            }),
            responseSchema: z.object({ success: z.boolean() }),
        },
        {
            description: 'Get the settings for a subreddit (moderator only).',
            method: 'GET',
            uri: '/r/{subreddit}/about/edit',
            requestSchema: null,
            responseSchema: SubredditSettingsSchema,
        },
        {
            description: 'Mute a user in a subreddit.',
            method: 'POST',
            uri: '/api/mute_message_author',
            requestSchema: z.object({
                id: z.string(),
            }),
            responseSchema: z.object({ success: z.boolean() }),
        },
        {
            description: 'Unmute a user in a subreddit.',
            method: 'POST',
            uri: '/api/unmute_message_author',
            requestSchema: z.object({
                id: z.string(),
            }),
            responseSchema: z.object({ success: z.boolean() }),
        },
        {
            description: 'Get recommended subreddits.',
            method: 'GET',
            uri: '/api/recommend/sr/{srnames}',
            requestSchema: null,
            responseSchema: z.array(SubredditSchema),
        },
        {
            description: 'Search subreddits by name.',
            method: 'POST',
            uri: '/api/search_reddit_names',
            requestSchema: z.object({
                query: z.string(),
                exact: z.boolean().optional(),
                include_over_18: z.boolean().optional(),
            }),
            responseSchema: z.object({
                names: z.array(z.string()),
            }),
        },
        {
            description: 'Search subreddits by name and description.',
            method: 'POST',
            uri: '/api/search_subreddits',
            requestSchema: z.object({
                query: z.string(),
            }),
            responseSchema: z.object({
                subreddits: z.array(
                    z.object({
                        name: z.string(),
                        subscriber_count: z.number(),
                        icon_img: z.string().optional(),
                        active_user_count: z.number().optional(),
                    })
                ),
            }),
        },
        {
            description: 'Get subreddit autocomplete suggestions.',
            method: 'GET',
            uri: '/api/subreddit_autocomplete',
            requestSchema: z.object({
                query: z.string(),
                include_over_18: z.boolean().optional(),
            }),
            responseSchema: z.object({
                subreddits: z.array(SubredditSchema),
            }),
        },
        {
            description: 'Get subreddit autocomplete suggestions (v2).',
            method: 'GET',
            uri: '/api/subreddit_autocomplete_v2',
            requestSchema: z.object({
                query: z.string(),
                include_over_18: z.boolean().optional(),
                include_profiles: z.boolean().optional(),
                limit: z.number().optional(),
            }),
            responseSchema: z.object({
                subreddits: z.array(SubredditSchema),
            }),
        },
        {
            description: 'Submit a link to a subreddit.',
            method: 'GET',
            uri: '/api/submit_text',
            requestSchema: z.object({
                sr: z.string(),
            }),
            responseSchema: z.object({
                submit_text: z.string(),
                submit_text_html: z.string().optional(),
            }),
        },
    ],
};
