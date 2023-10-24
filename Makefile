export:
		yarn # Install dependencies
		yarn run build
		yarn run export

deploy: export
		NODE_ENV=production firebase deploy