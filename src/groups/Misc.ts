import { z } from 'zod';
import type { DocGroup } from '../doc.ts';

const OAuthScopeSchema = z.object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
});

export const Misc: DocGroup = {
    name: 'misc',
    docs: [
        {
            description: 'List available OAuth scopes and their descriptions.',
            method: 'GET',
            uri: '/api/v1/scopes',
            requestSchema: null,
            responseSchema: z.record(z.string(), OAuthScopeSchema),
        },
    ],
};
