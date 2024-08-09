## B68 Notify Service

Deno micro backend that helps to notify [@bravo68web](https://github.com/bravo68web) about service and audit logs.

### Setup and Deploy

1. Clone this repository

2. Create `.env` file like this
```bash
DISCORD_WEBHOOK=https://discord.com/api/webhooks/x/y
```

3. Run locally
```bash
deno run --allow-read  --allow-env --allow-net  --env main.ts
```

4. Deploy to `Deno run`
```bash
deployctl deploy --env-file .env --save-config
```
