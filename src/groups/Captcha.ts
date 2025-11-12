import { z } from 'zod';
import type { DocGroup } from '../doc.ts';

export const Captcha: DocGroup = {
    name: 'captcha',
    docs: [
        {
            description: 'Check whether ReCAPTCHAs are needed for API methods.',
            method: 'GET',
            uri: '/api/needs_captcha',
            requestSchema: null,
            responseSchema: z.boolean(),
        },
    ],
};
