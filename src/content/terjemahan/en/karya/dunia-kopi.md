---
jenis: Website — online shop
ringkas: A single-seller online shop for the coffee store Dunia Kopi — catalog, cart, checkout without an account, QRIS payment, and order tracking, plus a panel for admins and staff. Built, not live yet.
status: Waiting — built, not live; waiting on hosting and store data · Oct 2026
periode: October 2026
peran: Specification, scope decisions, and sign-off on every milestone; implementation with Claude Code
platform: Web — phone and desktop
catatan: The repo is private and the site is not live yet. Its footer credits "made by Pyonkuro".
spek:
  - label: Unit tests
    nilai: "141"
    catatan: As of the SvelteKit 3 upgrade, passing on PGlite and PostgreSQL 16. The visual rework after that added more tests.
  - label: End-to-end tests
    nilai: "68"
    catatan: Playwright, phone and desktop profiles, on PGlite and PostgreSQL 16.
  - label: Lighthouse accessibility
    nilai: "100"
    catatan: Mobile profile, five shop pages; performance 96–98. Measured with fictional sample data and no product photos.
---

## What it is

An online shop for a single coffee seller — Arabica, Robusta, and blends —
with the shopping flow people already know from marketplaces: catalog, cart,
checkout, pay, then track the order status. The difference is that there is
only one shop, and buyers do not need to sign up.

Buyers type in how many grams they want, choose beans or ground, and for
ground coffee choose the grind — tubruk, V60, espresso, or French press.
Prices and shipping are calculated on the server, per 100 grams and per
kilogram per zone; a price coming from the browser is never trusted.

## Principles

- **As little buyer data as possible:** name, phone number, and shipping
  address. Old order data is anonymized automatically.
- **Checkout without an account.** Orders are tracked with an order code and
  a phone number.
- **Payment works without a gateway.** Static QRIS with manual confirmation
  is always available as a fallback for Midtrans.
- **No third-party analytics and no trackers.**
- **Comfortable on a phone**, since most buyers are assumed to use one.

## What was built

All milestones from M0 to M7 are done, each through its own pull request:

| Milestone | Contents |
| --- | --- |
| M1 | Public catalog and price calculation |
| M2 | Admin panel: login with attempt limits, admin and staff roles, products, photos, stock |
| M3 | Cart and checkout; stock is held without ever going negative even under concurrent orders, and returned exactly once if an order expires |
| M4 | Payment: manual QRIS and Midtrans, with a verified, idempotent webhook |
| M5 | Order management, status history, tracking numbers, a printable packing list |
| M6 | Hardening: full shopping-flow tests, a per-role authorization matrix, CSRF, a strict CSP |
| M7 | Revisions from the client's answers: free weight, grind per item, shipped orders only |

After that the project was moved to SvelteKit 3, and its look was reworked in
six steps: an audit, a design system, the home page and a filterable catalog,
the product detail page, a three-step cart and checkout, then responsive WebP
photos and SEO.

## Status, as it is

The code is done, but the site is not live. What is still missing is outside
the code: a hosting choice, a payment account, privacy and terms pages that
are still drafts, store data, and shipping rates. Midtrans payment has only
been tested against a mock server; testing against the real sandbox is waiting
for its keys. The Lighthouse scores also need to be measured again once real
product photos are in.
