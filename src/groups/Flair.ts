import { z } from 'zod';
import type { DocGroup } from '../doc.ts';
import { ListingSchema } from '../schemas.ts';

const FlairTemplateSchema = z.object({
    id: z.string(),
    text: z.string(),
    css_class: z.string().optional(),
    text_color: z.enum(['light', 'dark']).optional(),
    background_color: z.string().optional(),
    mod_only: z.boolean().optional(),
    max_emojis: z.number().optional(),
    text_editable: z.boolean().optional(),
});

const FlairSchema = z.object({
    user: z.string().optional(),
    flair_text: z.string().optional(),
    flair_css_class: z.string().optional(),
});

export const Flair: DocGroup = {
    name: 'flair',
    docs: [
        {
            description: 'Remove all flair templates from a subreddit.',
            method: 'POST',
            uri: '/api/clearflairtemplates',
            requestSchema: z.object({
                flair_type: z.enum(['USER_FLAIR', 'LINK_FLAIR']),
            }),
            responseSchema: z.object({ success: z.boolean() }),
        },
        {
            description: 'Remove user flair from a user.',
            method: 'POST',
            uri: '/api/deleteflair',
            requestSchema: z.object({
                name: z.string(),
            }),
            responseSchema: z.object({ success: z.boolean() }),
        },
        {
            description: 'Delete a flair template.',
            method: 'POST',
            uri: '/api/deleteflairtemplate',
            requestSchema: z.object({
                flair_template_id: z.string(),
            }),
            responseSchema: z.object({ success: z.boolean() }),
        },
        {
            description: 'Assign flair to a user or link.',
            method: 'POST',
            uri: '/api/flair',
            requestSchema: z.object({
                name: z.string().optional(),
                link: z.string().optional(),
                text: z.string().optional(),
                css_class: z.string().optional(),
            }),
            responseSchema: z.object({ success: z.boolean() }),
        },
        {
            description: 'Update the order of flair templates in the subreddit.',
            method: 'PATCH',
            uri: '/api/flair_template_order',
            requestSchema: z.object({
                flair_type: z.enum(['USER_FLAIR', 'LINK_FLAIR']),
                subreddit: z.string(),
                order: z.array(z.string()),
            }),
            responseSchema: z.object({ success: z.boolean() }),
        },
        {
            description: 'Configure subreddit flair settings.',
            method: 'POST',
            uri: '/api/flairconfig',
            requestSchema: z.object({
                flair_enabled: z.boolean().optional(),
                flair_position: z.enum(['left', 'right']).optional(),
                flair_self_assign_enabled: z.boolean().optional(),
                link_flair_position: z.enum(['left', 'right', 'none']).optional(),
                link_flair_self_assign_enabled: z.boolean().optional(),
            }),
            responseSchema: z.object({ success: z.boolean() }),
        },
        {
            description: 'Change the flair of multiple users in the same subreddit with a CSV file.',
            method: 'POST',
            uri: '/api/flaircsv',
            requestSchema: z.object({
                flair_csv: z.string(),
            }),
            responseSchema: z.object({ success: z.boolean() }),
        },
        {
            description: 'Get a listing of flair assignments in a subreddit.',
            method: 'GET',
            uri: '/api/flairlist',
            requestSchema: null,
            responseSchema: ListingSchema(FlairSchema),
        },
        {
            description: "Return information about a user's flair options.",
            method: 'POST',
            uri: '/api/flairselector',
            requestSchema: z.object({
                link: z.string().optional(),
            }),
            responseSchema: z.object({
                choices: z.array(FlairTemplateSchema),
                current: FlairSchema.optional(),
            }),
        },
        {
            description: 'Create or update a flair template.',
            method: 'POST',
            uri: '/api/flairtemplate',
            requestSchema: z.object({
                flair_type: z.enum(['USER_FLAIR', 'LINK_FLAIR']),
                text: z.string(),
                css_class: z.string().optional(),
                text_editable: z.boolean().optional(),
            }),
            responseSchema: z.object({ success: z.boolean() }),
        },
        {
            description: 'Create or update a flair template (redesign version).',
            method: 'POST',
            uri: '/api/flairtemplate_v2',
            requestSchema: z.object({
                flair_type: z.enum(['USER_FLAIR', 'LINK_FLAIR']),
                text: z.string(),
                text_color: z.enum(['light', 'dark']).optional(),
                background_color: z.string().optional(),
                mod_only: z.boolean().optional(),
                text_editable: z.boolean().optional(),
            }),
            responseSchema: z.object({ success: z.boolean() }),
        },
        {
            description: 'Return a list of available link flair for the subreddit.',
            method: 'GET',
            uri: '/api/link_flair',
            requestSchema: null,
            responseSchema: z.array(FlairTemplateSchema),
        },
        {
            description: 'Return a list of available link flair (v2).',
            method: 'GET',
            uri: '/api/link_flair_v2',
            requestSchema: null,
            responseSchema: z.array(FlairTemplateSchema),
        },
        {
            description: 'Apply flair to a user or post.',
            method: 'POST',
            uri: '/api/selectflair',
            requestSchema: z.object({
                flair_template_id: z.string(),
                link: z.string().optional(),
                text: z.string().optional(),
            }),
            responseSchema: z.object({ success: z.boolean() }),
        },
        {
            description: 'Enable or disable user flair in a subreddit.',
            method: 'POST',
            uri: '/api/setflairenabled',
            requestSchema: z.object({
                flair_enabled: z.boolean(),
            }),
            responseSchema: z.object({ success: z.boolean() }),
        },
        {
            description: 'Return a list of available user flair for the subreddit.',
            method: 'GET',
            uri: '/api/user_flair',
            requestSchema: null,
            responseSchema: z.array(FlairTemplateSchema),
        },
        {
            description: 'Return a list of available user flair (filters out mod-only flairs).',
            method: 'GET',
            uri: '/api/user_flair_v2',
            requestSchema: null,
            responseSchema: z.array(FlairTemplateSchema),
        },
    ],
};
