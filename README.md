# Team Violets Quiz Arena

An English, RTL-ready two-team quiz arena built with React, Vite, TypeScript, React Router, Lucide React, Tailwind CSS dependency support, and LocalStorage persistence.

## Run locally

```bash
npm install
npm run dev
```

For the production build:

```bash
npm run build
```

## Admin access

Copy `.env.example` to `.env` and set `VITE_ADMIN_PIN` to your preferred PIN. Open `/admin` to manage the question bank.

## Editing content

- Default question data lives in `src/data.ts`.
- Admin edits are saved to LocalStorage and can be exported/imported as JSON.
- Replace the Team Violets logo at `public/assets/violets-logo.webp` to change the branding asset.
- Game progress is stored in LocalStorage and can be reset from the live board.

The six default categories are `Dash`, `Solo Freestyle`, `Random Challenges`, `Photo Challenge`, `Items`, and `Violets`.
