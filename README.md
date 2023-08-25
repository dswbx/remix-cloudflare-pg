# Remix Cloudflare PG issue
Unsuccessful attempt to get remix on cloudflare running with PG, although PG should be now supported by cloudflare worker environments. I've confirmed, that it works with cloudflare workers directly.

## Steps to reproduce
1. Pull this repo
2. Run `pnpm install` (or `npm install`)
3. Adjust Postgres connection string at `src/routes/api/test.ts` to point to your database
4. Run dev server with `pnpm dev` (or `npm run dev`)
5. Access route at `http://localhost:3000/api/test`

Note the console output, which looks somewhat like:

```
> remix dev --manual -c "npm run start"


 💿  remix dev

 warn  The `serverNodeBuiltinsPolyfill` config default option will be changing in v2
┃ Server polyfills will no longer be provided by default for non-Node.js platforms.
┃ You can prepare for this change by specifying server polyfills, or opting out entirely.
┃ -> https://remix.run/docs/en/v1.19.0/pages/v2#servernodebuiltinspolyfill
┗
 warn  The `devServerBroadcastDelay` config option will be removed in v2
┃ Enable `v2_dev` to eliminate the race conditions that necessitated this option.
┃ -> https://remix.run/docs/en/v1.19.3/pages/v2#devserverbroadcastdelay
┗
 info  building...
✘ [ERROR] Could not resolve "dns"

    node_modules/.pnpm/pg@8.11.3/node_modules/pg/lib/connection-parameters.js:3:18:
      3 │ var dns = require('dns')
        ╵                   ~~~~~

  The package "dns" wasn't found on the file system but is built into node. Are you trying to bundle for node? You can use "platform: 'node'" to do that, which will remove this error.


✘ [ERROR] Could not resolve "net"

    node_modules/.pnpm/pg@8.11.3/node_modules/pg/lib/connection.js:3:18:
      3 │ var net = require('net')
        ╵                   ~~~~~

  The package "net" wasn't found on the file system but is built into node. Are you trying to bundle for node? You can use "platform: 'node'" to do that, which will remove this error.


✘ [ERROR] Could not resolve "net"

    node_modules/.pnpm/pg@8.11.3/node_modules/pg/lib/stream.js:6:22:
      6 │   const net = require('net')
        ╵                       ~~~~~

  The package "net" wasn't found on the file system but is built into node. Are you trying to bundle for node? You can use "platform: 'node'" to do that, which will remove this error.


✘ [ERROR] Could not resolve "tls"

    node_modules/.pnpm/pg@8.11.3/node_modules/pg/lib/stream.js:21:20:
      21 │   var tls = require('tls')
         ╵                     ~~~~~

  The package "tls" wasn't found on the file system but is built into node. Are you trying to bundle for node? You can use "platform: 'node'" to do that, which will remove this error.
```

The start command `pn start` should already include `node-compat`:
```
wrangler pages dev --compatibility-date=2023-06-21 --node-compat ./public
```

It seems to be a build problem, as when you run wrangler dev command directly, the server starts (but not with the new code obviously):
```
wrangler pages dev --compatibility-date=2023-06-21 --node-compat ./public
```
