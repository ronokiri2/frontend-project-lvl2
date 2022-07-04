#!/usr/bin/env node
import { program } from 'commander';
import gendiff from '../src/gendiff.js';

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('0.2.0')
  .option('-f, --format <type>', 'output format')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
	console.log(gendiff(filepath1, filepath2))
  });

program.parse();
