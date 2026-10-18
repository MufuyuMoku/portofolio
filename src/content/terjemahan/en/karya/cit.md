---
jenis: Desktop app
ringkas: A version tracker for design files. It watches a work folder, records every time a file is saved, and arranges the saves into a timeline. No server, no account, no internet.
status: Stopped after M6
periode: 3 — 18 September 2026
peran: Specification, scope decisions, and verification of every milestone; implementation with Claude Code
platform: Desktop — Windows and Linux
spek:
  - label: Go tests
    nilai: "249"
    catatan: Counted from func Test… functions across all packages; matches the table in docs/STATUS.md.
  - label: Tagged milestones
    nilai: "9"
    catatan: m0 to m6, plus m1a and m4a. Last tag m6.
  - label: Schema version
    nilai: "9"
    catatan: Nine versioned migrations in internal/store.
  - label: Packages not built
    nilai: "2"
    catatan: internal/retention and internal/sync — they only contain doc.go.
tautanLabel:
  - Repository
---

## The problem it solves

Design work piles up as files named `final_fix_revisi3_ok.psd`, and the real
history gets lost among those names. Client requests are scattered across
chats, and nobody knows which version who is waiting for.

Git was made for a different problem: it is designed for text that can be
read line by line, while an 800 MB PSD is just a binary blob that can be
neither *diffed* nor merged — and it asks people to stop working to write a
commit message. CIT turns that around: the user just presses Ctrl+S as
usual, and the system adapts.

The target users are graphic design (DKV) students, design freelancers, and
small studios. Everything runs on your own computer.

## Why it stopped

Before moving on to retention, I asked DKV students — the target users — how
they save and track their design files. They did not feel the problem above.
Building further for a problem its users don't feel is not the right
decision, so development stopped after M6.

## The golden rule

> The system observes and suggests. Humans decide.

That one sentence answers design decisions that are not written in the
specification:

- What **can be undone** is done right away without asking, as long as it is
  visible and easy to undo.
- What **cannot be undone** requires confirmation, with no option to turn it
  off.
- **Never a popup.** The app does not interrupt. Everything that needs review
  piles up in one Review Box that the user opens when they want.

The consequences are concrete. Automatic grouping is applied directly because
it can be undone — but once the user separates two files by hand, that
decision is permanent and no calculation may reverse it. A guess that
reasserts itself on every scan is not a suggestion; it is an argument the
user cannot win.

A new version of a work that has an open ticket marks that ticket "maybe
done" — and stops there.

## The invariants it holds, and why

- **Restoring a file must be identical byte for byte.** This is
  non-negotiable: if `Restore(hash)` does not produce exactly the file that
  went into `Store()`, every layer above it is meaningless. Each chunk is
  verified against its hash before it is handed over, with no switch to turn
  that off. If verification fails, no file is written at all — better to fail
  openly than to hand over a half file that looks whole.
- **Version metadata is never deleted.** Thinning only discards file content.
  The timeline must never have holes; versions whose content was discarded
  still appear with a marker.
- **Chunks are only deleted at a refcount of zero.** Chunks are shared between
  versions, so deleting by the age of one version would damage other versions
  that are still young.
- **Immune to pruning, without exception:** the latest version of each work,
  manually marked versions, and versions with an open ticket.
- **A ticket can never stand alone.** It is always tied to a work. This limit
  defines the product: tickets that could float would turn CIT into an
  ordinary to-do app.
- **Tickets attach to a version, not to a file name or path.** The anchor is
  `version_id`, not the content hash — because two byte-identical saves are
  one content but two versions that can live in two different works, so a hash
  key would show up in both and could not name the work.
- **No file is rejected.** Unrecognized formats are still stored and
  versioned; only their preview becomes a generic icon.

## Enforced by the database, not by discipline

Rules like "versions are never deleted" and "tickets cannot stand alone" are
guarded by triggers and foreign keys, not by an agreement that everyone who
touches the code later has to remember. A schema that rejects floating
tickets is what defines this product.

Another hard limit held from the start: all of `/internal` must build and
test with `CGO_ENABLED=0`, so the core of the app can be tested without a C
toolchain. SQLite always goes through `modernc.org/sqlite` — pure Go. The
only outside dependency is `ffmpeg`, and even that is optional: without it,
video previews become a generic icon and the app keeps running.

There is no AI model anywhere. All the grouping "smarts" come from perceptual
hashes, regex, and time comparison — nothing that can go stale or needs to be
downloaded.

## Testing

Number of test functions per package, counted from the source tree:

| Package | Contents | Tests |
| --- | --- | --- |
| `internal/grouping` | pHash, name similarity, time clusters | 70 |
| `internal/store` | SQLite, schema, migrations | 43 |
| `internal/preview` | tiered thumbnails | 43 |
| `internal/vault` | chunking, blob store, refcount | 38 |
| `internal/ingest` | folder scanner and watcher | 30 |
| `cmd` | Wails app layer | 18 |
| `internal/ticket` | tickets and the review box | 7 |
| `internal/retention` | not built | 0 |
| `internal/sync` | not built | 0 |
| **Total** | | **249** |

For `internal/vault` the rule was that tests are written before the
implementation, because that package could destroy user data. The same rule
was set for `internal/retention`, which in the end was not built.

What matters more than the count is how the bugs were caught. Each milestone
has a devlog with fixed sections: what was built, the decisions and their
reasons, the bugs that were caught **and what caught them**, and what was
deliberately skipped. A few that were recorded:

- **The M4 suite passed on the first try, and that was the suspicious part.**
  Instead of accepting it, the Hamming distances and normalization outputs
  were checked one by one. That uncovered the next three bugs.
- **A test that tested nothing.** The pair's Hamming distance was 24, below
  the veto threshold of 26 — so the veto it was supposed to test never fired.
  Fixed with a pair at distance 44 plus a precondition assertion that fails
  if the distance ever drops below the threshold again.
- **`logo_v2.png` merged two clients' histories into one work**, because name
  normalization used `filepath.Base`, so identical names in unrelated folders
  switched off the pHash veto. Proven with a test that failed first, then
  fixed: identical names only switch off the veto if both are in the same
  folder tree.
- **The ticket tests were checked by sabotage.** One `UPDATE versions` line
  was removed temporarily; both tests went red immediately. So both really
  test the mechanism they claim to, rather than passing by chance.
- **Migrations had never been tested against a database that already had
  rows.** Caught with `grep`: zero references to the new column in the
  migration test file. After that, migration tests run from every schema
  version, not just from an empty database.

## Status, as it is

Stopped after M6, and the repo is archived. Last tag `m6` — tickets and the
review box. The database schema is at version 9. All of `make test` is green
with `CGO_ENABLED=0`.

Done and proven to work: a content-addressed vault with FastCDC and refcount;
an SQLite catalog with nine migrations; a folder scanner and watcher with
debouncing; tiered previews; three-signal grouping with permanent manual
decisions; two-way tickets with a review box; and a Wails app that ties it
all together.

Not built:

- **`internal/retention`** (history thinning and garbage collection) and
  **`internal/sync`** (copying between folders or removable disks). Both only
  contain design documentation, with zero tests. The interface can display
  versions whose content was discarded, but nothing ever discards it.
- **Enforcing the "immune to pruning" invariant**, because retention was not
  built. All three of its inputs — the latest version, manually marked
  versions, and versions with an open ticket — exist and are tested.
- **Automated tests for the frontend.** Its only automated check is
  `npm run check`, outside `make test`.
- **Testing `./cmd` outside Windows.** Wails forces CGO on Linux and macOS,
  so those 18 tests have only ever run on Windows.
- **A token index to prune Levenshtein comparisons**, so grouping stays
  O(n²). Measured at ~860 ns per pair: 0.5 seconds for 1,000 files, about
  44 seconds for 10,000. These numbers are measured, not estimated.

## Deliberately not built

Rejected up front so they would not be offered again: Git-style merging of
binary files, any AI model, accounts and authentication, a server,
subscriptions, telemetry, p2p over the internet, and comments pinned to
points on an image. Deleting tickets, deadlines, and reminders are also not
there — a reminder means interrupting, and CIT does not interrupt.
