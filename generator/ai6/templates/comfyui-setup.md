# ComfyUI 配置记录 / ComfyUI Setup Log

> 先跑通 5 秒 480p，再谈 720p/14B。没有 16GB 显卡，不要从这里开始。

## 1. 机器

- GPU：____
- 显存：____ GB
- 内存：____ GB
- 系统：Windows / Linux
- 硬盘可用：____ GB
- 驱动版本：____
- CUDA：____

## 2. 软件版本

- Python：3.11 / 3.12
- ComfyUI commit：____
- PyTorch：____（CUDA 版）
- ComfyUI-Manager：____

## 3. 模型文件

| 文件 | 版本/精度 | 大小 | 放置目录 |
|---|---|---|---|
| Wan 2.2 5B | fp16/fp8 |  | models/diffusion_models |
| 文本编码器 |  |  | models/text_encoders |
| VAE |  |  | models/vae |

## 4. 第一次跑通

- 工作流：官方 Wan 2.2 5B 文生视频
- 分辨率：480×832 / 5 秒 / 24fps
- 步数：____（先用工作流默认）
- batch：1
- 耗时：____ 秒
- 显存峰值：____ GB
- 输出：____（路径）

## 5. 升档记录

| 档位 | 模型 | 分辨率 | 时长 | 耗时 | 显存 | 结果 |
|---|---|---|---|---|---|---|
| 1 | 5B | 480p | 5s |  |  |  |
| 2 | 5B | 720p | 5s |  |  |  |
| 3 | 14B 量化 | 480p | 5s |  |  |  |
| 4 | 14B 量化 | 720p | 5s |  |  |  |
| 5 | LTX 量化 | 1080p | 5s |  |  |  |

## 6. 报错归档

| 报错 | 原因 | 修复 |
|---|---|---|
| CUDA not available | 装了 CPU 版 PyTorch | 重装 CUDA 版 |
| OOM | 分辨率/batch 太大 | 480p/batch 1/FP8 |
| Missing node | 自定义节点缺失 | Manager 安装/换官方工作流 |

## 7. 结论

- 这台机器日常主力：____
- 终版走云还是本地：____
- 不再尝试：____（例如 4K 批量/30 秒）
