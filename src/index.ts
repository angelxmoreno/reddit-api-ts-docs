// Export doc group types
export type { Doc, DocGroup } from './doc.ts';

// Export all doc groups
export { Account } from './groups/Account.ts';
export { Announcements } from './groups/Announcements.ts';
export { Captcha } from './groups/Captcha.ts';
export { Emoji } from './groups/Emoji.ts';
export { Flair } from './groups/Flair.ts';
export { LinksAndComments } from './groups/LinksAndComments.ts';
export { Listings } from './groups/Listings.ts';
export { LiveThreads } from './groups/LiveThreads.ts';
export { Misc } from './groups/Misc.ts';
export { Moderation } from './groups/Moderation.ts';
export { Modnote } from './groups/Modnote.ts';
export { Multis } from './groups/Multis.ts';
export { NewModmail } from './groups/NewModmail.ts';
export { PrivateMessages } from './groups/PrivateMessages.ts';
export { Search } from './groups/Search.ts';
export { Subreddits } from './groups/Subreddits.ts';
export { Users } from './groups/Users.ts';
export { Widgets } from './groups/Widgets.ts';
export { Wiki } from './groups/Wiki.ts';

// Export shared schemas for reuse
export * from './schemas.ts';
