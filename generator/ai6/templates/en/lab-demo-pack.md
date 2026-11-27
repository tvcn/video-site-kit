# AI video lab: demo recipe pack

Updated: 2026-11-25
Use: copy a timeline, pick a stack, then run only a 5s test. Do not start with 90s.

---

## 1. Three recipes

### A. 90s drama: 8 beats / 16 shots / 2 characters

| Time | Beat | Shot | Action | Model | Sound |
|---|---|---|---|---|---|
| 00:00–00:08 | Voice note | Close / phone | Phone fills 1/3; thumb hovers, does not play | H3 / Seedance | Room tone + notification |
| 00:08–00:18 | First callback | Medium / hand | Thumb hits callback; cut to hallway | Kling 4.0 / Seedance | Low heartbeat |
| 00:18–00:30 | Someone outside | Wide / door | Door opens a crack; light flickers; no face | Kling 4.0 | Lock + steps |
| 00:30–00:42 | Turn | Close / face | She hears her own voice from the future | H3 | Overlapping voice |
| 00:42–00:54 | The cost | Insert / clock | Each callback costs 10 minutes; clock and hand only | H3 | Ticking |
| 00:54–01:08 | Decision | Medium / hallway | Follow her back to the door; no face | Kling 4.0 | Steps + breath |
| 01:08–01:20 | Climax | Two-shot close | Two voices at once; only one face | Seedance 2.5 | Dual dialogue |
| 01:20–01:30 | Out | Close / black | Phone black; silence; hold 2s | H3 | 2s silence |

### B. 15s product: 3 beats / 3 shots

| Time | Beat | Shot | Action | Model | Sound |
|---|---|---|---|---|---|
| 00:00–00:03 | Label macro | Macro / label | Label fills 1/2; hand enters; hold 0.5s | H3 / Seedance | Room tone |
| 00:03–00:08 | Hand in frame | Medium / use | Lift, open, pour; one selling point | Seedance 2.5 | Bottle/fabric foley |
| 00:08–00:15 | Payoff | Close / result | Clean background; caption safe area on right | H3 | One VO + light music |

### C. 30s talking head: 3 beats / 3 shots

| Time | Beat | Shot | Action | Model | Sound |
|---|---|---|---|---|---|
| 00:00–00:05 | Hook | Close / front | First line is the result, not an intro | HeyGen / Hedra | VO first |
| 00:05–00:20 | Proof | Medium / demo | One verifiable action or screen result | Hedra / H3 | VO + room tone |
| 00:20–00:30 | Close | Close / CTA | One action line; leave caption space | HeyGen | VO lands |

---

## 2. Four-question tool picker

1. Deliverable: drama / 15s short / product / talking head / brand
2. Hardware: no GPU / 16GB / 24GB+
3. Monthly budget: ¥0–100 / ¥100–500 / ¥500+
4. Priority: speed / control / native audio

Return three cards:

- Main: first stack for this deliverable and priority
- Backup: second stack for action, multi-person, audio or local cost
- Avoid: the most expensive or most failure-prone move under these conditions

---

## 3. First-test log

| Field | Record |
|---|---|
| Model / version | |
| Prompt | |
| Length / resolution | 5s / 720p |
| Takes | 3 on the same prompt |
| Face | Stable / drift / swap |
| Hands | Normal / extra fingers / fused |
| Text | Readable / garbled / warped |
| Audio sync | Synced / drift / none |
| Time | |
| Cost | |
| Failure type | |
| One variable to change next | |

Rule: change one variable at a time; change the model only after three failed takes, not one.

---

## 4. Checks

- [ ] Can name the beat count and total duration of each recipe
- [ ] Knows the timeline is not video playback
- [ ] The stack has main / backup / avoid, not a leaderboard
- [ ] First test is 5s/720p/3 takes
- [ ] Log covers face, hands, text, audio sync, time, cost

Prices and access follow the official pages. A demo is a recipe, not model footage.
