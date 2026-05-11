# turan-logix-web

Фронтенд для транспортно-экспедиционной компании **ИП «Туран Логистика»** (turanlogix.kz).

## Стек

| Слой | Технологии |
|---|---|
| Framework | React 18 + TypeScript |
| Сборка | Vite 5 |
| Стили | Tailwind CSS 3 |
| Анимации | Framer Motion |
| Маршрутизация | React Router v6 |
| Серверный state | TanStack Query v5 |
| Клиентский state | Zustand 5 |
| Локализация | react-i18next (RU / KZ / EN) |
| Формы | React Hook Form + Zod |
| HTTP | Axios |
| SEO | react-helmet-async |
| Уведомления | react-hot-toast |

## Быстрый старт

```bash
# Клонировать и установить зависимости
git clone https://github.com/Nurbek-K-A/turan-logix-web.git
cd turan-logix-web
npm install

# Настроить окружение
cp .env.example .env
# Заполнить VITE_API_URL (адрес turan-logix-api)

# Запустить dev-сервер
npm run dev
# → http://localhost:5173
```

## Переменные окружения

| Переменная | Описание | Пример |
|---|---|---|
| `VITE_API_URL` | URL бэкенда | `http://localhost:8080` |
| `VITE_APP_URL` | URL сайта | `https://turanlogix.kz` |
| `VITE_DEFAULT_LOCALE` | Язык по умолчанию | `ru` |
| `VITE_MAPBOX_TOKEN` | Токен Mapbox (опционально) | `pk.eyJ1...` |

## Структура проекта

```
src/
├── components/
│   ├── layout/           # Navbar, Footer, Layout
│   ├── sections/         # Секции главной страницы
│   │   ├── HeroSection       — главный экран с CTA
│   │   ├── StatsSection      — анимированные счётчики
│   │   ├── ServicesSection   — карточки услуг
│   │   ├── RoutesSection     — таблица маршрутов
│   │   ├── CalculatorSection — калькулятор стоимости
│   │   ├── AiChatSection     — виджет ИИ-ассистента
│   │   ├── AboutSection      — о компании
│   │   └── ContactsSection   — контакты + форма
│   └── ui/               # LoadingScreen и прочие утилиты
├── pages/
│   ├── Home.tsx              # Главная (все секции)
│   ├── Chat.tsx              # Полноэкранный чат с ИИ
│   ├── Login.tsx / Register.tsx
│   ├── Cabinet.tsx           # Личный кабинет клиента
│   ├── Orders.tsx            # Список заявок + создание
│   ├── OrderDetail.tsx       # Заявка: прогресс, документы
│   ├── Services / Routes / About / Contacts
│   └── NotFound.tsx
├── services/
│   └── api.ts            # Axios клиент + все API методы
├── store/
│   └── index.ts          # Zustand: auth + theme
├── i18n/
│   ├── index.ts           # i18next конфиг
│   └── locales/
│       ├── ru.json
│       ├── kz.json
│       └── en.json
└── App.tsx               # Роуты + провайдеры
```

## API интеграция

Фронт работает с `turan-logix-api` (ASP.NET Core 8):

| Метод | URL | Описание |
|---|---|---|
| POST | `/api/auth/login` | Вход |
| POST | `/api/auth/register` | Регистрация |
| GET | `/api/profile` | Мой профиль |
| GET | `/api/orders/my` | Мои заявки |
| POST | `/api/orders` | Создать заявку |
| GET | `/api/orders/:id` | Детали заявки |
| GET | `/api/orders/:id/documents` | Документы |
| POST | `/api/orders/:id/documents/upload` | Загрузить документ |
| POST | `/api/chat` | AI чат-бот |

JWT-токен хранится в `localStorage` и автоматически добавляется в заголовки.

## Локализация

Поддерживаются языки: `ru` (русский), `kz` (қазақша), `en` (English).

В будущем планируется: `ky` (Кыргызча), `uz` (O'zbekcha), `zh` (中文).

Для добавления нового языка:
1. Создать `src/i18n/locales/ky.json` (по образцу `ru.json`)
2. Добавить импорт в `src/i18n/index.ts`
3. Добавить в массив `SUPPORTED_LANGUAGES`

## Сборка и деплой

```bash
# Production build
npm run build
# → dist/

# Docker build
docker build -t turanlogix/web:latest \
  --build-arg VITE_API_URL=https://api.turanlogix.kz \
  .

# Docker Compose (вместе с API)
docker compose up -d
```

CI/CD автоматически запускается на push в `main`:
1. TypeScript type check
2. ESLint
3. Docker build + push to Docker Hub
4. SSH deploy на VPS

## GitHub Secrets

| Secret | Описание |
|---|---|
| `DOCKER_USERNAME` | Docker Hub логин |
| `DOCKER_PASSWORD` | Docker Hub пароль |
| `SERVER_HOST` | IP VPS |
| `SERVER_USER` | SSH пользователь |
| `SERVER_SSH_KEY` | SSH приватный ключ |

## Безопасность

- **HTTPS** + HSTS через nginx
- **CSP** (Content Security Policy) заголовки
- **JWT** в localStorage (не в cookie, т.к. SPA)
- **Rate limiting** на `/api/` через nginx (30 req/min)
- Блокировка скрытых файлов (`.env`, `.git`)
- Non-root пользователь в Docker-контейнере

## Связанные репозитории

- **API**: [turan-logix-api](https://github.com/Nurbek-K-A/turan-logix-api)
- **Домен**: turanlogix.kz

---

ИП «Туран Логистика» · Алматы, Казахстан · info@turanlogix.kz
