# Design-E-Portfolio

Design-E-Portfolio is a web application implemented as an online portfolio for a Digital Design MYP e-portfolio submission. It presents project work, user profile information, and request/feedback flows intended for review and demonstration purposes.

## Purpose

This repository contains the source for a production-quality portfolio site built with Next.js and TypeScript. The site is intended to: display project work, capture basic user information, and provide a simple request/feedback workflow suitable for presentation and evaluation.

## How the project was built

- Frameworks and libraries: Next.js (app router), React, Tailwind CSS, Radix UI primitives, and a small set of utility libraries listed in `package.json`.
- Language: TypeScript. Build tooling and linting are configured through the repository devDependencies.
- Architecture: the project uses the Next.js `app/` directory for routing and server/components. Components are organized under `components/` with UI primitives under `components/ui/`. Application-level utilities and authentication helpers are under `lib/` and `hooks/`.
- Styling: Tailwind CSS is used for layout and styling, with a global stylesheet at `styles/globals.css` and application-level globals in `app/globals.css`.
- Data and state: forms use `react-hook-form`; simple client-side state is handled with React. Map features use `leaflet` and there are small interactive components implemented with Radix primitives.

Design and implementation decisions were driven by clarity, maintainability, and predictability: prefer simple component interfaces, clear prop contracts, and small focused utilities.

## Repository layout (key files)

- `app/` — Next.js routes and server components.
- `components/` — Reusable UI components and layout elements.
- `components/ui/` — Small presentational primitives (button, input, select, etc.).
- `hooks/` — Custom React hooks.

Prerequisites: Node.js (recommended v18 or later) and `npm` (project contains `pnpm-lock.yaml`).

Install dependencies and run the development server:

npm start
Design-E-Portfolio is an implementation of a web-based portfolio and simple community-help demo. It includes a public landing page, user sign-up and sign-in flows, request posting and browsing, profile pages, and client-side request management implemented for demonstration and evaluation.

Project analysis

- Primary stack: Next.js (App Router), React, and TypeScript.
- Styling: Tailwind CSS with a global stylesheet and utility-first classes.
- UI primitives: Radix UI and small component primitives under `components/ui/` (buttons, inputs, cards).
- State and data: simple client-side storage is used for demonstration; `lib/auth.ts` implements a local-storage-based user and request model (see `getUsers`, `signup`, `getRequests`, `saveRequest`).
- Routing and layout: top-level layout is in `app/layout.tsx`; the main route is `app/page.tsx`. Components such as the header and footer are provided in `components/`.

Key files and directories

- `app/` — application routes and top-level layout.
- `components/` — layout and page components (header, footer, map, etc.).
- `components/ui/` — presentational primitives and shared UI building blocks.
- `lib/` — client-side helpers, including `auth.ts` which implements the in-browser user/request model.
- `hooks/` — custom hooks used by components.
- `styles/` and `app/globals.css` — Tailwind and global styling.

Data model (summary)

The repository uses two simple models defined in `lib/auth.ts`:
- `User` — id, email, password (plain text for demo), role (`grandparent` | `helper`), profile (name, phone, optional location), createdAt.
- `Request` — id, userId, userName, userPhone, type, title, description, location, date, time, status, acceptedBy, createdAt.

How to recreate this project from scratch

The steps below produce an equivalent project structure and features. They are written so a developer can reproduce the site with the same architecture and behavior.

1) Prerequisites

- Install Node.js (v18 or later recommended).
- Install a package manager: `pnpm` is used in this repository, but `npm` or `yarn` may be used as alternatives.

2) Initialize a new Next.js application with TypeScript and App Router

```bash
pnpm create next-app@latest my-portfolio -- --ts --experimental-app
cd my-portfolio
```

If you use `npm`:

```bash
npx create-next-app@latest my-portfolio --ts --experimental-app
cd my-portfolio
```

3) Install dependencies

Install the runtime dependencies used in this repository (examples):

```bash
pnpm add react react-dom next lucide-react react-hook-form leafLet class-variance-authority clsx date-fns
pnpm add @radix-ui/react-accordion @radix-ui/react-dialog @vercel/analytics
```

Install development dependencies and Tailwind:

```bash
pnpm add -D tailwindcss postcss autoprefixer typescript @types/node @types/react @types/react-dom
npx tailwindcss init -p
```

Configure Tailwind by adding `content` paths in `tailwind.config.js` and adding the Tailwind directives to `styles/globals.css`:

```css
/* styles/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

4) Create the project layout and pages

- Create `app/layout.tsx` and `app/page.tsx`. `layout.tsx` should export a root layout that wraps `children` with `<html>` and `<body>` and imports global CSS.
- Create `components/header.tsx`, `components/footer.tsx`, and a `components/ui/` folder for shared primitives (`button.tsx`, `input.tsx`, `card.tsx`). Use small, focused components for reuse.

Example `lib/auth.ts` model (client-only, for demo purposes): implement `getUsers`, `signup`, `login`, `getRequests`, `saveRequest` using `localStorage` keys. Keep types in TypeScript so components can reference them.

5) Implement pages and flows

- Landing (`app/page.tsx`): hero section, feature cards, primary actions linking to `/signup` and `/requests`.
- Authentication pages: `app/login/page.tsx` and `app/signup/page.tsx`. Use `react-hook-form` for form state and call `signup` / `login` in `lib/auth.ts`.
- Requests listing and detail: `app/requests/page.tsx`, `app/requests/[id]/page.tsx`. Use `getRequests` to load items and `saveRequest` to add.
- Profile pages: `app/profile/grandparent/page.tsx` and `app/profile/helper/page.tsx`. Read current user from `lib/auth.ts` (`getCurrentUser`).

6) Styling and UX

- Use Tailwind utility classes for layout and spacing. Create a small design tokens file or rely on Tailwind config for colors.
- For accessibility, ensure semantic HTML (buttons, headings, link roles) and keyboard focus outlines.

7) Local development and scripts

Add or confirm scripts in `package.json`:

```json
{
	"scripts": {
		"dev": "next dev",
		"build": "next build",
		"start": "next start",
		"lint": "eslint ."
	}
}
```

Run the dev server:

```bash
pnpm install
pnpm dev
```

8) Production build and deployment

- Build locally: `pnpm build` then `pnpm start` to verify production behavior.
- For hosting, use any platform that supports Next.js (set Node version to match your environment). Deploy the repository and set environment variables if you introduce server-side services.

Notes and limitations

- The project implements client-side persistence for demonstration only. Passwords are stored in plain text in `localStorage`—this is acceptable for a prototype but must be replaced with a secure backend and hashed passwords for real users.
- Replace the local storage `lib/auth.ts` model with a server-side API (REST or GraphQL) and a database for production.
- Add automated tests (unit and integration) and CI pipelines if you plan to use this repository for production or as a long-term project.

Contributing

Follow the contribution guidance in the repository: open issues for large changes, keep PRs focused, and run the linting script before submitting changes.

License

There is no license file in this repository. Add a `LICENSE` file if you want to make the project open source under a specific license.

Contact

Open an issue in the repository for questions or suggested changes.
