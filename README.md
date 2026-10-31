# FileSplit

A standalone, browser-only file splitting and joining utility. No build step, external JavaScript dependencies, server, or upload endpoint.

## GitHub Pages deployment

1. Create a new public GitHub repository (suggested: `filesplit`).
2. Add `index.html` and `.nojekyll` at the repository root.
3. Open **Settings → Pages**, select **Deploy from a branch**, and choose `main` and `/(root)`.
4. Once Pages finishes publishing, open `https://<username>.github.io/filesplit/`.

For other static hosts, deploy `index.html` as the root page. The tool processes files locally in the browser; it does not send them to a server.

## Notes

The Join tool concatenates pieces in their selected order; it does not yet validate missing or corrupted pieces. ZIP generation is subject to browser memory limits.
