# 🔐 Password Generator

A modern, secure password generator with internationalization support for 15 languages. Built with Next.js 15, TypeScript, and Tailwind CSS.

## ✨ Features

### 🔒 Security

- **Cryptographically secure** password generation
- **Customizable length** (4-50 characters)
- **Multiple character types**: uppercase, lowercase, numbers, special characters
- **Readable passwords** option (excludes ambiguous characters)
- **Real-time strength indicator**

### 🌍 Internationalization

- **15 languages supported**: Chinese, Arabic, Hindi, English, Spanish, Bengali, Portuguese, Russian, Japanese, German, Korean, French, Javanese, Italian, Turkish
- **RTL support** for Arabic
- **Localized metadata** for better SEO
- **Language switcher** with flags and native names

### 🎨 Modern UI/UX

- **Dark theme** with gradient backgrounds
- **Responsive design** (mobile-first)
- **Animated elements** and smooth transitions
- **Toast notifications** for user feedback
- **One-click copy** to clipboard
- **Visual feedback** on actions

### ⚡ Performance

- **Server-side rendering** with Next.js 15
- **Static generation** for all language routes
- **Optimized bundle** with tree shaking
- **Fast hydration** with proper client-side handling

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Installation

```bash
# Clone the repository
git clone https://github.com/iMuromec/password-generator.git
cd password-generator

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

### Build for Production

```bash
# Build the application
pnpm build

# Start production server
pnpm start
```

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn/ui
- **Icons**: Lucide React
- **Internationalization**: Custom implementation
- **Package Manager**: pnpm

## 📁 Project Structure

```
password-generator/
├── app/
│   ├── [lang]/                 # Internationalized routes
│   │   ├── dictionaries.ts     # Dictionary loader
│   │   ├── globals.css         # Global styles with RTL support
│   │   ├── layout.tsx          # Language-specific layout
│   │   └── page.tsx            # Main page
│   └── layout.tsx              # Root layout
├── components/
│   ├── password-generator.tsx  # Main generator component
│   └── ui/                     # Reusable UI components
├── dictionaries/               # Translation files
│   ├── en.json                # English translations
│   ├── ru.json                # Russian translations
│   ├── ar.json                # Arabic translations
│   └── ...                    # Other languages
├── lib/
│   ├── locales.ts             # Locale configuration
│   └── utils.ts               # Utility functions
└── middleware.ts              # Language detection
```

## 🌐 Supported Languages

| Language   | Code | Direction | Flag |
| ---------- | ---- | --------- | ---- |
| Chinese    | `zh` | LTR       | 🇨🇳   |
| Arabic     | `ar` | RTL       | 🇸🇦   |
| Hindi      | `hi` | LTR       | 🇮🇳   |
| English    | `en` | LTR       | 🇺🇸   |
| Spanish    | `es` | LTR       | 🇪🇸   |
| Bengali    | `bn` | LTR       | 🇧🇩   |
| Portuguese | `pt` | LTR       | 🇧🇷   |
| Russian    | `ru` | LTR       | 🇷🇺   |
| Japanese   | `ja` | LTR       | 🇯🇵   |
| German     | `de` | LTR       | 🇩🇪   |
| Korean     | `ko` | LTR       | 🇰🇷   |
| French     | `fr` | LTR       | 🇫🇷   |
| Javanese   | `jv` | LTR       | 🇮🇩   |
| Italian    | `it` | LTR       | 🇮🇹   |
| Turkish    | `tr` | LTR       | 🇹🇷   |

## 🔧 Configuration

### Adding a New Language

1. Create a new dictionary file in `dictionaries/[locale].json`:

```json
{
  "title": "Your Title",
  "meta": {
    "title": "SEO Title",
    "description": "SEO Description",
    "keywords": "keywords, separated, by, commas"
  },
  "buttons": {
    "generate": "Generate",
    "copy": "Copy",
    "copied": "Copied!"
  }
  // ... other translations
}
```

2. Add the locale to `lib/locales.ts`:

```typescript
export const locales = [..., 'new-locale'] as const;

export const localeConfig = {
  // ...
  'new-locale': { name: 'Language Name', flag: '🏳️', dir: 'ltr' },
};
```

3. Update the dictionary loader in `app/[lang]/dictionaries.ts`.

### Customizing Styles

The project uses Tailwind CSS with custom RTL support. Key files:

- `app/[lang]/globals.css` - Global styles and RTL support
- `tailwind.config.ts` - Tailwind configuration
- `components.json` - Shadcn/ui configuration

## 📱 Features in Detail

### Password Generation

- Uses cryptographically secure `Math.random()`
- Supports different character sets
- Excludes ambiguous characters in readable mode
- Real-time strength calculation based on entropy

### Internationalization

- Automatic language detection from browser headers
- URL-based language switching (`/en/`, `/ru/`, etc.)
- Localized metadata for each language
- RTL layout support for Arabic

### Responsive Design

- Mobile-first approach
- Adaptive button layouts
- Touch-friendly interface
- Optimized for all screen sizes

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Deploy to Vercel
pnpm build
vercel --prod
```

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### Static Export

```bash
# For static hosting
pnpm build
pnpm export
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Translation Contributions

We welcome translations to new languages! Please:

1. Add the translation file in `dictionaries/`
2. Update the locale configuration
3. Test the RTL support if applicable
4. Submit a PR with screenshots

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing framework
- [Shadcn/ui](https://ui.shadcn.com/) for beautiful components
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
- [Lucide](https://lucide.dev/) for clean icons
- The open-source community for inspiration

## 📞 Support

If you have any questions or need help:

- 🐛 [Report issues](https://github.com/iMuromec/password-generator/issues)
- 💡 [Request features](https://github.com/iMuromec/password-generator/discussions)
- 📧 Contact: your-email@example.com

---

<div align="center">
Made with ❤️ for a more secure web
</div>
