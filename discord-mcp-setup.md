# Setting Up a Discord MCP Server for Claude Desktop

> **Note:** There is no first-party Discord connector in Claude's registry. Setting up
> Discord MCP means installing a community-built server and pointing Claude at it.
> This is fully supported — it just takes a few manual steps.

---

## Step 1 — Create a Discord bot token

1. Go to the [Discord Developer Portal](https://discord.com/developers/applications).
2. Click **New Application**, give it a name.
3. Open the **Bot** tab → copy the **token** (you'll need this later).
4. Under **Privileged Gateway Intents**, enable **Message Content Intent** if you want
   the bot to read channel history.
5. Open the **OAuth2 → URL Generator**:
   - Scope: `bot`
   - Permissions: pick what you need (e.g. *Send Messages*, *Read Message History*,
     *Manage Channels*).
6. Open the generated URL in a browser to invite the bot to your server.

---

## Step 2 — Choose a Discord MCP server implementation

These are GitHub repos you clone and build — there is no official `npm install` package.

| Implementation | Stack | Best for |
|---|---|---|
| [v-3/discordmcp](https://github.com/v-3/discordmcp) | Node / TypeScript | Lightweight — send messages, read history. Good starting point. |
| [SaseQ/discord-mcp](https://github.com/SaseQ/discord-mcp) | Java | Broader feature set. |
| [HardHeadHackerHead/discord-mcp](https://github.com/HardHeadHackerHead/discord-mcp) | — | Full admin (134 tools), ships an interactive setup wizard. |

---

## Step 3 — Build the server

For the Node-based options:

```bash
git clone https://github.com/v-3/discordmcp.git
cd discordmcp
npm install
npm run build
```

Note the path to the built entry file (e.g. `build/index.js`).

---

## Step 4 — Wire it into Claude Desktop

Open your config file at:

```
C:\Users\wesle\AppData\Roaming\Claude\claude_desktop_config.json
```

You can also reach it from Claude Desktop via **Settings → Developer → Edit Config**.

Add a `discord` entry under `mcpServers`:

```json
{
  "mcpServers": {
    "discord": {
      "command": "node",
      "args": ["C:\\path\\to\\discordmcp\\build\\index.js"],
      "env": {
        "DISCORD_TOKEN": "your-bot-token-here"
      }
    }
  }
}
```

Replace the `args` path with your real build path and paste in your bot token.

---

## Step 5 — Restart and enable

1. **Fully quit** Claude Desktop and reopen it.
2. In a conversation, click the **"+" button → Connectors** and toggle Discord on.

---

## Security note

A Discord MCP runs third-party code with your bot token, which can act inside your
server. To stay safe:

- Only use repos you've reviewed.
- Give the bot the **minimum permissions** it needs.
- Never share or commit your bot token.

---

### Sources

- [Getting Started with Local MCP Servers on Claude Desktop](https://support.claude.com/en/articles/10949351-getting-started-with-local-mcp-servers-on-claude-desktop)
- [Use connectors to extend Claude's capabilities](https://support.claude.com/en/articles/11176164-use-connectors-to-extend-claude-s-capabilities)
- [v-3/discordmcp](https://github.com/v-3/discordmcp)
- [SaseQ/discord-mcp](https://github.com/SaseQ/discord-mcp)
- [HardHeadHackerHead/discord-mcp](https://github.com/HardHeadHackerHead/discord-mcp)
