# Zia Maria — Next.js site

Single-scroll marketing site for Zia Maria, built with Next.js (App Router) + Tailwind CSS,
statically exported for GitHub Pages.

## Local development

```bash
npm install
npm run dev
```

Visit http://localhost:3000

## Build a static export

```bash
npm run build
```

Output goes to `./out`.

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the static export and
publishes it to GitHub Pages automatically.

**One-time setup after the first push:** in the repo, go to Settings → Pages → Source, and
select "GitHub Actions" (not "Deploy from a branch"). After that, every push to `main`
redeploys automatically.

### Custom domain

To use a custom domain (e.g. www.ziamariaberlin.com), add a `CNAME` file to the `public/`
folder with the domain name, point your DNS at GitHub Pages, and set it again in
Settings → Pages → Custom domain.

## Editing content

- Menu items: `lib/menuData.js`
- Contact info / EmailJS keys: `lib/emailjs.js`
- Sections: `components/*.js`, assembled in `app/page.js`
