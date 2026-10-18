---
jenis: Home server — homelab
ringkas: High Operative Management Environment — a personal mini server on a second-hand ARM set-top box. Four services run in Docker, daily encrypted backups have passed a restore test, and everything can be rebuilt from the repo.
status: Resting — Phases 0 and 1 done
periode: September 2026 — ongoing
peran: Specification, scope decisions, and verification of every step; implementation with Claude Code
platform: Fiberhome HG680P set-top box — Armbian (arm64)
catatan: A Stardance (Hack Club) project.
spek:
  - label: Services running
    nilai: "4"
    catatan: About 650 MB of RAM for all four containers after boot, out of about 1.9 GB.
  - label: Boot to SSH
    nilai: "40 s"
    catatan: Measured from the laptop during a controlled reboot test.
  - label: Files in /boot changed
    nilai: "0"
    catatan: The md5 of 168 files was identical before and after upgrading 227 packages.
tautanLabel:
  - Code on GitHub
---

## What it is

Project HOME — *High Operative Management Environment* — is a personal
homelab on a second-hand set-top box: a Fiberhome HG680P with an Amlogic
S905X, four Cortex-A53 cores, and about 1.9 GB of RAM, running Armbian. The
system lives on the 7.3 GB eMMC; the data lives on a 128 GB microSD card.

The repo is the **source of truth**: everything installed on the box must be
rebuildable from the repo — the foundation scripts, configuration, each
service's compose file, and the recovery guide. All services are for the
local network only; nothing is exposed to the internet.

Registered as a Stardance (Hack Club) project.

## The limits that shape everything

This box has no HDMI. If boot or SSH breaks, the only way back is reflashing
from scratch. That leads to the rules:

- **The kernel, DTB, bootloader, and `/boot` are never touched.** Packages
  that write to `/boot` are held, initramfs is frozen, and automatic updates
  are off. Upgrading 227 packages was proven safe by comparing the md5 of 168
  `/boot` files before and after — identical.
- **Every SSH or network change must use an automatic rollback timer**, so a
  configuration mistake cancels itself.
- **Reboots only with permission**, and only after the mount table has been
  verified.

## What already runs

Phase 0 (foundation) and Phase 1 (four services) are done and passed a reboot
test on 28 September 2026:

| Service | What it does |
| --- | --- |
| Homepage | Dashboard: links to every service, plus the box's CPU, RAM, and temperature |
| Uptime Kuma | Watches whether services and backups are alive |
| Gitea | Private Git server, mirroring the GitHub repos |
| FileBrowser Quantum | Web file manager for the data folder |

Each image is pinned to a version that supports arm64 and given a memory
limit. Every service starts on its own after a reboot, and Docker only starts
after the data card is mounted. The original FileBrowser is deliberately not
used because the project was archived without security patches.

Security: SSH with keys only, no container gets access to the Docker socket,
unused built-in services are turned off, and there is not a single password
in the repo.

## Backups that have been proven

Daily encrypted backups (restic) to the laptop have run since 29 September,
with a weekly integrity check and a monitor that turns red if there has been
no successful backup in 26 hours. A backup only counts as existing once its
**restore test passes** — and the restore steps are written up as a guide in
the repo.

It did not go smoothly, and that is on record: the laptop setup script failed
twice before it was right, and the first backup tool combination turned out
not to work with the SFTP server on Windows, so the route was changed.

## One recorded failure

When the microSD was about to be formatted through the box's built-in SD
slot, the wipe command failed with an I/O error. Work stopped and the problem
was reported, and the card was not touched again until it was tested
separately on the laptop: 118,875 MB written and verified with no errors. The
card was healthy — the box's SD slot was the problem. The same card was then
mounted through a USB card reader, and the built-in SD slot was ruled out of
use by a written rule.

Every change is recorded in the log with the date, what was done, and why,
including the ones that failed.

## From Landship

Landship was once planned as a project of its own: a "base" for all my work,
with a system called VTLS — Vault Tracking & Log System — that records work
and writes devlogs automatically. That plan no longer stands alone; its ideas
were folded into Project HOME and Project Nor-4.

## Not done yet

- A system journal that survives reboots.
- A firewall and remote access — designed separately.
- A third backup copy outside the laptop.
