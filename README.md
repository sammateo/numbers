# 📖 Bible Study App

A modern, collaborative Bible study application built with a focus on **rich content creation**, **scripture organization**, and **user collaboration**.

Users can create structured Bible studies, add verses and media, write rich text content, and share studies with others using a unique `@username` system.

---

## ✨ Features

### 🔐 Authentication & Onboarding

- User authentication
- Custom onboarding flow
- Unique `@username` system (Instagram-style)
- Profile management

### 📚 Bible Study Creation

- Create and edit Bible studies
- Add:
  - Topic
  - Description
  - Scripture references (book, chapter, verses)
  - Media (YouTube, links, images)

- Rich text editor for long-form study content

### 🤝 Collaboration

- Share studies with other users via `@username`
- Role-based access:
  - Viewer
  - Editor

### 🧠 Smart Features

- Username availability checking
- Structured verse storage
- Secure access using Row Level Security (RLS)

---

## 🏗️ Tech Stack

- **Frontend**: React + TanStack Start
- **State Management**: Zustand
- **State Machines**: XState
- **Backend / DB**: Supabase (PostgreSQL)
- **Rich Text Editor**: Tiptap

---

## 🗂️ Database Overview

All tables live in the `numbers` schema.

### Tables

- `profiles` → user profiles with usernames
- `bible_studies` → main study data
- `bible_study_verses` → scripture references
- `bible_study_media` → videos, images, links
- `bible_study_collaborators` → sharing and permissions

---

## 🔐 Security

This project uses **Supabase Row Level Security (RLS)** to enforce access control:

- Users can only access studies they own or are shared on
- Users can only modify their own content (or based on role)
- All queries respect `auth.uid()` via JWT

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-username/bible-study-app.git
cd bible-study-app
```

---

### 2. Install dependencies

```bash
npm install
```

---

### 3. Setup environment variables

Create a `.env` file:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key
HOST_URL=http://localhost:port
YOUVERSION_API_KEY=your_youversion_api_key
```

---

### 4. Setup Supabase

- Create a Supabase project
- Run the SQL schema (tables, RLS policies)
- Ensure the `numbers` schema exists

---

### 5. Run the app

```bash
npm run dev
```

---

## 🧭 Project Structure

```
src/
 ├ routes/              # TanStack routes
 ├ components/          # UI components
 ├ stores/              # Zustand stores
 ├ machines/            # XState machines
 ├ lib/                 # Supabase clients, utilities
 ├ types/               # TypeScript types
 └ server/              # Server functions
```

---

## 🔄 Application Flow

```
User logs in
     ↓
Profile loaded
     ↓
No username?
     ↓
Onboarding flow (XState)
     ↓
Create @username
     ↓
Dashboard
     ↓
Create / Share Bible Studies
```

---

## ✍️ Editor Experience

- Built with Tiptap
- Supports structured rich text
- Designed for long-form study content
- Easily extendable for:
  - notes
  - highlights
  - collaboration

---

## 📌 Future Improvements

- 🔍 Full-text search (studies, verses)
- 📖 Bible API integration for verse lookup
- 💬 Comments & discussions
- 🌐 Public study sharing
- 📱 Mobile responsive design
- 🤝 Real-time collaboration

---

## 🧠 Design Goals

- Clean and distraction-free reading experience
- Structured + flexible study creation
- Collaboration-first workflow
- Scalable architecture

---

## 📄 License

MIT License

---

## 🙌 Contributions

Contributions are welcome!
Feel free to open issues or submit pull requests.

---

## 📬 Contact

If you have questions or ideas, feel free to reach out or open an issue.
