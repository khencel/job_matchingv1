# Messages Structure

This folder mirrors the source layout to make it easy to find translations.

## Structure

- app/**: Messages for route segments in src/app
- components/**: Messages for shared UI components in src/components

Each locale has the same structure:

- src/messages/en/
- src/messages/ja/

## Add New Messages

1. Find the source file path under src/app or src/components.
2. Create a matching JSON file under src/messages/{locale}/.
3. Add keys for the UI strings used in that page or component.

Example:
- Source: src/app/(with-auth)/employer/profile/page.tsx
- Messages:
  - src/messages/en/app/(with-auth)/employer/profile/employerProfile.json
  - src/messages/ja/app/(with-auth)/employer/profile/employerProfile.json

## Usage

```tsx
import { useTranslations } from 'next-intl';

const t = useTranslations('employerProfile');

return <h1>{t('title')}</h1>;
```

## Index Aggregation

All JSON bundles are aggregated in:

- src/messages/en/index.ts
- src/messages/ja/index.ts

The export keys match the JSON file names (without extension).
