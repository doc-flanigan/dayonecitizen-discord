# DayOneCitizen.com — Discord Server Setup

Companion Discord for [dayonecitizen.com](https://dayonecitizen.com) — Star Citizen for brand-new players.

---

## Role Structure

### Access Roles (control what members can see)

| Role | Purpose |
|---|---|
| **Pending** | Auto-assigned on join. Can only see #welcome and #rules. Removed when member verifies. |
| **Member** | Assigned after verification. Full access to all channels. |

### Experience Roles (cosmetic — self-assigned, no channel permissions)

| Role | Audience |
|---|---|
| 🔭 Just Curious | Hasn't played yet / browsing |
| 🌱 Day One | Brand new — first week |
| ⭐ Week One | Played for about a week |
| 🪐 First Month | Played for about a month |
| 🎖️ Returning Pilot | Veteran coming back to the game |

Experience roles are **mutually exclusive** (Unique mode in Carl-bot) — members pick one and can change it any time.

---

## Channel Permission Logic

### Server-level (@everyone)
- **View Channels** → ✗ OFF

This hides the entire server from unverified users by default.

### Member role
- **View Channels** → ✓ ON (server-level)

Members see all channels.

### Pending role
- No server-level permissions
- Explicitly granted **View Channel** on #welcome and #rules only (set per-channel)

### Setting per-channel permissions
1. Right-click channel → Edit Channel → Permissions → "+"
2. Add the **Pending** role
3. Set **View Channel** → ✓ (green)
4. Save

> **Important:** Do not add @everyone to individual channel permission overrides — the server-level deny is sufficient.

---

## New User Flow

```
User joins server
      ↓
Auto-assigned: Pending role (Carl-bot Autorole)
      ↓
Lands in #rules (only channel they can see)
      ↓
Clicks verification button (Carl-bot Button Role)
      ↓
Member role assigned / Pending role removed
      ↓
All channels unlock
      ↓
User visits #choose-your-role
      ↓
Picks one experience role (Day One / Week One / etc.)
```

---

## Bots

### Carl-bot (`carl.gg`)

The only bot needed for this server's current setup. Handles verification, welcome messages, reaction/button roles, and auto-moderation.

**Required permissions on invite:** Manage Roles, Manage Channels, Send Messages, Embed Links, Add Reactions, Read Message History.

**Role hierarchy requirement:** Carl-bot's role must sit **above** the Member and Pending roles in Server Settings → Roles. Otherwise it cannot assign/remove those roles.

---

## Carl-bot Configuration

### 1. Autorole (assign Pending on join)

Dashboard → **Roles → Autoroles**
- Add role: **Pending**
- Delay: 0 seconds

### 2. Verification button (#rules channel)

Dashboard → **Reaction Roles → Create message**

| Setting | Value |
|---|---|
| Channel | #rules |
| Mode | **Verify** (single-use, cannot be undone) |
| Button label | ✅ I've read the rules |
| Role granted | Member |
| Role removed | Pending |

### 3. Welcome message

Dashboard → **Welcome**

| Setting | Value |
|---|---|
| Channel | #welcome |
| Enabled | Yes |

Suggested message:
```
Welcome to the DayOneCitizen.com Discord, {user.mention}!

New to Star Citizen? You're in the right place.
Head to #rules and click the button to get full access. o7
```

### 4. Experience role picker (#choose-your-role channel)

Dashboard → **Reaction Roles → Create message**

| Setting | Value |
|---|---|
| Channel | #choose-your-role |
| Mode | **Unique** (one role at a time, swappable) |
| Type | Buttons |

Buttons to add:

| Emoji | Label | Role |
|---|---|---|
| 🔭 | Just Curious | Just Curious |
| 🌱 | Day One | Day One |
| ⭐ | Week One | Week One |
| 🪐 | First Month | First Month |
| 🎖️ | Returning Pilot | Returning Pilot |

Suggested message above the buttons:
```
How long have you been a citizen?
Pick the role that best describes you. You can change it any time.
```

### 5. Auto-moderation

Dashboard → **Automod** — enable at minimum:

| Filter | Setting |
|---|---|
| Spam / message flood | Enabled |
| Discord invite links | Enabled — delete + warn |
| Caps filter | Optional |

---

## Recommended Channel Structure

Suggested layout — adjust to match your actual setup:

```
── 📋 START HERE
   #welcome
   #rules
   #choose-your-role
   #announcements (read-only)

── 💬 COMMUNITY
   #general
   #introductions
   #off-topic

── 🚀 STAR CITIZEN
   #star-citizen-general
   #new-player-questions
   #ship-talk
   #free-fly-events

── 🎁 GIVEAWAYS
   #giveaway-announcements
   #giveaway-entries (read-only — bot posts only)

── 🔧 SERVER
   #bot-commands
```

---

## Post-Setup Checklist

- [ ] Carl-bot role is above Member and Pending in role hierarchy
- [ ] @everyone View Channels is OFF at server level
- [ ] Member role has View Channels ON at server level
- [ ] Pending role has View Channel granted on #welcome and #rules only
- [ ] Carl-bot Autorole assigns Pending on join
- [ ] Verification button in #rules grants Member + removes Pending
- [ ] Welcome message firing in #welcome
- [ ] Experience role picker in #choose-your-role (Unique mode)
- [ ] Automod enabled (spam + invite filter)
- [ ] Test the full flow with an alt account or Discord's Preview as Member feature
