/**
 * This file contains utility functions for working with test tags.
 * Tags are used to categorize tests for selective execution.
 * 
 * Example usage:
 * - Add @smoke or @regression tags in test descriptions
 * - Run only smoke tests with 'npm run test:smoke'
 */

/**
 * Extracts tags from test title
 * @param title Test title
 * @returns Array of tags
 */
export function extractTags(title: string): string[] {
  const tagRegex = /@(\w+)/g;
  const matches = title.match(tagRegex);
  
  if (!matches) {
    return [];
  }
  
  return matches.map(tag => tag.substring(1));
}

/**
 * Filters tests by tag
 * @param title Test title
 * @param tags Tags to filter by
 * @returns True if the test has any of the specified tags
 */
export function hasTag(title: string, tags: string[]): boolean {
  const testTags = extractTags(title);
  return testTags.some(tag => tags.includes(tag));
}

/**
 * Tag class for test organization
 * These can be used to categorize tests in a more structured way
 */
export class Tags {
  static readonly SMOKE = 'smoke';
  static readonly REGRESSION = 'regression';
  static readonly INTEGRATION = 'integration';
  static readonly PERFORMANCE = 'performance';
  static readonly SECURITY = 'security';
  static readonly FLAKY = 'flaky';
  static readonly WIP = 'wip'; // Work in progress
}