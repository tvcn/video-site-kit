# ComfyUI Setup Log (English)

> Run 480p / 5s first. No 16GB VRAM, do not start here.

## Machine

- GPU: ____
- VRAM: ____ GB
- RAM: ____ GB
- OS: Windows / Linux
- Free SSD: ____ GB
- Driver / CUDA: ____

## Versions

- Python: 3.11 / 3.12
- ComfyUI commit: ____
- PyTorch CUDA build: ____
- ComfyUI-Manager: ____

## Models

| File | Precision | Size | Folder |
|---|---|---|---|
| Wan 2.2 5B | fp16/fp8 |  | models/diffusion_models |
| Text encoder |  |  | models/text_encoders |
| VAE |  |  | models/vae |

## First run

- Workflow: official Wan 2.2 5B text-to-video
- 480×832 / 5s / 24fps
- Steps: ____ (workflow default)
- Batch: 1
- Time: ____ s
- Peak VRAM: ____ GB
- Output: ____

## Upgrade log

| Step | Model | Resolution | Length | Time | VRAM | Result |
|---|---|---|---|---|---|---|
| 1 | 5B | 480p | 5s |  |  |  |
| 2 | 5B | 720p | 5s |  |  |  |
| 3 | 14B quant | 480p | 5s |  |  |  |
| 4 | 14B quant | 720p | 5s |  |  |  |
| 5 | LTX quant | 1080p | 5s |  |  |  |

## Errors

| Error | Cause | Fix |
|---|---|---|
| CUDA not available | CPU PyTorch | Reinstall CUDA build |
| OOM | Resolution/batch | 480p, batch 1, FP8 |
| Missing node | Custom nodes | Manager / official workflow |

## Decision

- Daily driver: ____
- Final output: cloud or local: ____
- Will not attempt: ____
