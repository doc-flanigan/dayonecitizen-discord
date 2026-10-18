// Configure Discord native onboarding for Day One Citizen via raw API.
// Token read from local Claude MCP config; never printed.
import { readFileSync } from 'node:fs';

const cfg = JSON.parse(readFileSync('C:/Users/Doc Flanigan/.claude.json', 'utf-8'));
const TOKEN = cfg.mcpServers.discord.env.DISCORD_TOKEN;
const GUILD = '1465522722707869800';

const ROLES = {
  justCurious: '1505955200693960755',
  prospect: '1507475324370292988',
  returning: '1505955200152899844',
  seasoned: '1505955196340011038',
  patchDrops: '1505955216284057620',
  serverEvents: '1505955217123053698',
  iaeIlw: '1505955217936482364',
};

const CHANNELS = {
  welcome: '1505955219656278207',
  rules: '1505948125821665436',
  announcements: '1505955224505024694',
  intro: '1505956273936535805',
  general: '1465522723395731697',
  help: '1505956275215794319',
  screenshots: '1505956287333273670',
  voiceGeneral: '1507256893318500382',
  voiceHelp: '1505956293662343359',
};

const payload = {
  enabled: true,
  mode: 0, // ONBOARDING_DEFAULT
  default_channel_ids: Object.values(CHANNELS),
  prompts: [
    {
      id: '0',
      type: 0,
      title: 'Where are you on your Star Citizen journey?',
      single_select: true,
      required: true,
      in_onboarding: true,
      options: [
        {
          title: 'Just curious',
          description: "Haven't bought the game (yet) — here to learn what it is",
          emoji_name: '👀',
          role_ids: [ROLES.justCurious],
          channel_ids: [],
        },
        {
          title: 'Brand new player',
          description: 'Just starting out in the ‘Verse',
          emoji_name: '🚀',
          role_ids: [ROLES.prospect],
          channel_ids: [],
        },
        {
          title: 'Returning after a break',
          description: "Catching up on what's changed",
          emoji_name: '🔄',
          role_ids: [ROLES.returning],
          channel_ids: [],
        },
        {
          title: 'Been flying for years',
          description: 'Veteran pilot / longtime backer',
          emoji_name: '🎖️',
          role_ids: [ROLES.seasoned],
          channel_ids: [],
        },
      ],
    },
    {
      id: '1',
      type: 0,
      title: 'Which pings do you want?',
      single_select: false,
      required: false,
      in_onboarding: true,
      options: [
        {
          title: 'Patch Drops',
          description: 'New game updates and hotfixes',
          emoji_name: '🔔',
          role_ids: [ROLES.patchDrops],
          channel_ids: [],
        },
        {
          title: 'Server Events',
          description: 'Community game nights and meetups',
          emoji_name: '📅',
          role_ids: [ROLES.serverEvents],
          channel_ids: [],
        },
        {
          title: 'Sales & ship expos',
          description: 'Starter-pack sales, Free Fly weeks and the big IAE / ILW ship shows',
          emoji_name: '🛰️',
          role_ids: [ROLES.iaeIlw],
          channel_ids: [],
        },
      ],
    },
  ],
};

const res = await fetch(`https://discord.com/api/v10/guilds/${GUILD}/onboarding`, {
  method: 'PUT',
  headers: {
    Authorization: `Bot ${TOKEN}`,
    'content-type': 'application/json',
    'X-Audit-Log-Reason': 'Onboarding: rename expo ping to Sales & ship expos',
  },
  body: JSON.stringify(payload),
});
console.log('status:', res.status);
const body = await res.text();
if (!res.ok) {
  console.log(body.slice(0, 2000));
} else {
  const j = JSON.parse(body);
  console.log('enabled:', j.enabled, '| mode:', j.mode);
  console.log('default channels:', j.default_channel_ids?.length);
  for (const p of j.prompts || []) {
    console.log(`prompt: ${p.title} (${p.options.length} options, single=${p.single_select}, required=${p.required})`);
  }
}
