import { z } from 'zod';

/**
 * Common Reddit API schemas that are reused across multiple endpoints
 */

/**
 * Reddit User object schema
 * Used in user profiles, account endpoints, friend lists, etc.
 */
export const RedditUserSchema = z.object({
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

/**
 * Generic listing wrapper schema
 * Reddit API often returns data in a listing format with kind and data
 */
export const ListingSchema = <T extends z.ZodTypeAny>(itemSchema: T) =>
    z.object({
        kind: z.string(),
        data: z.object({
            children: z.array(itemSchema),
            after: z.string().nullable().optional(),
            before: z.string().nullable().optional(),
            modhash: z.string().optional(),
        }),
    });

/**
 * Thing wrapper schema
 * Reddit wraps most objects in a "Thing" with kind and data
 */
export const ThingSchema = <T extends z.ZodTypeAny>(dataSchema: T, kind: string) =>
    z.object({
        kind: z.literal(kind),
        data: dataSchema,
    });

/**
 * Common user list item schema (for friends, blocked users, etc.)
 */
export const UserListItemSchema = z.object({
    name: z.string(),
    id: z.string(),
    date: z.number(),
});

/**
 * Trophy schema
 * Used for user achievements/trophies
 */
export const TrophySchema = z.object({
    icon_70: z.string(),
    icon_40: z.string(),
    name: z.string(),
    url: z.string().nullable(),
    award_id: z.string().nullable(),
    id: z.string().nullable(),
    description: z.string().nullable(),
});

/**
 * Common comment sort options
 */
export const CommentSortEnum = z.enum(['confidence', 'top', 'new', 'controversial', 'old', 'random', 'qa', 'live']);

/**
 * Common time period options for filtering (top, controversial, etc.)
 */
export const TimePeriodEnum = z.enum(['hour', 'day', 'week', 'month', 'year', 'all']);

/**
 * Common subreddit types
 */
export const SubredditTypeEnum = z.enum(['public', 'private', 'restricted', 'gold_restricted', 'archived']);
