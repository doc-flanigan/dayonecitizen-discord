# dayonecitizen-discord

Setup scripts and notes for the Day One Citizen Discord server.

- `onboarding.mjs` sets up native onboarding (journey roles and ping opt-ins). See `SETUP.md`.
- `discord-mcp-setup.md` shows how to connect the Discord MCP server for Claude Code sessions.
- `join-us-discord.png` is the shared "join us" image.

Scheduled bot jobs (such as the news heartbeat in `dayonecitizen-main` and source-watch in
`sc-portfolio`) run as GitHub Actions in those repos, not here. The bot token lives only in
Actions secrets. Never commit it.
