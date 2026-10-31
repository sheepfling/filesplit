# FileSplit

A standalone, browser-only file splitting and joining utility. There is no build step, external JavaScript dependency, or upload endpoint.

## Privacy

Opening the hosted site downloads the page to your browser. FileSplit reads, splits, joins, and creates downloads locally in that browser; it does not upload your selected files. The site has no external scripts or network connections for file processing.

## Joining files

Join orders selected pieces by name initially; check the order and use the arrow controls to change it if needed. FileSplit can recognize some common signatures at the start of the joined data, including PNG, JPEG, GIF, PDF, ZIP, gzip, WebP, WAV, and BMP, and offer an extension to append. You choose whether to use the suggestion and can edit the filename yourself. Unknown signatures leave the name unchanged. Some signatures are shared by multiple formats—for example, a ZIP signature can also indicate a DOCX file—so a suggestion is a hint, not proof of a file type or validation of its contents.

## GitHub Pages deployment

1. Create a new public GitHub repository (suggested: `filesplit`).
2. Add `index.html` and `.nojekyll` at the repository root.
3. Open **Settings → Pages**, select **Deploy from a branch**, and choose `main` and `/(root)`.
4. Once Pages finishes publishing, open `https://<username>.github.io/filesplit/`.

For other static hosts, deploy `index.html` as the root page.

## Notes

The Join tool concatenates pieces in their selected order; it does not yet validate missing or corrupted pieces. ZIP generation is subject to browser memory limits.
