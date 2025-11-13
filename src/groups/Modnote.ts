import { z } from 'zod';
import type { DocGroup } from '../doc.ts';

const ModnoteSchema = z.object({
    id: z.string(),
    user: z.string(),
    subreddit: z.string(),
    moderator: z.string(),
    note: z.string(),
    created_at: z.number(),
    note_type: z.string().optional(),
});

export const Modnote: DocGroup = {
    name: 'modnote',
    docs: [
        {
            description: 'Delete a moderator note.',
            method: 'DELETE',
            uri: '/api/mod/notes',
            requestSchema: z.object({
                note_id: z.string(),
                subreddit: z.string(),
            }),
            responseSchema: z.object({ success: z.boolean() }),
        },
        {
            description: 'Get recent moderator notes for a subreddit.',
            method: 'GET',
            uri: '/api/mod/notes/recent',
            requestSchema: null,
            responseSchema: z.object({
                notes: z.array(ModnoteSchema),
            }),
        },
    ],
};
