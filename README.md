# reddit-api-ts-docs

A TypeScript library that converts the [Reddit API documentation](https://www.reddit.com/dev/api) into type-safe TypeScript definitions with Zod schema validation.

## Overview

This project provides comprehensive TypeScript definitions for all Reddit API endpoints, organized into 19 doc groups covering 180+ endpoints. Each endpoint includes:

- Request parameter schemas (using Zod)
- Response schemas (using Zod)
- HTTP method types
- URI paths
- Descriptions

## Features

- **Type Safety**: Full TypeScript types for all Reddit API endpoints
- **Runtime Validation**: Zod schemas for request and response validation
- **Organized Structure**: 19 doc groups matching Reddit's API categories
- **Reusable Schemas**: Shared types and factory functions to avoid duplication
- **Modern Tooling**: Built with Bun, TypeScript, and Biome

## Installation

```bash
bun install
```

## Usage

```typescript
import { Account, Subreddits, Users } from 'reddit-api-ts-docs';
import { RedditUserSchema, ListingSchema } from 'reddit-api-ts-docs';

// Access endpoint definitions
const meEndpoint = Account.docs[0]; // GET /api/v1/me

// Use schemas for validation
const user = RedditUserSchema.parse(apiResponse);

// Use listing schema factory
const userListing = ListingSchema(RedditUserSchema).parse(response);
```

## Doc Groups

The library includes the following doc groups:

- **Account** - User account management and preferences
- **Announcements** - Reddit announcements
- **Captcha** - Captcha requirements
- **Emoji** - Subreddit emoji management
- **Flair** - User and link flair
- **LinksAndComments** - Posts and comments
- **Listings** - Content feeds and listings
- **LiveThreads** - Live thread management
- **Misc** - Miscellaneous endpoints
- **Modnote** - Moderator notes
- **Moderation** - Moderation actions and queues
- **Multis** - Multireddits/custom feeds
- **NewModmail** - New modmail system
- **PrivateMessages** - Private messaging
- **Search** - Search functionality
- **Subreddits** - Subreddit management
- **Users** - User profiles and content
- **Widgets** - Subreddit widgets
- **Wiki** - Wiki page management

## Development

### Type Checking

```bash
bun run typecheck
```

### Linting

```bash
bun run lint
```

### Auto-fix Linting Issues

```bash
bun run lint:fix
```

## Project Structure

```plaintext
src/
├── doc.ts              # Core type definitions
├── schemas.ts          # Shared schemas and types
├── index.ts            # Main exports
└── groups/             # Doc group implementations
    ├── Account.ts
    ├── Subreddits.ts
    ├── Users.ts
    └── ...
```

## Built With

- [Bun](https://bun.com) - JavaScript runtime
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Zod](https://zod.dev/) - Schema validation
- [Biome](https://biomejs.dev/) - Linting and formatting

## License

This project is open source and available under the MIT License.
