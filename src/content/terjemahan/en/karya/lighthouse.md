---
jenis: Desktop app — a resting room
ringkas: A personal resting room as a desktop app — a lighthouse by the sea for focusing, resting, listening to the radio, and keeping notes. Fully local, no account.
status: In progress — M0 done · Oct 2026
periode: October 2026 — ongoing
peran: Specification, scope decisions, and verification of every milestone; implementation with Claude Code
platform: Desktop — Windows and Linux
catatan: The repo is private. Only the foundation has been built so far.
spek:
  - label: Milestones done
    nilai: "1 / 10"
    catatan: M0 foundation, 25 October 2026. M1–M9 not started.
---

## What it is

SS Lighthouse is a personal "resting room" in the form of a desktop app. Its
user is the keeper of a lighthouse by the sea. While working, the lighthouse
lamp switches on and turns, sweeping the water. On a break, the keeper goes
down to the jetty and rows a boat toward the sunset. Every focus session that
is finished leaves a seashell to collect. On the desk there is a radio that
picks up real broadcasts, and a keeper's notebook for writing and doodling.

The mood is inspired by a VTuber's *lore* — a lighthouse keeper, a shell
collector, a rowing boat — but only through symbols and atmosphere, with none
of the official name, art, or logo.

## Principles

- **Calm first, features later.** No nagging notifications and no stressful
  statistics. A session stopped halfway only makes the lamp dim, with no
  scolding message.
- **Fully local.** No account and no server; the internet is only used for
  the radio.
- **Light**, so it is comfortable to leave running in the background for
  hours.

## Planned for v1

A low-poly 3D scene rendered at low resolution and then scaled up, with a
limited palette and dithering. The sky follows the laptop's clock and the
weather changes slowly. A "Keep the Lamp" focus mode and a "Boat" break mode,
a shell shelf whose shapes and colors come from session length, time of day,
and weather, a daily notebook with a text layer and a pen layer, internet
radio, an ambient sound mixer, and a mini window and tray.

## Status

Only M0 is done (25 October 2026): the Tauri 2 and SvelteKit project, SQLite
with its first migration and tests, an empty window in a night color, a
locally bundled palette and fonts, and CI builds for Windows and Linux. The
lighthouse icon has not been made yet. The nine milestones after that — from
the basic scene to settings — have not started.
