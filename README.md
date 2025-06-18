# 📚 Manga-FE — AI-Powered Manga Marketplace (Frontend)

![GitHub](https://img.shields.io/github/repo-size/GitNinja36/Manga-FE)
![Tech](https://img.shields.io/badge/Built%20With-React.js%20%7C%20Tailwind%20CSS%20%7C%20Stripe%20%7C%20HuggingFace-brightgreen)
![License](https://img.shields.io/github/license/GitNinja36/Manga-FE)

### 🔗 GitHub Repo: [Manga-FE](https://github.com/GitNinja36/Manga-FE)

---

## 🚀 Project Overview

**Manga-FE** is the frontend of a full-stack, AI-powered e-commerce platform where users can **buy and sell manga books**. The application delivers a seamless experience using:

- ✨ **AI-generated book summaries** (via HuggingFace Inference API)
- 💳 **Real-time payment processing** (via Stripe)
- 📁 **Cloud image & file uploads** (via Cloudinary)
- 📦 Responsive UI with animation (via Framer Motion)

This is not just a form and table CRUD project — it's built to replicate **real-world functionality** used in modern digital marketplaces.

---

## 🧠 Key Features

### 🧾 Sell Page with AI Summary Generation
> "Use AI" button that instantly rewrites the manga description in 2–3 compelling lines, perfect for catching customer attention. Powered by **HuggingFace's `bart-large-cnn`** model.

### 🖼️ Upload System
- Upload **manga PDFs**, **cover images**, and up to **3 additional images**
- Real-time **preview switching** with image buttons
- All uploads handled via **Cloudinary**

### 🎨 Smooth & Responsive UI
- Built using **React + Tailwind CSS**
- Animations and transitions using **Framer Motion**
- Form handling with **React Hook Form** and **React Select** for multi-genre tagging

### 💰 Stripe Payment Integration
- Fully working **Stripe Checkout**
- Dynamic pricing, quantity validation, and success flow
- Simulates real product purchase flow for books

---

## 🧑‍💻 Tech Stack

| Tech             | Description                                     |
|------------------|-------------------------------------------------|
| React.js         | Component-based frontend framework              |
| Tailwind CSS     | Utility-first modern styling                    |
| Axios            | REST API requests                               |
| React Hook Form  | Form validation & control                       |
| Framer Motion    | Smooth transitions & animations                 |
| React Select     | Multi-select dropdown for genres                |
| Stripe           | Payment gateway integration                     |
| HuggingFace      | AI summary generation using transformers        |
| Cloudinary       | Image and file upload service                   |
| Toastify         | Beautiful toast notifications                   |

---

## 🛠️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/GitNinja36/Manga-FE.git
cd Manga-FE
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root:

```
VITE_BACKEND_API=http://localhost:8080
VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key_here
```

> ⚠️ Ensure the backend API is running — see: [Manga-BE](https://github.com/GitNinja36/Manga-BE)

### 4. Run the Development Server

```bash
npm run dev
```

---

## 📸 UI Preview (Add Screenshots)

| Sell Form | AI Summary | Stripe Checkout |
|-----------|------------|-----------------|
| (add screenshot) | (add screenshot) | (add screenshot) |

---

## 🤖 About the AI Integration

This project integrates **HuggingFace’s `bart-large-cnn`** model to auto-summarize manga descriptions in a few catchy lines:

- Custom prompt: _“You’re the best bookseller in the world. Write a catchy manga summary to boost sales…”_
- AI is triggered via `"Use AI"` button and updates the description box dynamically
- HuggingFace Inference API is called from the backend for better security
- The frontend handles smooth transitions and real-time feedback

---

## 💼 Recruiter’s Note

This project showcases my ability to:

- ✅ Build **responsive, animated UI** using modern React + Tailwind stack
- ✅ Integrate **AI features** with secure backend interaction
- ✅ Implement **real Stripe payments** in production-like flows
- ✅ Use third-party tools like Cloudinary, Toastify, and Framer Motion
- ✅ Write clean, structured frontend logic with real-world UX

---

## 📦 Related Repositories

- 🔧 Backend API: [Manga-BE](https://github.com/GitNinja36/Manga-BE) (Express.js + MongoDB)
- 🧠 AI Service: HuggingFace summarization via custom prompt integration

---

## 📜 License

This project is licensed under the [MIT License](https://github.com/GitNinja36/Manga-FE/blob/main/LICENSE)

---

> Made with ❤️ by [Rohit (GitNinja36)](https://github.com/GitNinja36)
