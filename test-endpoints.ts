#!/usr/bin/env bun

/**
 * Example script to test Reddit API endpoints and collect responses
 *
 * Usage:
 * 1. Set your Reddit credentials as environment variables:
 *    export REDDIT_CLIENT_ID="your_client_id"
 *    export REDDIT_CLIENT_SECRET="your_client_secret"
 *    export REDDIT_USERNAME="your_username"
 *    export REDDIT_PASSWORD="your_password"
 *
 * 2. Run the script:
 *    bun run test-endpoints.ts
 */

import { Account, LinksAndComments, Listings, Users } from './src/index.ts';
import { RedditTestClient } from './test-client.ts';

// Check for required environment variables
const requiredEnvVars = ['REDDIT_CLIENT_ID', 'REDDIT_CLIENT_SECRET', 'REDDIT_USERNAME', 'REDDIT_PASSWORD'];
for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
        console.error(`Error: Missing required environment variable: ${envVar}`);
        process.exit(1);
    }
}

// Create the client
const client = new RedditTestClient({
    clientId: process.env.REDDIT_CLIENT_ID!,
    clientSecret: process.env.REDDIT_CLIENT_SECRET!,
    username: process.env.REDDIT_USERNAME!,
    password: process.env.REDDIT_PASSWORD!,
});

async function main() {
    console.log('='.repeat(60));
    console.log('Testing Reddit API Endpoints');
    console.log('='.repeat(60));

    try {
        // Test 1: Get current user info (no z.any())
        console.log('\n[1/5] Testing Account endpoint...');
        await client.testEndpoint(Account.docs[0]!, {
            outputName: 'account_me.json',
        });

        // Test 2: Get hot posts from a subreddit (uses z.any())
        console.log('\n[2/5] Testing Listings endpoint...');
        await client.testEndpoint(Listings.docs[1]!, {
            uriParams: { subreddit: 'AskReddit' },
            queryParams: { limit: 5 },
            outputName: 'listings_hot.json',
        });

        // Test 3: Get comments from a post
        // Note: You'll need to replace this with an actual post ID from the previous response
        console.log('\n[3/5] Testing comment retrieval...');
        console.log('  (Skipping - requires post ID from previous response)');

        // Test 4: Get user overview (uses z.any())
        console.log('\n[4/5] Testing Users endpoint...');
        await client.testEndpoint(Users.docs[1]!, {
            uriParams: { username: process.env.REDDIT_USERNAME! },
            queryParams: { limit: 5 },
            outputName: 'users_overview.json',
        });

        // Test 5: Get user submitted posts (uses z.any())
        console.log('\n[5/5] Testing user submitted posts...');
        await client.testEndpoint(Users.docs[2]!, {
            uriParams: { username: process.env.REDDIT_USERNAME! },
            queryParams: { limit: 5 },
            outputName: 'users_submitted.json',
        });

        console.log('\n' + '='.repeat(60));
        console.log('✓ All tests completed!');
        console.log('Check the ./test-responses directory for saved responses.');
        console.log('='.repeat(60));
    } catch (error) {
        console.error('\n✗ Test failed:', error);
        process.exit(1);
    }
}

main();
