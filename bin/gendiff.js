#!/usr/bin/env node

console.log("Welcome to the gendiff.js file!")

import { program } from 'commander';

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('0.1.0');

program.parse();