# Pritix Creative Website

A high-end, cinematic brand storytelling and video production agency portfolio website. Built using React, TailwindCSS, Vite, Framer Motion, and GSAP, this application features premium visual aesthetics, liquid transitions, dynamic animations, and fully responsive layouts optimized for all device viewports.

---

## ✨ Features

- **Cinematic Apple-Style Hero**: Smooth dynamic animations featuring rotating discipline labels, interactive progress tracks, and a custom mouse tilt parallex background.
- **Our Work Bento Grid**: Premium category layout showing brand marketing, events, drone footage, and photography with interactive modular detail filters.
- **Meet the Creators**: A premium dual card grid highlighting the creative director and drone operator with a custom intersection count-up statistics deck.
- **Client Testimonies**: High-density statistics indicators and stylized blockquotes.
- **Responsive Navigation**: Smooth scroll logic anchoring directly to sections on the Home page, including a custom full-screen navigation drawer on mobile.
- **Cinematic Contact Page**: A glassmorphic form card allowing clients to submit project inquiries, integrated with **EmailJS** for direct secure communication.

---

## 🛠️ Technology Stack

- **Framework**: [React 19](https://react.dev/) + [Vite](https://vite.dev/)
- **Styling**: [TailwindCSS v4](https://tailwindcss.com/)
- **Animations**: [GSAP](https://gsap.com/) & [Framer Motion](https://www.framer.com/motion/)
- **Interactions**: [Swiper](https://swiperjs.com/) & [Lenis Smooth Scroll](https://lenis.darkroom.engineering/)
- **Email Service**: [EmailJS](https://www.emailjs.com/)

---

## ⚙️ Environment Configuration

The contact page uses EmailJS to handle submissions. To initialize this, copy the template variables below into a `.env` file at the root of the project:

```env
# EmailJS configuration credentials (do not commit this file to source control)
VITE_EMAILJS_SERVICE_ID=your_service_id_here
VITE_EMAILJS_TEMPLATE_ID=your_template_id_here
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
```

---

## 🚀 Running the Project

### 1. Installation
Clone the repository, navigate into the project directory, and install the package dependencies:
```bash
npm install
```

### 2. Development Server
Run the local dev server with hot module replacement (HMR) enabled:
```bash
npm run dev
```
Open [http://localhost:5173/](http://localhost:5173/) in your web browser.

### 3. Production Build
Prepare the highly optimized client bundle for production:
```bash
npm run build
```

### 4. Production Preview
Run a local web server to preview your built production site:
```bash
npm run preview
```