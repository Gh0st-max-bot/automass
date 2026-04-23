# Automas - Intelligent Automation Website

A modern, responsive static website template designed for an AI and Robotics company. Built with semantic HTML5, CSS3, and Vanilla JavaScript.

## 🚀 Quick Start

1.  **Clone or Download** this repository.
2.  Navigate to the project folder.
3.  Open `automas.html` in your preferred web browser (Chrome, Firefox, Edge, Safari).

No build steps, servers, or dependencies are required!

## 📂 Project Structure

- **HTML Pages**
  - `automas.html`: The main landing page.
  - `products.html`: Product catalog with technical details.
  - `solutions.html`: Industry-specific solutions.
  - `resources.html`: Documentation, API ref, and Contact form.
  - `education.html`: Learning paths and certification info.

- **Assets**
  - `automas.css`: Contains all styling, variables, animations, and responsive rules.
  - `automas.js`: Handles logic for navigation, search, toggles, and form validation.

## ✨ Features

- **Dark/Light Mode**: Toggles theme with a button in the header and saves preference to `localStorage`.
- **Responsive Design**: Adapts seamlessly to mobile, tablet, and desktop screens.
- **Interactive Navigation**:
  - Sticky header.
  - Dropdown menus with keyboard support.
  - Active state highlighting for sidebar links.
- **Search Functionality**: Real-time filtering of sidebar links and articles.
- **Animations**:
  - Fade-in scroll animations using Intersection Observer.
  - Smooth scrolling for anchor links.
  - Back-to-top button.
- **Contact Form**: Client-side validation with a loading spinner simulation.

## 🛠️ How to Modify

### Changing Colors
Open `automas.css` and modify the `:root` variables at the top of the file to change the default (dark) theme, or the `body.light-mode` block for the light theme.

```css
:root {
  --primary-color: #00bcd4; /* Change this */
  /* ... */
}
```

### Adding New Pages
1. Copy an existing HTML file (e.g., `resources.html`).
2. Rename it.
3. Update the navigation links in the `<header>` section to include your new page.

### JavaScript Logic
Logic is centralized in `automas.js`.
- **Search**: Modifies `display` properties based on input.
- **Theme**: Toggles a class on `<body>`.
- **Form**: Intercepts `submit` event for validation.

## 📝 License

This project is open for modification and personal use.