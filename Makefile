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

runy:
	gendiff file1.yml file2.yml

runest:
	gendiff file3.json file4.json

test-coverage:
	npm test -- --coverage --coverageProvider=v8