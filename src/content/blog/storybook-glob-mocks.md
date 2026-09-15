---
title: Glob those Mocks (for the Storybook Vitest Add-On)
publishDate: 2025-07-23
updatedDate: 2025-07-23T13:23:00.000Z
tags: [javascript, storybook, testing, typescript, vite]
excerpt: Auto-detect mocks in Storybook using glob
---

Storybooks Vitest integration is great for writing component tests. You already have the data set up and can just start pressing some buttons (programmatically).

As with any testing, sometimes you’ll need to mock something external to trigger a specific state. The Storybook docs already explain how to mock _single_ files. That is a good starting point but you’d need to remember to update the config for every mocked file. Using `glob` we can automatically find and alias all mocks, making new ones is as simple as creating the `.mock.ts` file.

My lil guide is using the `@storybook/react-vite` framework but it should be fairly simple to adapt it for `webpack` . I’m also assuming you’ve already setup component testing with Storybook and Vitest using their docs:

- [https://storybook.js.org/docs/writing-tests/interaction-testing](https://storybook.js.org/docs/writing-tests/interaction-testing)

- [https://storybook.js.org/docs/writing-tests/integrations/vitest-addon](https://storybook.js.org/docs/writing-tests/integrations/vitest-addon)

And finally, since I’m expanding on the on [Storybooks Mocking guide](https://storybook.js.org/docs/writing-stories/mocking-data-and-modules/mocking-modules#builder-aliases), so it s a good idea to have a look at first.

Now that all that is out of the way, here’s the `.storybook/main.ts` config with only the keys relevant for the mocking:

```typescript
// tinyglobby is already used by vite so you're not adding a new dependency
import { glob } from 'tinyglobby';
import path from 'node:path';
import type { StorybookConfig } from '@storybook/react-vite';

// update this if your source is somewhere else
const srcDir = path.resolve(__dirname, '../src/');

const config: StorybookConfig = {
	// ... your config
	// you should already have this if you're running tests through Storybook
	addons: ['@storybook/addon-vitest'],
	// this guide is for Vite, Webpack will need (likely small) modifications
	framework: '@storybook/react-vite',
	viteFinal: async (config) => {
		config.resolve = config.resolve ?? {};

		// mocking setup
		const newAliases: Record<string, string> = {};
		// find mock files
		for (const entry of await glob('**/*.mock.ts', { cwd: srcDir })) {
			// my-module.mock.ts => my-module
			const importPath = entry.replace('.mock.ts', '');
			// my-module.mock.ts => my-module.mock
			const replacementPath = entry.replace('.ts', '');
			// aliases imports of "my-module" to "my-module.mock"
			newAliases[importPath] = replacementPath;
		}
		config.resolve.alias = { ...config.resolve.alias, ...newAliases };

		return config;
	}
};

export default config;
```

And that’s it! That’s all you need for Storybook to pick up on mocks automagically!
