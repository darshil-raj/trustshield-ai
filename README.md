# TrustShield AI

A multi-signal verification system for delivery insurance claims. Instead of trusting what someone reports, it checks what actually happened.

**Live demo →** https://trustshield-ai.vercel.app

---

## The Problem

Delivery platforms pay out claims based on what partners *say* happened. That's the entire vulnerability. A missed delivery, a damaged package, an accident — all self-reported, all easy to fake.

GPS coordinates? Spoofable. A single data point? Manipulable. But faking a consistent story across GPS location, local weather conditions, behavioral patterns, and timestamped route data — simultaneously — is a different problem entirely.

That's the core idea here.

---

## How It Works

When a claim is submitted, TrustShield pulls signals from multiple independent sources and checks if they tell the same story:

- **Location** — Was the partner actually at the reported address?
- **Weather** — Do conditions match what was claimed? (e.g., "road flooded")
- **Behavior** — Does the movement pattern match a genuine delivery attempt?
- **Route data** — Does the timeline hold up end-to-end?

If the signals agree → payout is approved automatically.  
If something doesn't add up → the claim is flagged for review.

No manual back-and-forth. No waiting. No guessing.

---

## Prototype Scope

This is a working prototype. The validation logic and decision flow are real. The signal sources (GPS, weather, behavior data) are simulated — but the system is built to connect to live APIs. Swapping in real data sources is an integration task, not an architectural one.

---

## Who It's For

**Delivery partners** get faster payouts on legitimate claims and a system that doesn't treat them like suspects by default.

**Platforms** get a fraud detection layer that scales — and stops paying out on claims that were never valid.

**Insurers** (particularly those using Guidewire) can plug this in as:
- A real-time fraud detection layer
- A parametric trigger engine — where verified conditions automatically release payments
- A claim verification step before human review

---

## Tech Stack

- React + Vite
- Tailwind CSS
- Framer Motion
- Deployed on Vercel

---

## The Shift

Most insurance systems ask: *"Do we trust this person?"*

This one asks: *"Do the facts support this claim?"*

That's the difference between a trust-based system and a verification-based one. TrustShield is built around the second.

---

## Status

Active prototype. Built to demonstrate the core verification logic and decision flow. Integration with live signal APIs is the next step.
