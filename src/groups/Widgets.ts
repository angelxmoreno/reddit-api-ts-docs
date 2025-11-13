import { z } from 'zod';
import type { DocGroup } from '../doc.ts';

const WidgetSchema = z.object({
    id: z.string(),
    kind: z.string(),
    shortName: z.string().optional(),
    styles: z.record(z.string(), z.string()).optional(),
});

const WidgetListSchema = z.object({
    items: z.record(z.string(), WidgetSchema),
    order: z.array(z.string()),
    layout: z.record(z.string(), z.any()).optional(),
});

const WidgetImageUploadLeaseSchema = z.object({
    s3UploadLease: z.object({
        action: z.string(),
        fields: z.array(
            z.object({
                name: z.string(),
                value: z.string(),
            })
        ),
    }),
});

export const Widgets: DocGroup = {
    name: 'widgets',
    docs: [
        {
            description: 'Create a new widget for a subreddit.',
            method: 'POST',
            uri: '/api/widget',
            requestSchema: z.object({
                kind: z.string(),
                shortName: z.string().optional(),
                data: z.record(z.string(), z.any()),
                subreddit: z.string(),
            }),
            responseSchema: WidgetSchema,
        },
        {
            description: 'Delete a widget from a subreddit.',
            method: 'DELETE',
            uri: '/api/widget/{widget_id}',
            requestSchema: null,
            responseSchema: z.object({ success: z.boolean() }),
        },
        {
            description: 'Upload a widget image to S3.',
            method: 'POST',
            uri: '/api/widget_image_upload_s3',
            requestSchema: z.object({
                filepath: z.string(),
                mimetype: z.string(),
            }),
            responseSchema: WidgetImageUploadLeaseSchema,
        },
        {
            description: 'Reorder widgets in a subreddit section.',
            method: 'PATCH',
            uri: '/api/widget_order/{section}',
            requestSchema: z.object({
                order: z.array(z.string()),
                section: z.string(),
            }),
            responseSchema: z.object({ success: z.boolean() }),
        },
        {
            description: 'List all widgets for a subreddit.',
            method: 'GET',
            uri: '/api/widgets',
            requestSchema: null,
            responseSchema: WidgetListSchema,
        },
    ],
};
