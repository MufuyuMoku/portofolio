---
ringkas: A factory production management information system, built during my industry internship. Go backend with Gin and GORM, a SvelteKit interface, and operators sign in by scanning a QR code on the machine.
status: Industry internship
periode: 5 January – 22 June 2026
peran: Intern — full-stack developer
lokasi: Bekasi, West Java, Indonesia
catatan: No public repository and no screenshots — the code and interface belong to the company.
---

## Placement context

PT Besq Sarana Abadi is a rubber and metal surface coating manufacturer,
certified ISO 9001:2015. The factory runs 24 hours a day in three shifts.

Production records were still kept by hand. The two things most prone to
error: calculating the daily Production Time Report (Laporan Waktu Produksi,
LWP), and recording how long a machine line stops — a *line stop*.

## What I worked on

A web-based factory production management information system, built
full-stack from the database schema to the operator interface on the
production floor.

Beyond the software, the scope also covered maintaining the company's
internal network configuration. The details are not written here.

## How the system is built

A Go backend with Gin and GORM on top of an SQLite database. Authentication
uses JWT, with tiered access: Admin, Manager, Team Leader, and Operator. The
SvelteKit frontend uses Svelte 5 Runes.

Operators sign in by scanning a QR code stuck on the physical machine — read
with jsQR in the browser — then record cycle times, submit defective product
(NG) entries, and submit the LWP. Management gets a dashboard of charts.

## Decisions and limits

Two problems appeared once the system was actually in use, not during
development.

**Expired JWT tokens made the system suddenly stop recognizing operators in
the middle of a shift.**

Solved with a *global fetch interceptor*: one place that checks every
response from the backend, catches 401, clears local memory, and sends the
user back to the login page. The handling sits in one place, not in every
call, so no request can slip past it.

**Saving daily reports got mixed up with the master parameter log.** Both
were stored through query paths that were not clearly separated, and that
mix produced wrong data. The queries were cleaned up until the two were
clearly separated.

## Results and handover

The final performance of the system was tested by the industry supervisor.

At the end of the placement, the codebase and administrator access were
handed over to the company's IT team.
