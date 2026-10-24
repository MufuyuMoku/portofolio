---
jenis: Desktop app — audio
ringkas: A UTAU voicebank maker built on OpenUtau. The goal is that you just read the script the app prepares, and the voicebank builds itself. The first stage has already been proven with a voicebank made from my own voice.
status: Waiting — Stage 1 done, waiting on a vocal re-recording · Oct 2026
periode: October 2026 — ongoing
peran: Specification, scope decisions, verification, and voice recording; implementation with Claude Code
platform: Desktop — Windows x64 (test package)
catatan: The repo is private. The base code is OpenUtau © 2014 StAkira, MIT-licensed; its license file and copyright notice are included in full.
spek:
  - label: Test reclist lines
    nilai: "19"
    catatan: A basic Japanese CV reclist for the test voicebank "Myu".
  - label: Finished samples
    nilai: "101"
    catatan: Cut and marked automatically; 10 flagged for review (nasal n/m boundaries into vowels).
  - label: Calibrated latency
    nilai: "176 ms"
    catatan: 12 of 12 calibration taps used.
---

## What it is

VocaVoca makes a UTAU voicebank from your own voice: the app shows a
prepared script, you just read or record what it asks for, and the voicebank
forms automatically — cut, marked, and ready to use.

Making a UTAU voicebank the usual way is exhausting: finding a reclist
yourself, recording and naming files one by one, then a long round of manual
oto-ing. I once gave up on making one myself because of that. VocaVoca is
built to cut that path short.

The principles it holds to:

- **It still sounds like a voicebank.** The identity of a voice synthesizer
  is kept. This is not AI-model voice cloning.
- **Automatic gives a first result, manual perfects it.** Every automatic
  result can be adjusted.
- **Lightweight.** The core has to run on an ordinary laptop, with no
  graphics card required.
- **Everything in OpenUtau stays**, including compatibility with UTAU
  voicebanks.

## Built on OpenUtau

VocaVoca is a fork of [OpenUtau](https://github.com/stakira/OpenUtau), a
vocal synthesis editor for the UTAU community by StAkira and its
contributors, under the MIT license. That is why the stack follows OpenUtau:
C#/.NET with Avalonia. The piano roll, the voice engine, and UTAU
compatibility are not rewritten; what is added is the road from recording to
voicebank.

OpenUtau's `LICENSE.txt` and copyright notice must be included in full and
unchanged, in the repo and in the app. Updates from official OpenUtau are
pulled through an `upstream` remote, and the built-in update checker that
points to official OpenUtau releases is turned off so it doesn't overwrite
VocaVoca.

## Stage 1: proven

The first stage — the recorder and auto-oto — counts as done when reading the
script produces a Japanese CV voicebank usable in OpenUtau. That was reached
on 10 October 2026 with the test voicebank **"Myu"**, recorded from my own
voice:

- **Guided recorder**: metronome and guide tones, latency calibration, and
  re-recording per line without disturbing the other lines.
- **Auto-oto and "Create Voicebank"**: 101 finished samples from 19 reclist
  lines; 10 flagged for review. Every value can still be tidied in the oto
  editor.
- **A test project** that follows the recorded pitch, can be rendered, and
  sounds like the recording.
- **Compatible outside**: the Myu voicebank loads and sings in official
  OpenUtau (0.1.573-beta), the test project opens there, and it sounds the
  same as in VocaVoca.
- **A Windows x64 package** that runs without installing the .NET SDK.

The limits, as they are: only a basic Japanese **CV** voicebank so far. Noise
in the Myu session recordings is still −42 to −49 dB, while the target for a
release is below −60 dB. Plosive consonants on connected notes are still not
crisp enough. The stable OpenUtau 0.1.565 release cannot open the project
file yet, although the voicebank itself still works there.

## Next

CVVC and Stage 2 (auto tuning), worked on together:

- **CVVC transition samples.** A CV voicebank only has "consonant from
  silence" samples. A natural vowel-to-consonant transition on connected
  notes can only come from samples that actually record that transition — and
  this is required for an English pack.
- **Stage 2: auto tuning.** A voicebank from Stage 1 sings from notes drawn
  in the piano roll, and auto tuning gives a first pitch line that can still
  be adjusted by hand.

The order after that is already written, with no time estimates: voice
profile variations, a text door (type a sentence and the voicebank speaks
it), a cover door, and a real-time voice filter. Voicebanks made with
VocaVoca are also planned to be the voice of
[Project Nor-4](/portofolio/en/karya/nor-4/).
