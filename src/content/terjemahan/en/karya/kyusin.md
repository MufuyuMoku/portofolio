---
jenis: Desktop app — games · Project Sinners
ringkas: A collection of light games — board, card, and casino — in one retro-terminal shell with a faint CRT effect. Played visually, with a text-command mode as an option. Two languages, no account and no internet.
status: In progress — M6b done · Oct 2026
periode: September 2026 — ongoing
peran: Specification, scope decisions, and verification of every milestone; implementation with Claude Code
platform: Desktop — Windows and Linux (no installer yet)
spek:
  - label: Finished games
    nilai: "33"
    catatan: Meet the Definition of Done in SPEC §7, as of M6b. For the seven solo games, the bot point does not apply.
  - label: Rust tests
    nilai: "375"
    catatan: From the M6b session log in PROGRESS.md, plus 49 UI tests.
  - label: Casino bets with RTP
    nilai: "58"
    catatan: 41 in M6a and 17 in M6b; all below 100%, computed exactly and then matched against simulation in CI.
  - label: Chess levels
    nilai: "6"
    catatan: Calibrated against Stockfish 19; levels 5 and 6 are about 1826 and 2093.
tautanLabel:
  - Code on GitHub
---

## What it is

KyuSin — project label *Project Sinners* — is a desktop app holding many
light games in one retro-terminal shell: a phosphor theme, a faint CRT effect
whose intensity can be adjusted, and a boot sequence. Everything runs
locally: no account, no internet, no ads, and no purchases. The interface is
available in Indonesian and English, and translation completeness is checked
in CI.

The main way to play is visual: dragging pieces, clicking cards, placing
chips on the table. A text-command mode (`e2e4`, `hit`, `bet 50`) is there
for those who like it, but it is never required. Behind the scenes, every
visual action is translated into the same action as a text command — and that
action is what other players over LAN, and AI agents, will later send.

## The big plan

Three end goals, in order:

1. **Singleplayer.** Every game can be played against a bot or dealer, with
   tutorials, ratings, and chips.
2. **Multiplayer without internet.** Playing together over the same local
   network (LAN/Wi-Fi).
3. **Playing together with [Project Nor-4](/portofolio/en/karya/nor-4/).** A
   local AI agent joins as a player through the same protocol as LAN players.

Right now the work is still on the road to the first goal.

## What is done

As of M6b (23 October 2026), 33 games meet the Definition of Done: rules and
tests, bots, visuals, text commands, an interactive tutorial guarded by
automated tests, replays, and a manifest. The seven lottery and instant games
are played alone against the house, so the bot point does not apply to them.

| Group | Games |
| --- | --- |
| Board | Reversi, Chess |
| Cards against the dealer | Blackjack, Baccarat, Dragon Tiger, Casino War, Red Dog, Andar Bahar, Three Card Poker, Caribbean Stud, Casino Hold'em, Let It Ride, Pai Gow Poker |
| Cards between players (against bots) | Texas Hold'em, Omaha, Teen Patti, Capsa Susun, Domino QiuQiu |
| Dice, wheels, tiles | European Roulette, American Roulette, Craps, Sic Bo, Big Six, Fan-Tan, Pai Gow tiles, Chuck-a-luck |
| Lottery and instant (solo) | Keno, Bingo, Scratch cards, Hi-Lo, Video Poker: Jacks or Better, Deuces Wild, Joker Poker |

Chess has six levels calibrated against Stockfish 19 — Stockfish is only used
as a measuring tool on the developer's machine and is not bundled. Local
ratings use Glicko-2.

## An honest casino

- **Real numbers.** Rules and pay tables use real casino numbers, and every
  casino game shows its actual RTP or house edge. The numbers are computed
  exactly — by enumeration or Markov chains — and then matched against
  simulation in CI. For Pai Gow tiles, the enumeration covers 736,281,000
  deals.
- **Chips can never be bought, cashed out, or transferred** between players.
- **Provable randomness.** Every shuffle and roll comes from a seed combined
  from all participants. A commitment (hash) of each seed is announced before
  the round and all seeds are revealed afterwards, so the result can be
  verified and no party — including the host — can choose it. A limit that
  is openly acknowledged: in hidden-card games, the host app technically
  knows the deck order while the round is running.
- **Replays of every match**, because each match is just a seed plus a
  sequence of commands.

## Next

| Milestone | Contents |
| --- | --- |
| M7 | Casino arcade, with a contract for games that run on time |
| M8 | The remaining non-casino board and card games, including Gaple, Cangkulan, and Remi — **end goal 1** |
| M9 | LAN: host and join, automatic discovery, lobby, provably fair across the network — **end goal 2** |
| M10 | Agent protocol and a test agent — **end goal 3**, without waiting for Nor-4 |
| M11 | Windows installer and Linux `.deb` package from CI, a third-party license page |
| M12 | New games as WASM cartridges, without rebuilding the app |

There is no installer file yet; that only arrives in M11.
