#!/usr/bin/env node
import React from 'react';
import { render } from 'ink';
import meow from 'meow';
import App from './app.js';

const cli = meow(
  `
    Usage
      $ up-d4te

    Options
      --name  Your name

    Examples
      $ up-d4te --name=Jane
      Hello, Jane
  `,
  {
    importMeta: import.meta,
  }
);

render(<App />);
