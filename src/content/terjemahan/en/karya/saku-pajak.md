---
jenis: Website — installable, works offline
ringkas: A search tool for Indonesian tax regulations. A static site that can be installed on a phone and used without internet; search runs on the device, with no server. Not an official government site.
status: v1.5.1 — running, used by real users · update in progress · Oct 2026
periode: September 2026 — ongoing
peran: Specification, scope decisions, and verification of every milestone; implementation with Claude Code
platform: Browser — computer and phone (installable as an app)
spek:
  - label: Documents
    nilai: "3,068"
    catatan: Income tax (PPh) 1,124, general provisions (KUP) 1,113, VAT (PPN) 992, property tax (PBB) 227, "Other" 193, land and building acquisition duty (BPHTB) 78, stamp duty 59 (one document can fall into more than one category). From corpus/meta.json.
  - label: Article units
    nilai: "17,840"
    catatan: Main bodies split by article or clause, from the 1,789 documents that have text.
  - label: Uncertain status
    nilai: "560"
    catatan: Their sources contradict each other, so they are shown as "uncertain" — not guessed.
  - label: Identical offline pages
    nilai: "23,707"
    catatan: Pages built on the device while offline, compared byte for byte with the published pages.
tautanLabel:
  - Site
  - Code on GitHub
---

## What it is

Saku Pajak does one thing: search tax regulations. Type a question, and what
comes back are the relevant articles, along with whether each one is in force
and where that status comes from.

It is a static site. Search runs on the user's own device — no server, no
account, no telemetry, and no network requests while searching. Since it only
needs a browser, it can be used on office computers that don't allow
installing any app. On a phone, the same site can be installed and used
without internet.

This site is **not an official government site**, and that is written on
every page. Its name does not use the word "official", the national emblem,
or any agency's logo.

## Built-in data: public regulations only

The built-in data is only public regulations from the regulation catalog of
the Directorate General of Taxes (DJP) and the legal documentation network
(JDIH) of the Ministry of Finance, split by article. Every document always
carries its source URL and the date it was fetched, both in the data and on
screen.

Coverage is seven categories of the DJP catalog: **income tax (PPh),
general provisions and procedures (KUP), VAT (PPN), property tax (PBB), land
and building acquisition duty (BPHTB), stamp duty**, and the "Other"
regulations that are actually about tax — the last decided regulation by
regulation. The last four categories came in with v1.1.0.

Rules that must not be broken, whatever the reason:

- **Status is never guessed.** Each source's claim is shown as it is, with the
  date it was fetched. Contradictions are marked *uncertain*. There is no
  single status label made up by the app itself.
- **Documents without text still appear** in lists and search results, with a
  note that the text is not available at the source and a link to the
  original.
- **Scanned attachments are shown as the original PDF**, never as OCR text.
- **Links between regulations are hints, not truth**, so they always come
  with a quote of the source sentence.

## After v1.0.0

- **v1.1.0** (16 October): property tax, land and building acquisition duty,
  stamp duty, and "Other" join the corpus.
- **v1.2.0** (16 October): automatic updates. Every day, new and changed
  regulations are fetched from DJP and JDIH; every week the data is checked,
  and it is only published if it actually changed and every test gate passes.
  Problems that need a human open an issue. The app shows when the data was
  last checked and has a page of new and changed regulations, and new data
  installs itself when the app is opened again.
- **v1.3.0** (17 October): a definition box above the results, a Save button
  with a Saved page, and the last ten searches.
- **v1.4.0** (18 October): the search data is split up, so a small update
  drops from 9.30 MB to 1.56 MB (gzip).
- **v1.5.0 and v1.5.1** (23 October): article references such as "PPh 23" or
  "PPh 4(2)" are understood as one concept. Documents that cite that article
  exactly come first, and other results follow below. The reference list
  covers 543 places where an article is written, across 20 laws.

The next update is in progress.

## Personal collection

Many everyday references — circulars, internal memos, confirmation letters,
rulings — are not available from public sources that can be fetched. For
that there is a personal collection: users can import their own PDFs, text
files, or pasted text, then search them with the same engine as the built-in
data.

Those documents are **stored only on the user's own device** (IndexedDB), and
every collection document is labeled "Not verified". References inside them
to public regulations are linked automatically. This was proven with network
recordings in a real Chrome: zero requests while searching, opening,
exporting, deleting, and restoring the collection, and no document content or
id in any URL, request body, tab title, or console.

Documents that prospective users once sent as test material never went into
the repo, the built-in data, or any commit. All collection tests use mock
documents written from scratch.

## Data pipeline trial: the income tax category

Before the specification was written, data fetching was tested first for one
category, income tax. Its report became the basis for nearly every decision
above.

- **More than half the list is not substantive regulation.** Of the 2,468
  income tax rows in the DJP catalog, 1,430 (58%) are weekly exchange rate or
  monthly interest rate announcements. Those were left out of scope. After
  merging with JDIH, **1,122 substantive documents** remain.
- **Status often disagrees between sources.** Of the 337 documents whose
  status could be compared across two sources, **121 (36%) differ**. Adding
  conflicts with revocation evidence in their own text, 190 documents (17%)
  have an uncertain status. That is why status is never inferred.
- **Even source texts contain OCR errors.** 23 of 570 DJP text files contain
  typical uncorrected OCR patterns — `clan` for *dan*, `rn` for *m*. Search is
  made robust to those errors without changing the original text. On scanned
  attachments, the OCR engine reported 0.93–0.99 confidence for clearly broken
  text, so OCR confidence scores are never used to decide whether something
  is usable.
- **Many older regulations have no text.** In the DJP catalog, regulations
  from the 2010s and 2020s have full text, but documents without text reach
  51% for the 2000s, 90% for the 1990s, and 96% for the 1980s. Their pages
  only hold metadata. Such documents still appear, with a link to the source.

## Offline, and proof that the content is the same

For offline use, document and article pages are not stored one by one; they
are built on the device from the data — by the same function used at build
time. The on-device storage is about 92 MB, with a first download of about
17 MB.

So that "the same" is not just a claim, the build compares all 23,707 pages
produced by the offline path with the published pages, byte for byte. The
negative test: one page is changed, and the difference is caught right away.
A test in a real Chrome turns the server off and then opens the list, search,
filters, documents, articles, and collection while offline.

## Known limits

- Real installation has only been tested on an Android phone by the project
  owner. Safari and iOS have not been tested.
- How fast the first save is on a slow phone has not been measured on a real
  device.
- Circulars from the Director General of Taxes are practically unavailable
  from official sources that can be fetched, so they are not in the built-in
  data. That is why the personal collection exists.
- Article references do not yet separate a paragraph from its article, and
  OCR-damaged text is not recognized as a reference.
