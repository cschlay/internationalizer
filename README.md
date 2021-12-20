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

## Translation Project Setup

Add file `translations/i18n.config.json` and put the locales you want to translate into

```json
{
  "locales": ["en", "fi"]
}
```

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
Files other than those folders may not be found. Also, the structure of the file must be, other sructures will get overwritten:

```typescript jsx
/* eslint-disable react/display-name */
import { I18nTemplate, I18nTextNode, Translation } from "@/types/Translation";

/**
 * Only one docstring allowed
 * 
 * Multiple preview urls and storybook urls may exists
 * 
 * @preview /change-password
 * @preview /register
 * @storybook iframe.html?id=composites-numberfield--decimal&args=type:!undefined;name:!undefined
 */
export const FileNameI18n: Translation = {
    exampleKey: {
        en: "Hello",
        fi: "Example"
    },
    templated: {
        en: ({ price }) => <>It costs {price}</>,
        fi: ({ price }) => <>Maksaa {price}</>
    }
};

export interface FileNameI18nType {
    exampleKey: I18nTextNode;
    tempalted: I18nTemplate
}
```

The style requirement is to use semicolon `;` it makes parsing much easier and matches the style of C#.

### Language Previews

To support previews with different languages add a development only mode for `lang` parameter which shows proper language.
The other way is to modify the `utils/formatPreviewUrl` to prepend the language code if urls are formatted as `/{languageCode}/...`.

When more than one previews exists, the first storybook url will take the highest priority since those are more specific.

## Errors

All errors must be handled. No try-catch statements allowed.
