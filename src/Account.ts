import { z } from 'zod';
import type { DocGroup } from './doc.ts';

export const Account: DocGroup = {
    name: 'account',
    docs: [
        {
            description: 'Returns the identity of the user.',
            method: 'GET',
            uri: '/api/v1/me',
            requestSchema: null,
            responseSchema: z.object({}),
        },
    ],
};
