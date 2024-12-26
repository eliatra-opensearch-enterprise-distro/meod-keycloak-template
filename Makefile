all: build
prevmail:
	npx email preview ./emails/
prevkk:
	npx keycloakify start-keycloak --keycloak-version 26
build:
	npm run build-keycloak-theme