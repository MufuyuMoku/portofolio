---
judul: About
kicau: How I work — Tools — Contact
---

## Position

I'm a vocational high school student majoring in Software Engineering
(Rekayasa Perangkat Lunak). What I build are tools: desktop apps that hold
people's files and must stay correct when they are closed abruptly, sites
that keep working without internet, tools for voice and sound, and a small
server at home.

The web is often the drawing layer — SvelteKit inside a Tauri webview, or
Astro for static sites — but the state and the rules live on the program
side: the Rust audio engine in Onsa, the game rules in KyuSin, the search
engine that runs on the device in Saku Pajak. That is why I don't call
myself a *web & mobile developer*: the work is on the program side, not the
page side.

Outside code I also write: game design documents, a novel, a short story,
and song lyrics. That writing has its own section on the home page.

These projects are made under **Pyonkuro**, my personal studio and workshop.

## How I work

1. **A written specification first.** A list of behaviors that must be
   correct, written before the interface is made. This document decides
   what done means.
2. **Milestones that can be checked.** Each stage has a clear scope and is
   only closed when its tests pass.
3. **Invariants, not just features.** Rules that must never be broken are
   written separately and guarded by automated tests.
4. **Tests that run the full cycle.** Not just small functions: scan, save,
   close, reopen, check.

I do the implementation with Claude Code. What I hold on to is the part that
decides its shape: the specification is written first, scope decisions are
mine, milestones are worked through in order, and I only accept a milestone
when its claims can be backed by evidence — tests that run, or checks someone
else can repeat. The decisions made along the way are recorded with their
reasons, and those records are part of the work:
[`docs/DECISIONS.md`](https://github.com/MufuyuMoku/onsa/blob/main/docs/DECISIONS.md)
in Onsa,
[`docs/DECISIONS.md`](https://github.com/MufuyuMoku/tax/blob/main/docs/DECISIONS.md)
in Saku Pajak — every decision is numbered, and a test fails if a number is
referenced but not recorded — and
[`docs/devlog/`](https://github.com/MufuyuMoku/cit/tree/main/docs/devlog)
in CIT, one note per milestone covering what was built, the bugs that turned
up, and what exposed them.

## Tools

Rust and Tauri 2 for desktop apps — Onsa, KyuSin, and SS Lighthouse. Go for CIT (with Wails)
and for the production system during my internship. SvelteKit and
TypeScript for interfaces. Astro for static sites — Saku Pajak and this site
— with Python for the Saku Pajak data pipeline. C# and .NET with Avalonia in
VocaVoca, following OpenUtau. Armbian, Docker, and systemd for the home
server. SQLite for local storage, and PostgreSQL for the Dunia Kopi online shop.
Git for everything.
