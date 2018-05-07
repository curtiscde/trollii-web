// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  version: '0.29.0',
  webUrl: 'http://localhost:4200',
  serviceUrl: 'http://localhost:8080',
  googleAnalyticsKey: 'UA-116772216-1',
  auth0: {
    domain: 'curt.auth0.com',
    clientId: '1fe4r254Q8wnuPclBDFi6iGBNGYLNT2Z',
    callbackURL: 'http://localhost:4200/login-callback',
    audience: 'https://trolliidev.com/'
  }
};
