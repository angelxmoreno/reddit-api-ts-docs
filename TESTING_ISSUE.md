# Add tests for schema validation and structural integrity

## Overview

Add a test suite to validate the integrity and correctness of the Reddit API TypeScript definitions.

## Proposed Test Categories

### 1. Structural/Metadata Tests (High Priority)

Tests that validate the structure and organization of the doc groups:

- [ ] Verify all 19 doc groups are exported from `index.ts`
- [ ] Check for duplicate URIs across all doc groups
- [ ] Ensure all docs have required fields (description, method, uri, schemas)
- [ ] Validate URI patterns (e.g., all start with `/`, path params use `{paramName}`)
- [ ] Verify HTTP methods are valid ('GET', 'POST', 'PUT', 'PATCH', 'DELETE')
- [ ] Check that all requestSchema are either null or valid Zod schemas
- [ ] Ensure all responseSchema are valid Zod schemas

**Value**: High - catches organizational issues, low maintenance burden

### 2. Schema Factory Tests (Medium Priority)

Tests for reusable schema factories:

- [ ] Test `ListingSchema()` generates valid schemas with proper nesting
- [ ] Test `ThingSchema()` generates valid schemas with correct kind literals
- [ ] Verify factory functions work with different type parameters
- [ ] Ensure generated schemas can parse/validate data correctly

**Value**: Medium-high - these are reusable across the codebase

### 3. Schema Validation Tests (Future/Optional)

Tests against real Reddit API responses:

- [ ] Collect sample responses from Reddit API endpoints
- [ ] Validate response schemas against real data
- [ ] Catch missing required fields, wrong types, incorrect optional/required distinctions

**Value**: Very high, but requires Reddit API credentials and test fixtures

**Challenges**: Need to collect real API responses, manage auth, handle rate limiting

## Test Framework Recommendation

Use Bun's built-in test runner since the project already uses Bun:

```bash
bun test
```

## Example Test Structure

```typescript
// tests/structural.test.ts
import { describe, test, expect } from 'bun:test';
import * as allExports from '../src/index.ts';
import { Account, Subreddits, Users } from '../src/index.ts';

describe('Structural Tests', () => {
  test('all doc groups are exported', () => {
    const expectedGroups = [
      'Account', 'Announcements', 'Captcha', 'Emoji', 'Flair',
      'LinksAndComments', 'Listings', 'LiveThreads', 'Misc',
      'Modnote', 'Moderation', 'Multis', 'NewModmail',
      'PrivateMessages', 'Search', 'Subreddits', 'Users',
      'Widgets', 'Wiki'
    ];

    for (const group of expectedGroups) {
      expect(allExports[group]).toBeDefined();
    }
  });

  test('no duplicate URIs across doc groups', () => {
    const allUris = new Set<string>();
    const duplicates: string[] = [];

    // Collect all URIs from all groups
    const groups = [Account, Subreddits, Users /* ... */];

    for (const group of groups) {
      for (const doc of group.docs) {
        const key = `${doc.method} ${doc.uri}`;
        if (allUris.has(key)) {
          duplicates.push(key);
        }
        allUris.add(key);
      }
    }

    expect(duplicates).toHaveLength(0);
  });
});
```

## Implementation Notes

- Start with structural tests (easiest, most valuable)
- Add schema factory tests next
- Schema validation tests are optional and can be added if sample API responses become available
- Skip integration tests (live API calls) - too much overhead for a documentation library

## Acceptance Criteria

- [ ] Test suite runs via `bun test`
- [ ] All structural tests pass
- [ ] Test script added to `package.json`
- [ ] Tests added to pre-commit hooks (lefthook)
- [ ] Documentation updated with testing instructions in README
- [ ] Tests organized in `tests/` directory

## Additional Considerations

- Add coverage reporting
- Consider adding tests to CI/CD pipeline
- Document testing approach for contributors
