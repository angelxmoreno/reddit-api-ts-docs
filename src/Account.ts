import { z } from 'zod';
import type { DocGroup } from './doc.ts';

// Common schemas
const RedditUserSchema = z.object({
    id: z.string(),
    name: z.string(),
    created: z.number(),
    created_utc: z.number(),
    link_karma: z.number(),
    comment_karma: z.number(),
    total_karma: z.number().optional(),
    is_gold: z.boolean(),
    is_mod: z.boolean(),
    is_employee: z.boolean().optional(),
    has_verified_email: z.boolean(),
    icon_img: z.string(),
    has_mail: z.boolean().optional(),
    has_mod_mail: z.boolean().optional(),
    inbox_count: z.number().optional(),
    accept_followers: z.boolean().optional(),
    accept_pms: z.boolean().optional(),
    accept_chats: z.string().optional(),
    hide_from_robots: z.boolean().optional(),
});

const KarmaListSchema = z.array(
    z.object({
        sr: z.string(), // subreddit name
        comment_karma: z.number(),
        link_karma: z.number(),
    })
);

const TrophySchema = z.object({
    icon_70: z.string(),
    icon_40: z.string(),
    name: z.string(),
    url: z.string().nullable(),
    award_id: z.string().nullable(),
    id: z.string().nullable(),
    description: z.string().nullable(),
});

const TrophyListSchema = z.object({
    kind: z.literal('TrophyList'),
    data: z.object({
        trophies: z.array(
            z.object({
                kind: z.literal('t6'),
                data: TrophySchema,
            })
        ),
    }),
});

const FriendSchema = z.object({
    name: z.string(),
    id: z.string(),
    date: z.number(),
});

const FriendListSchema = z.array(
    z.object({
        kind: z.literal('t2'),
        data: FriendSchema,
    })
);

const BlockedUserSchema = z.object({
    name: z.string(),
    id: z.string(),
    date: z.number(),
});

const BlockedUserListSchema = z.array(
    z.object({
        kind: z.literal('t2'),
        data: BlockedUserSchema,
    })
);

const PreferencesSchema = z.object({
    // Email settings
    email_digests: z.boolean().optional(),
    email_messages: z.boolean().optional(),
    email_comment_reply: z.boolean().optional(),
    email_post_reply: z.boolean().optional(),
    email_upvote_comment: z.boolean().optional(),
    email_upvote_post: z.boolean().optional(),
    email_username_mention: z.boolean().optional(),
    email_user_new_follower: z.boolean().optional(),
    email_unsubscribe_all: z.boolean().optional(),
    email_chat_request: z.boolean().optional(),

    // Display preferences
    default_theme_sr: z.string().nullable().optional(),
    show_link_flair: z.boolean().optional(),
    show_user_flair: z.boolean().optional(),
    show_trending: z.boolean().optional(),
    threaded_messages: z.boolean().optional(),
    threaded_modmail: z.boolean().optional(),
    show_stylesheets: z.boolean().optional(),
    compress: z.boolean().optional(),
    over_18: z.boolean().optional(),
    enable_followers: z.boolean().optional(),
    show_twitter: z.boolean().optional(),
    show_gold_expiration: z.boolean().optional(),
    highlight_controversial: z.boolean().optional(),
    highlight_new_comments: z.boolean().optional(),
    lang: z.string().optional(),
    media: z.string().optional(),
    media_preview: z.string().optional(),
    video_autoplay: z.boolean().optional(),

    // Content filtering
    min_link_score: z.number().optional(),
    min_comment_score: z.number().optional(),
    num_comments: z.number().optional(),
    numsites: z.number().optional(),
    hide_ups: z.boolean().optional(),
    hide_downs: z.boolean().optional(),
    hide_ads: z.boolean().optional(),
    hide_from_robots: z.boolean().optional(),

    // Privacy controls
    allow_clicktracking: z.boolean().optional(),
    beta: z.boolean().optional(),
    research: z.boolean().optional(),
    public_votes: z.boolean().optional(),
    collapse_read_messages: z.boolean().optional(),
    show_presence: z.boolean().optional(),
    search_include_over_18: z.boolean().optional(),

    // Behavioral settings
    nightmode: z.boolean().optional(),
    activity_relevant_ads: z.boolean().optional(),
    third_party_data_personalized_ads: z.boolean().optional(),
    third_party_site_data_personalized_ads: z.boolean().optional(),
    third_party_site_data_personalized_content: z.boolean().optional(),
    default_comment_sort: z
        .enum(['confidence', 'top', 'new', 'controversial', 'old', 'random', 'qa', 'live'])
        .optional(),
    enable_default_themes: z.boolean().optional(),
    g: z.string().optional(),
    content_langs: z.array(z.string()).optional(),
    show_location_based_recommendations: z.boolean().optional(),
});

const PreferencesUpdateSchema = PreferencesSchema.partial();

export const Account: DocGroup = {
    name: 'account',
    docs: [
        {
            description: 'Returns the identity of the user currently authenticated.',
            method: 'GET',
            uri: '/api/v1/me',
            requestSchema: null,
            responseSchema: RedditUserSchema,
        },
        {
            description: 'Returns a breakdown of subreddit karma for the currently authenticated user.',
            method: 'GET',
            uri: '/api/v1/me/karma',
            requestSchema: null,
            responseSchema: z.object({
                kind: z.literal('KarmaList'),
                data: KarmaListSchema,
            }),
        },
        {
            description: 'Returns the preference settings of the currently authenticated user.',
            method: 'GET',
            uri: '/api/v1/me/prefs',
            requestSchema: null,
            responseSchema: PreferencesSchema,
        },
        {
            description: 'Updates the preference settings of the currently authenticated user.',
            method: 'PATCH',
            uri: '/api/v1/me/prefs',
            requestSchema: PreferencesUpdateSchema,
            responseSchema: PreferencesSchema,
        },
        {
            description: 'Returns a list of trophies for the currently authenticated user.',
            method: 'GET',
            uri: '/api/v1/me/trophies',
            requestSchema: null,
            responseSchema: TrophyListSchema,
        },
        {
            description: 'Returns a list of friends for the currently authenticated user.',
            method: 'GET',
            uri: '/api/v1/me/friends',
            requestSchema: null,
            responseSchema: z.object({
                kind: z.literal('UserList'),
                data: z.object({
                    children: FriendListSchema,
                }),
            }),
        },
        {
            description: 'Returns a list of blocked users for the currently authenticated user.',
            method: 'GET',
            uri: '/prefs/blocked',
            requestSchema: null,
            responseSchema: z.object({
                kind: z.literal('UserList'),
                data: z.object({
                    children: BlockedUserListSchema,
                }),
            }),
        },
        {
            description: 'Check whether captchas are needed for API requests.',
            method: 'GET',
            uri: '/api/needs_captcha',
            requestSchema: null,
            responseSchema: z.boolean(),
        },
    ],
};
