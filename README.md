# The Unity of Mind & Body

A premium, modern, and highly editorial wellness platform designed to support student mental health. "The Unity" provides a clean, stark, and high-contrast digital space tailored for clarity, mindfulness, and academic stress management.

## 🌟 Key Features

- **Stark Editorial Design**: High-contrast minimalist aesthetics (white, deep charcoal, and yellow accents) prioritizing clean typography and intentional whitespace over heavy shadows and blobs.
- **Micro-Animations**: Smooth, professional page transitions and hover effects powered by Framer Motion.
- **Component-Driven Architecture**: Modular UI components (`Button`, `Card`, `Navbar`, `Footer`) ensuring consistent design across the platform.
- **Responsive Layouts**: Fully responsive grids and alternating sections built entirely with Tailwind CSS v4.
- **Backend & Database**: Fully integrated with Supabase for data storage, row-level security (RLS), and authentication.
- **Staff CMS**: Built-in staff portal with a rich-text content management system (powered by React-Quill) to manage wellness resources directly from the dashboard.

## 💻 Tech Stack

- **Framework**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Routing**: [React Router DOM](https://reactrouter.com/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animation**: [Framer Motion](https://www.framer.com/motion/)
- **Backend**: [Supabase](https://supabase.com/)
- **Rich Text Editor**: [React-Quill](https://github.com/zenoamaro/react-quill)

## 🚀 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. Clone the repository and navigate to the project directory:
   ```bash
   cd the_unity
   ```

2. Install dependencies (we use an `.npmrc` file to manage peer dependencies automatically):
   ```bash
   npm install
   ```

3. **Supabase Setup**:
   - Create a `.env` file based on `.env.example` and add your Supabase URL and Anon Key.
   - Run the initialization scripts located in `dbs.md` and `newrundb.txt` in your Supabase SQL Editor.

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5173` to view the application.

## 📁 Project Structure

```
src/
├── assets/        # Static assets like SVGs and doodle graphics
├── components/    # Reusable UI pieces
│   ├── auth/      # Auth route protection (Public/Staff/User)
│   ├── layout/    # Navbar and Footer
│   └── ui/        # Atomic components like Button, Card
├── data/          # Mock static data files
├── lib/           # Third-party integrations (Supabase client)
├── pages/         # Page-level components
│   ├── auth/      # Login and signup views
│   ├── dashboard/ # Staff and User portals
│   └── ...        # Public pages (Home, About, Resources)
├── store/         # Zustand global state (AuthStore)
├── utils/         # Helper utilities (e.g., random doodle fetcher)
├── App.jsx        # Root component handling React Router
├── index.css      # Global CSS and Tailwind configuration
└── main.jsx       # React application entry point
```

Crafted with ❤️ by [anonically22](https://anonical.vercel.app)
