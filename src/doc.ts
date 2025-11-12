import type { z } from 'zod';

export interface Doc {
    description: string;
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    uri: string;
    requestSchema: z.Schema | null;
    responseSchema: z.Schema;
}

export interface DocGroup {
    name: string;
    docs: Doc[];
}
