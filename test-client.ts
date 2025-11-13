import { mkdirSync, writeFileSync } from 'node:fs';
import type { Doc } from './src/doc.ts';

interface RedditCredentials {
    clientId: string;
    clientSecret: string;
    username: string;
    password: string;
}

interface TokenResponse {
    access_token: string;
    token_type: string;
    expires_in: number;
}

export class RedditTestClient {
    private credentials: RedditCredentials;
    private accessToken?: string;
    private tokenExpiry?: number;

    constructor(credentials: RedditCredentials) {
        this.credentials = credentials;
    }

    /**
     * Authenticate with Reddit OAuth and get access token
     */
    private async authenticate(): Promise<string> {
        // Check if we have a valid token
        if (this.accessToken && this.tokenExpiry && Date.now() < this.tokenExpiry) {
            return this.accessToken;
        }

        const authString = btoa(`${this.credentials.clientId}:${this.credentials.clientSecret}`);

        const formData = new URLSearchParams({
            grant_type: 'password',
            username: this.credentials.username,
            password: this.credentials.password,
        });

        const response = await fetch('https://www.reddit.com/api/v1/access_token', {
            method: 'POST',
            headers: {
                Authorization: `Basic ${authString}`,
                'Content-Type': 'application/x-www-form-urlencoded',
                'User-Agent': 'reddit-api-ts-docs/1.0.0',
            },
            body: formData.toString(),
        });

        if (!response.ok) {
            const error = await response.text();
            throw new Error(`Authentication failed: ${response.status} ${error}`);
        }

        const data = (await response.json()) as TokenResponse;
        this.accessToken = data.access_token;
        // Set expiry to 5 minutes before actual expiry for safety
        this.tokenExpiry = Date.now() + (data.expires_in - 300) * 1000;

        console.log('✓ Authenticated with Reddit API');
        return this.accessToken;
    }

    /**
     * Replace URI parameters with actual values
     * Example: /r/{subreddit}/hot -> /r/AskReddit/hot
     */
    private buildUri(template: string, params: Record<string, string>): string {
        let uri = template;
        for (const [key, value] of Object.entries(params)) {
            uri = uri.replace(`{${key}}`, value);
        }
        return uri;
    }

    /**
     * Make an API call using a Doc definition and save the response
     */
    async testEndpoint(
        doc: Doc,
        options: {
            uriParams?: Record<string, string>;
            queryParams?: Record<string, unknown>;
            bodyParams?: Record<string, unknown>;
            outputName?: string;
        } = {}
    ): Promise<void> {
        const { uriParams = {}, queryParams = {}, bodyParams = {}, outputName } = options;

        // Get access token
        const token = await this.authenticate();

        // Build the full URI
        let uri = this.buildUri(doc.uri, uriParams);

        // Add query parameters for GET requests
        if (doc.method === 'GET' && Object.keys(queryParams).length > 0) {
            const query = new URLSearchParams();
            for (const [key, value] of Object.entries(queryParams)) {
                query.append(key, String(value));
            }
            uri = `${uri}?${query.toString()}`;
        }

        const url = `https://oauth.reddit.com${uri}`;

        console.log(`\n→ ${doc.method} ${uri}`);
        console.log(`  ${doc.description}`);

        // Prepare request options
        const requestOptions: RequestInit = {
            method: doc.method,
            headers: {
                Authorization: `Bearer ${token}`,
                'User-Agent': 'reddit-api-ts-docs/1.0.0',
            },
        };

        // Add body for POST/PUT/PATCH requests
        if (['POST', 'PUT', 'PATCH'].includes(doc.method) && Object.keys(bodyParams).length > 0) {
            requestOptions.headers = {
                ...requestOptions.headers,
                'Content-Type': 'application/x-www-form-urlencoded',
            };
            const formData = new URLSearchParams();
            for (const [key, value] of Object.entries(bodyParams)) {
                formData.append(key, String(value));
            }
            requestOptions.body = formData.toString();
        }

        // Make the request
        const response = await fetch(url, requestOptions);

        if (!response.ok) {
            const error = await response.text();
            console.error(`✗ Request failed: ${response.status}`);
            console.error(error);
            throw new Error(`Request failed: ${response.status}`);
        }

        const data = await response.json();

        // Save response to file
        const fileName = outputName || this.generateFileName(doc);
        const outputDir = './test-responses';

        try {
            mkdirSync(outputDir, { recursive: true });
        } catch (err) {
            // Directory already exists
        }

        const filePath = `${outputDir}/${fileName}`;
        writeFileSync(filePath, JSON.stringify(data, null, 2));

        console.log(`✓ Response saved to ${filePath}`);
        console.log(`  Status: ${response.status}`);
        console.log(`  Response size: ${JSON.stringify(data).length} bytes`);
    }

    /**
     * Generate a filename from the Doc definition
     */
    private generateFileName(doc: Doc): string {
        // Remove leading slash and replace path separators with underscores
        const path = doc.uri.replace(/^\//, '').replace(/\//g, '_').replace(/[{}]/g, '');

        return `${doc.method.toLowerCase()}_${path}.json`;
    }
}

// Example usage:
// const client = new RedditTestClient({
//     clientId: 'YOUR_CLIENT_ID',
//     clientSecret: 'YOUR_CLIENT_SECRET',
//     username: 'YOUR_USERNAME',
//     password: 'YOUR_PASSWORD',
// });
//
// import { Listings } from './src/index.ts';
// await client.testEndpoint(Listings.docs[0], {
//     uriParams: { subreddit: 'AskReddit' },
//     queryParams: { limit: 5 },
// });
