<div align="center">

![NEO](docs/images/hero-welcome.png)

# NEO

**原生 macOS 多面板终端，最多同时运行 10 个 Claude Code 会话。**

毛玻璃窗口、纯净单色终端、仓库上下文自动注入——专为在同一界面管理多个 Claude 会话而生。

[![License: MIT](https://img.shields.io/badge/License-MIT-39FF14.svg)](LICENSE)
[![Tauri 2](https://img.shields.io/badge/Tauri-2-39FF14.svg)](https://tauri.app)
[![macOS](https://img.shields.io/badge/macOS-arm64%20%7C%20intel-39FF14.svg)](#)

</div>

---

## 为什么选择 NEO

Claude Code 非常适合专注于单个任务，但当你想**并行运行 5–10 个 Agent**——每个对应一个仓库、分支或功能——单个终端就成了瓶颈。iTerm/Warp 的分屏功能勉强够用，但它们对你的仓库一无所知。

NEO 正是为此场景而生：

- **最多 10 个 Claude（或 Shell）面板**，按数量自动平铺。
- **自动附加仓库上下文**——在某个仓库中启动面板时，NEO 会预加载 CLAUDE.md、README、package.json/Cargo.toml/pyproject.toml、最近 5 次提交及顶层目录结构，让 Claude 一开始就充分了解项目。
- **归档面板而不关闭**——最小化到 Dock 中的 chip，保持长期运行的会话存活，同时不占用网格空间（Claude Code 不保存聊天记录，NEO 帮你保活）。
- **原生 macOS 体验**——`NSVisualEffectView` 毛玻璃、透明悬浮标题栏、隐藏标题。

## 技术栈

| 层级 | 选型 |
|---|---|
| 应用框架 | Tauri 2（原生 macOS bundle） |
| 前端 | React 19 + Vite + TypeScript |
| 状态管理 | Zustand |
| 终端渲染 | xterm.js |
| PTY | `portable-pty`（Rust） |
| 毛玻璃效果 | `window-vibrancy`（`NSVisualEffectMaterial::HudWindow`） |

## 快速开始

```bash
git clone https://github.com/Steviewonders99/neo.git
cd neo
npm install
npm run tauri dev
```

首次 Tauri 构建会下载并编译约 440 个 Rust crate（5–10 分钟），后续构建几乎即时完成。

## 构建已签名的 `.app`

```bash
export APPLE_ID=you@example.com
export APPLE_PASSWORD=<应用专用密码>
export APPLE_TEAM_ID=ABCDE12345

npm run tauri build
```

输出：`src-tauri/target/release/bundle/macos/NEO.app`（已签名 + 公证）及 `.dmg`。

## 测试

```bash
npm test                              # 前端（vitest — 网格计算）
cd src-tauri && cargo test --lib      # 后端
```

14 个后端测试 + 10 个前端测试，全部通过。

## 使用方法

1. 启动 NEO，看到带矩阵雨效果的欢迎界面，中央有 `$ cd` 提示符。
2. 输入路径（例如 `~/projects/your-repo` 或 `cd /Users/you/code/app`），按 Enter。
3. 在该目录下生成一个 Claude 面板，仓库上下文会自动作为第一条消息注入。
4. 点击右下角 `+` 按钮添加更多面板，自动网格会为 1–10 个可见面板重新排布。
5. 最小化想保留但不显示的面板——点击面板标题栏的 `−`。

## 配置

NEO 预设了合理默认值。v1 阶段最常用的调整项直接在代码中：

- 主题 token：`src/theme.ts`
- xterm.js 选项：`src/components/Terminal.tsx`

## 路线图

v1.5+：
- 持久化布局（重启后恢复面板）
- 拖拽重排面板
- 设置界面
- 自定义快捷键
- 可选 LLM 任务摘要生成（OpenRouter / Anthropic）
- 跨平台（Windows Mica、Linux 合成器模糊）

欢迎贡献——详见 [CONTRIBUTING.md](CONTRIBUTING.md)。

## 设计与计划

完整设计文档和 26 步实现计划已提交至此仓库：

- [`docs/superpowers/specs/2026-06-02-terminal-panes-design.md`](docs/superpowers/specs/2026-06-02-terminal-panes-design.md)
- [`docs/superpowers/plans/2026-06-02-terminal-panes.md`](docs/superpowers/plans/2026-06-02-terminal-panes.md)
- [`docs/manual-test-checklist.md`](docs/manual-test-checklist.md)

## 许可证

[MIT](LICENSE) © 2026 Steven Junop
