import { z } from 'zod';
import type { DocGroup } from '../doc.ts';
import { CommentSortEnum, RedditUserSchema, ThingSchema, TrophySchema, UserListItemSchema } from '../schemas.ts';

// Account-specific schemas
const KarmaListSchema = z.array(
    z.object({
        sr: z.string(), // subreddit name
        comment_karma: z.number(),
        link_karma: z.number(),
    })
);

const TrophyListSchema = z.object({
    kind: z.literal('TrophyList'),
    data: z.object({
        trophies: z.array(ThingSchema(TrophySchema, 't6')),
    }),
});

const UserListSchema = z.array(ThingSchema(UserListItemSchema, 't2'));

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
    default_comment_sort: CommentSortEnum.optional(),
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
                    children: UserListSchema,
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
                    children: UserListSchema,
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
