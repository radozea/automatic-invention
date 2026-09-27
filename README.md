# Claude Code for VS Code

Unleash Claude’s raw power directly in your terminal. Search million-line codebases instantly. Turn hours-long workflows into a single command. Your tools. Your workflow. Your codebase, evolving at thought speed.

- **Powerful intelligence:** Use the latest Claude models using your Pro, Max, Team, or Enterprise subscription, or pay-as-you-go pricing
- **Works alongside you:** Claude autonomously explores your codebase, reads and writes code, and runs Terminal commands with your permission.
- **New, friendlier interface** that makes it easier than ever to get started
- **Integrated with the editor:** Claude knows about your current file and text selection, and proposes changes directly inside your editor window.
- **Powerful agentic features** like subagents, custom slash commands, and MCP are supported. (These features work in the VS Code extension, but some can only be configured using the command-line interface)

## New to Claude Code?

Visit [claude.com/claude-code](https://claude.com/claude-code) to get started with Claude Code.

## Prefer the Terminal-based extension?

If you miss the Terminal-style experience of the previous extension, don’t worry! It hasn’t gone anywhere. Use the `Claude Code: Use Terminal` setting to switch back.

## Requirements

- VS Code 1.98.0 or higher

## Docs

See our [documentation](https://code.claude.com/docs/en/vs-code) for more information on using the VS Code extension.- `scripts/patch-reset-time.js`: **the fix for 2.1.280.** `node scripts/patch-reset-time.js <extension folder>/webview/index.js` makes the reset countdown show "in 1h 59m" instead of "in 1h". Backs up to `index.js.bak`; refuses to run if the code doesn't match exactly.
- `BUG_REPORT.md`: draft issue for https://github.com/anthropics/claude-code/issues
