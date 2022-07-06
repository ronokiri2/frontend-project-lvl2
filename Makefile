install:
		npm ci

gendiff:
		node bin/gendiff.js

publish:
		npm publish --dry-run

lint:
		npx eslint .

fix:
		npx eslint . --fix

test:
	npm test

run:
	gendiff file1.json file2.json

test-coverage:
	npm test -- --coverage --coverageProvider=v8