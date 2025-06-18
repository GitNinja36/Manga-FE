# 📚 Manga-FE — AI-Powered Manga Marketplace (Frontend)

![GitHub](https://img.shields.io/github/repo-size/GitNinja36/Manga-FE)
![Tech](https://img.shields.io/badge/Built%20With-React.js%20%7C%20Tailwind%20CSS%20%7C%20Stripe%20%7C%20HuggingFace%20%7C%20Cloudinary-brightgreen)
![License](https://img.shields.io/github/license/GitNinja36/Manga-FE)

🔗 **GitHub Repo:** [Manga-FE](https://github.com/GitNinja36/Manga-FE)

---

## 🚀 Project Overview

**Manga-FE** is the frontend of a full-stack, AI-powered manga marketplace. This app allows users to **buy and sell manga books** with a feature-rich, production-style experience.

Key highlights:
- ✨ **AI-powered manga summaries** (via HuggingFace Inference API)
- 💳 **Stripe-based real-time payment processing**
- 🖼️ **File & image uploads with Cloudinary**
- 💡 **Smooth UI with Framer Motion animations**

This isn't just CRUD — it's a polished, real-world application reflecting modern frontend standards.

---

## 🧠 Key Features

### 🧾 Sell Page with AI Summary Generation  
> "Use AI" button rewrites your manga description in **2–3 catchy lines** to help convert users. Powered by **HuggingFace’s bart-large-cnn model**.

### 🖼️ Advanced Upload System (via Cloudinary)
- Upload **PDF manga files**, **cover image**, and **3 additional images**
- Real-time **preview switching** for better visual experience
- All files are optimized and stored via **Cloudinary API**

### 🎨 Responsive, Animated UI
- Built using **React + Tailwind CSS**
- Transitions via **Framer Motion** for clean UX
- Forms via **React Hook Form**, multiselect genres via **React Select**

### 💰 Stripe Payment Integration
- Real-world **Stripe Checkout flow**
- Price and quantity validation
- Dynamic success and cancellation logic

---

## 🧑‍💻 Tech Stack

| Tech            | Description                                        |
|-----------------|----------------------------------------------------|
| React.js        | Component-based UI framework                      |
| Tailwind CSS    | Utility-first modern CSS styling                  |
| Axios           | For REST API communication                        |
| React Hook Form | Form handling and validation                      |
| React Select    | Genre multiselect UI                              |
| Framer Motion   | Seamless animations & UI transitions              |
| Toastify        | Toasts for UX feedback                            |
| Stripe          | Payment integration (secure, production-grade)    |
| HuggingFace     | AI-generated summaries using transformer models   |
| Cloudinary      | File/image upload, storage, and preview system    |

---

## 🛠️ Setup Instructions

### 1. Clone the Repo

```bash
git clone https://github.com/GitNinja36/Manga-FE.git
cd Manga-FE
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment Variables

Create a `.env` file at the root of the project and add:

```env
VITE_BACKEND_API=http://localhost:8080
VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key_here
VITE_CLOUDINARY_URL=your_CLOUDINARY_UR
```

Make sure your backend server is running (check `Manga-BE` repo).

### 4. Start the Dev Server

```bash
npm run dev
```

---

## 📸 UI Preview

| Sell Form | AI Summary | Stripe Checkout |
|-----------|------------|-----------------|
| ✅        | ✅         | ✅              |

---

## 🤖 About the AI Integration

This project integrates **HuggingFace's `bart-large-cnn` model** to create engaging manga summaries.

- Prompt designed as if the AI is a **top-tier bookseller** crafting the best blurbs
- Output shows **within the description input** for seamless UX
- Called through a secure backend wrapper API

---

## ☁️ Cloudinary Integration

- Users upload **cover and preview images** along with manga PDFs
- All uploads go to **Cloudinary**, returned with hosted URLs
- Real-time **image preview switching** using local blob previews
- Ensures optimized and reliable file hosting for production

---

## 💼 Recruiter’s Note

This project demonstrates my ability to:

- Build modern, animated, responsive frontend apps
- Use **AI (HuggingFace)** to enhance user interaction
- Integrate **Stripe** for real-time payment systems
- Handle **file uploads and CDN delivery** via Cloudinary
- Write clean React code with reusable components and state management

If you're looking for someone who can blend **elegant UI**, **intelligent features**, and **practical e-commerce flows** — this project proves that capability.

---

## 📦 Related Repositories

- 🔧 Backend API: [Manga-BE](https://github.com/GitNinja36/Manga-BE) *(Node.js + Express + MongoDB)*
- 🧠 AI Summary Service: Backend logic using HuggingFace inference API

---

## 📜 License

This project is licensed under the **MIT License**.

---

Made with ❤️ by [Rohit (GitNinja36)](https://github.com/GitNinja36)
