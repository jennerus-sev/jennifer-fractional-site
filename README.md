# Jennifer Severns — fractional consulting site

A lightweight, one-page Hugo site with an editorial design and content stored in easy-to-edit YAML files. Hugo is free and open source. This site uses no paid theme, framework, external font, tracker, or image service.

## The three files you will edit most

- `data/site.yaml` — hero, diagnosis, approach, about, and consultation copy
- `data/offers.yaml` — services and pricing
- `data/cases.yaml` and `data/testimonials.yaml` — work and social proof

Contact details and the final website address live in `hugo.yaml`. Replace `baseURL: "https://example.com/"` with the public address before launch. The current case-study links point to the consultation section; replace them with case-study URLs when those pages are ready.

## Run it on your computer

1. Install Hugo Extended from <https://gohugo.io/installation/>.
2. Open a terminal in this folder.
3. Run:

```sh
hugo server -D
```

4. Open the local address Hugo prints (usually <http://localhost:1313>).

Hugo refreshes the site as you edit. To make a production copy, run `hugo --minify`; the finished static files appear in `public/`.

## Deploy free with Cloudflare Pages

1. Create a free GitHub repository and upload this folder.
2. In Cloudflare, choose **Workers & Pages → Create → Pages → Connect to Git**.
3. Select the repository and use these settings:
   - Framework preset: `Hugo`
   - Build command: `hugo --minify`
   - Build output directory: `public`
   - Environment variable: `HUGO_VERSION` = `0.148.2` (or a newer Extended release)
4. Deploy. Cloudflare provides a free `pages.dev` address. Add a custom domain from the project’s **Custom domains** screen when ready.

## Deploy free with GitHub Pages

1. Create a GitHub repository and upload this folder.
2. In the repository, open **Settings → Pages** and choose **GitHub Actions** as the source.
3. Push to the `main` branch. The included workflow at `.github/workflows/hugo.yaml` builds and publishes the site.
4. Update `baseURL` in `hugo.yaml` to the final custom domain when you have one. The workflow automatically uses the correct GitHub Pages address in the meantime.

GitHub will rebuild the site whenever you save changes to the repository.

## Before launch

- Confirm the pricing, scope language, and minimum engagement.
- Replace the consultation email link with a scheduling link if preferred.
- Replace case-study links as detailed stories are written.
- Review testimonial excerpts and role descriptions with Jennifer.
- Add analytics only if there is a clear measurement plan and privacy choice.

## Design notes

The site is intentionally image-light. Typography, pacing, contrast, and case-study evidence carry the story, avoiding the generic gradients, floating cards, and decorative AI imagery common to template-driven consulting sites. The CSS is in `assets/css/main.css`; the only JavaScript is the small mobile navigation in `assets/js/main.js`.
