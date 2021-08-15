## Installation

Install [Node.js](https://nodejs.org/en/). Choose LTS version if unsure.

```bash
yarn install
```

## Translator Instructions

Create a new file `.env` and add project location e.g.

```bash
NEXT_PUBLIC_PROJECT_DIRECTORY=C:/Home/Projects/ExampleApp
```

Then start the server in command line:

```bash
yarn dev
```

Open the following link in Chrome [http://localhost:3001](http://localhost:3001).

## Developer Instructions

In project, modify the `tsconfig.json` to contain the following lines:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/types/*": ["types/*"]
    }
  }
}
```

Also ensure that `types/Translation.ts` contains the definitions

```typescript
import { Locales } from "../constants/Locales";
import { ReactNode } from "react";

export type I18nTemplate = (args: Record<string, any>) => string | ReactNode;

export type I18nTextNode = string | ReactNode | I18nTemplate;

export type LocalizedTexts = {
    [Locales.EN]: I18nTextNode;
    [Locales.FI]: I18nTextNode;
};

export type Translation = Record<string, LocalizedTexts>;
```

The locales you can define almost any browser supported locale such as `en-GB`, `en-US`,
you can find them at [Subtag Lookup Tool](https://r12a.github.io/app-subtags/).

### Defining Translation Files

The suggested location to put files are `/components/**/*.i18n.tsx` and `/translations/**/*.18n.tsx`.
Files other than those folders may not be found. Also, the structure of the file must be:

```typescript
export const FileNameI18n: Translation = {
    
};
```

The style requirement is to use semicolon `;` it makes parsing much easier and matches the style of C#.
