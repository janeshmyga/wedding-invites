# Свадебное приглашение

## Описание проекта
Персонализированное свадебное приглашение — фотогалерея из 6 слайдов с WebGL glass-эффектом переходов.
Каждый гость получает уникальную ссылку (например `домен.com/masha`), где один из слайдов персонализирован (позиция задаётся в `guests.json`).

## Стек
- **Framework**: Next.js 16 (App Router, static export)
- **Styling**: Tailwind CSS 4 + shadcn/ui
- **Animations**: GSAP 3 + Three.js (WebGL шейдеры)
- **Шрифт**: Cormorant Garamond (Google Fonts)
- **Хостинг**: Cloudflare Pages + свой `.com` домен (ещё не подключён)
- **Фото**: Cloudflare R2 (бакет для хранения фото, бесплатно до 10 ГБ)

## Структура проекта
```
app/
  [guest]/page.tsx     — Динамическая страница для каждого гостя (SSG)
  layout.tsx           — Корневой layout с шрифтом Cormorant Garamond
  page.tsx             — Главная (заглушка)
  globals.css          — Стили слайдера + адаптив для мобилки
components/ui/
  wedding-slider.tsx   — Основной компонент слайдера (WebGL + GSAP)
data/
  guests.json          — Данные всех гостей (имя, slug, фото, описание)
lib/
  guests.ts            — Утилиты для загрузки и поиска гостей
```

## Слайды
Всего 6 слайдов: 5 общих + 1 персональный для каждого гостя.

Порядок общих слайдов (фиксирован):
1. Детство
2. Первая встреча
3. Весь мир под ногами
4. Предложение
5. Save the Date

Персональный слайд вставляется на позицию `personalSlidePosition` (1–6) из `guests.json`.
Дефолт — позиция 4. Общие слайды при этом сдвигаются.

## Как добавить нового гостя
1. Загрузить совместное фото в Cloudflare R2 (папка `guests/`)
2. Добавить запись в `data/guests.json`
3. Задеплоить (`git push` — Cloudflare Pages сделает ребилд автоматически)

## Конвенции
- Язык кода: TypeScript
- Компоненты: React Server Components по умолчанию, `"use client"` только где нужен браузерный API
- Стили: Tailwind utility classes + CSS variables в globals.css
- Данные гостей: JSON файл (без базы данных, достаточно для 30-100 гостей)
- Фото: все URL ведут на Cloudflare R2 (публичный бакет), не хранить в репозитории

## Команды
```bash
npm run dev           # Запуск dev-сервера (localhost:3000)
npm run build         # Билд для продакшена (static export → папка out/)
npm run pages:deploy  # Деплой на Cloudflare Pages (npx wrangler pages deploy out)
```

---

## TODO — что осталось сделать

### 1. Настроить Cloudflare R2 (хранение фото)
- [ ] В Cloudflare Dashboard: R2 Object Storage → Create bucket (например `wedding-photos`)
- [ ] Включить публичный доступ: Settings → Public Access → Enable (получишь домен типа `pub-xxx.r2.dev`)
- [ ] Загрузить фото через Dashboard или CLI (`wrangler r2 object put`):
  - `shared/childhood.jpg` — фото детства
  - `shared/first-meeting.jpg` — первая встреча
  - `shared/travel.jpg` — путешествия
  - `shared/proposal.jpg` — предложение
  - `shared/wedding.jpg` — save the date
  - `guests/katya.jpg`, `guests/petya.jpg` и т.д. — персональные фото
- [ ] Заменить placeholder URL-ы в `data/guests.json` на реальные ссылки из R2

### 2. Заполнить данные гостей
- [ ] Открыть `data/guests.json`
- [ ] Для каждого гостя добавить объект:
  ```json
  {
    "slug": "katya",
    "name": "Катя",
    "meetingDescription": "Наша лучшая подруга!",
    "meetingPhoto": "https://pub-xxx.r2.dev/guests/katya.jpg",
    "personalSlidePosition": 4
  }
  ```
- [ ] `slug` — это часть URL (латиницей, без пробелов): `домен.com/katya`
- [ ] `name` — заголовок персонального слайда (как хочешь: "Катя", "Катюша", "Семья Ивановых")
- [ ] `personalSlidePosition` — позиция персонального слайда (1–6), по умолчанию 4
- [ ] Заменить placeholder URL-ы в `sharedPhotos` на реальные из R2

### 3. Деплой на Cloudflare Pages
Сайт полностью статический (static export), поэтому не нужны адаптеры — просто деплоим папку `out/`.

**Вариант А — через Git (автодеплой при push):**
- [ ] В Cloudflare Dashboard: Workers & Pages → Create → Pages → Connect to Git
- [ ] Импортировать репозиторий
- [ ] Настройки билда:
  - Build command: `npm run build`
  - Build output directory: `out`
- [ ] После деплоя получишь ссылку типа `wedding-invites.pages.dev`

**Вариант Б — через CLI (ручной деплой):**
- [ ] `npm install -g wrangler && wrangler login`
- [ ] `npm run build && npm run pages:deploy`

### 4. Подключить свой домен
- [ ] В Cloudflare Pages: Custom domains → добавить свой домен
- [ ] Если домен уже на Cloudflare — DNS настроится автоматически
- [ ] Если домен у другого регистратора — перенести NS на Cloudflare или добавить CNAME

### 5. Оптимизация фото
- [ ] Рассмотреть сжатие фото перед загрузкой (оригиналы по 13 МБ тяжёлые для мобильных)
- [ ] Вариант: Cloudflare Image Resizing (платно) или сжать заранее через tinypng.com / squoosh.app
- [ ] Целевой размер: 200-500 КБ на фото (достаточно для fullscreen на мобилке)

### 6. Финальная проверка
- [ ] Проверить каждую ссылку гостя (`домен.com/masha`, `домен.com/petya` и т.д.)
- [ ] Проверить на мобильном телефоне (основная аудитория!)
- [ ] Убедиться что все фото загружаются быстро
- [ ] Проверить 404 для несуществующих ссылок
