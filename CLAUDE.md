# Свадебное приглашение

## Описание проекта
Персонализированное свадебное приглашение — фотогалерея из 6 слайдов с WebGL glass-эффектом переходов.
Каждый гость получает уникальную ссылку (например `домен.ru/masha`), где 4-й слайд персонализирован.

## Стек
- **Framework**: Next.js 15 (App Router, SSG)
- **Styling**: Tailwind CSS 4 + shadcn/ui
- **Animations**: GSAP 3 + Three.js (WebGL шейдеры)
- **Шрифт**: Cormorant Garamond (Google Fonts)
- **Хостинг**: Vercel + свой домен
- **Фото**: Cloudinary (бесплатно до 25GB)

## Структура проекта
```
app/
  [guest]/page.tsx     — Динамическая страница для каждого гостя (SSG)
  layout.tsx           — Корневой layout с шрифтами
  page.tsx             — Главная (заглушка)
components/ui/
  wedding-slider.tsx   — Основной компонент слайдера (WebGL + GSAP)
data/
  guests.json          — Данные всех гостей (имя, slug, фото, описание)
lib/
  guests.ts            — Утилиты для загрузки и поиска гостей
```

## Слайды
1. **Детство** — общая фото (shared)
2. **Первая встреча** — общая фото (shared)
3. **Весь мир под ногами** — общая фото (shared)
4. **Встреча с {Гость}** — УНИКАЛЬНАЯ фото и описание для каждого гостя
5. **Предложение** — общая фото (shared)
6. **Save the Date** — общая фото (shared)

## Как добавить нового гостя
1. Загрузить совместное фото в Cloudinary (папка `wedding/guests/`)
2. Добавить запись в `data/guests.json`
3. Задеплоить (`git push` — Vercel сделает ребилд автоматически)

## Конвенции
- Язык кода: TypeScript
- Компоненты: React Server Components по умолчанию, `"use client"` только где нужен браузерный API
- Стили: Tailwind utility classes + CSS variables в globals.css
- Данные гостей: JSON файл (без базы данных, достаточно для 30-100 гостей)
- Фото: все URL ведут на Cloudinary, не хранить в репозитории

## Команды
```bash
npm run dev      # Запуск dev-сервера (localhost:3000)
npm run build    # Билд для продакшена (SSG)
npm run start    # Запуск продакшен-сервера
```
