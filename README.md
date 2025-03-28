# Pump.Fun Token Tracker

Проект для отслеживания новых токенов на Pump.Fun, анализа активности разработчиков и статистики (King of the Hill, миграции на Pump Swap).

## Статус проекта
- GitHub: ✅ Репозиторий готов к передаче
- Vercel: ✅ Приложение готово к деплою и передаче
- Supabase: ✅ Схема базы данных готова к развертыванию

> **ВАЖНО:** Проект полностью готов к передаче пользователю trafficbro. Детальные инструкции по настройке и передаче проекта находятся в файле `HANDOVER.md`.

## Передача проекта пользователю trafficbro
1. **GitHub**: Прими приглашение как collaborator или запроси transfer ownership
2. **Vercel**: Прими transfer проекта (Settings > General > Transfer Project)
3. **Supabase**: Используй следующие учетные данные или запроси transfer проекта:
   - URL: [NEXT_PUBLIC_SUPABASE_URL будет вставлен после настройки]
   - Key: [NEXT_PUBLIC_SUPABASE_ANON_KEY будет вставлен после настройки]

## Вебхук Helius
- URL: [VERCEL_URL]/api/webhook
- Настроен с фильтром по Solana-адресу Pump.Fun
- Тип: TOKEN_MINT
- Фильтрация: Используется переменная PUMP_FUN_PROGRAM_ID для фильтрации только токенов Pump.Fun

## Обзор проекта

Это дашборд для мониторинга новых токенов на платформе Pump.Fun. Проект позволяет:
- Отслеживать новые токены в реальном времени
- Анализировать активность разработчиков
- Просматривать статистику по токенам (King of the Hill, миграции на Pump Swap)
- Фильтровать и сортировать данные

## Используемые технологии

- **Frontend**: Next.js 14, React 18, Tailwind CSS
- **Backend**: Serverless функции Next.js API routes
- **База данных**: Supabase (PostgreSQL)
- **API**: 
  - Helius API: для получения данных о новых токенах через вебхуки
  - Bitquery API: для получения дополнительной информации о разработчиках
  - PumpPortal API: для получения дополнительных данных о токенах

## Локальная установка

1. Клонируйте репозиторий:
```bash
git clone <URL_репозитория>
cd pump-fun-token-tracker
```

2. Установите зависимости:
```bash
npm install
```

3. Создайте файл `.env.local` на основе `.env.example`:
```bash
cp .env.local.example .env.local
```

4. Заполните переменные окружения в `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL`: URL вашего проекта Supabase
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Публичный ключ Supabase
   - `HELIUS_API_KEY`: Ключ API Helius
   - `WEBHOOK_SECRET`: Случайная строка для верификации вебхуков
   - `PUMP_FUN_PROGRAM_ID`: Адрес программы Pump.Fun для фильтрации токенов
   - `BITQUERY_API_KEY`: Ключ API Bitquery
   - `PUMPPORTAL_API_KEY`: Ключ API PumpPortal

5. Инициализируйте базу данных Supabase (см. раздел "База данных").

6. Запустите проект в режиме разработки:
```bash
npm run dev
```

## Деплой на Vercel

### Подготовка Supabase

1. Создайте новый проект в [Supabase](https://supabase.com/)
2. В разделе SQL Editor выполните скрипт миграции из файла `migrations/01_init_schema.sql`
3. Скопируйте URL и ANON KEY из настроек проекта ("Settings" > "API")

### Настройка проекта в Vercel

1. Форкните репозиторий в ваш GitHub аккаунт или создайте новый репозиторий
2. Перейдите на [Vercel](https://vercel.com/) и импортируйте ваш репозиторий:
   - "Add New" > "Project" > "Import Git Repository"
   - Выберите ваш репозиторий с проектом
   
3. Настройте переменные окружения в Vercel:
   - "Settings" > "Environment Variables"
   - Добавьте все переменные из `.env.local.example`:
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
     - `HELIUS_API_KEY`
     - `WEBHOOK_SECRET`
     - `BITQUERY_API_KEY`
     - `PUMPPORTAL_API_KEY`

4. Задеплойте проект, нажав "Deploy"

### Настройка вебхука Helius

1. После деплоя получите URL вашего приложения на Vercel
2. Настройте вебхук в Helius:
   - URL вебхука: `https://ваш-домен.vercel.app/api/webhook`
   - Тип транзакций: TOKEN_MINT
   - Используйте `WEBHOOK_SECRET` для защиты вебхука

## База данных

Проект использует Supabase в качестве базы данных для хранения информации о токенах и разработчиках.

### Структура базы данных

#### Таблица tokens
- `id`: UUID, первичный ключ
- `contract_address`: Адрес контракта токена
- `token_name`: Название токена
- `token_symbol`: Символ токена
- `dev_address`: Адрес разработчика
- `created_at`: Дата и время создания
- `is_king_of_the_hill`: Флаг King of the Hill
- `is_migrated`: Флаг миграции на Pump Swap
- Другие поля с метаданными токена

#### Таблица developers
- `id`: UUID, первичный ключ
- `dev_address`: Адрес разработчика
- `dev_name`: Имя разработчика
- `total_tokens`: Общее количество токенов
- `king_of_the_hill_count`: Количество токенов King of the Hill
- `migrated_count`: Количество мигрированных токенов
- `tokens_list`: Список адресов токенов
- Другие поля с метаданными разработчика

### Миграция

Скрипт миграции находится в файле `migrations/01_init_schema.sql`.

## Используемые API

### Helius API
- **Назначение**: Основной источник данных о новых токенах через вебхуки
- **Эндпоинты**:
  - `/token-metadata`: Получение метаданных токена
  - `/webhooks`: Настройка вебхуков для получения уведомлений о новых минтах
- **Переменные окружения**: `HELIUS_API_KEY`, `WEBHOOK_SECRET`

### Bitquery API
- **Назначение**: Получение дополнительной информации о разработчиках
- **Эндпоинты**:
  - GraphQL-запросы для получения статистики по кошелькам
- **Переменные окружения**: `BITQUERY_API_KEY`

### PumpPortal API
- **Назначение**: Получение данных о миграции и статусе King of the Hill
- **Переменные окружения**: `PUMPPORTAL_API_KEY`

## Техническое обслуживание

### Периодические задачи

1. **Проверка актуальности данных**:
   - Запустите `/api/maintenance/refresh-tokens`, чтобы обновить метаданные токенов
   - Регулярность: раз в день

2. **Очистка старых данных**:
   - Настройте в Supabase хранение данных согласно `DATA_RETENTION_DAYS`
   - Регулярность: автоматически

### Мониторинг

Рекомендуется настроить мониторинг API-запросов и производительности через инструменты Vercel:
- Vercel Analytics для мониторинга производительности
- Логи Vercel для отслеживания ошибок

## Передача проекта

Для передачи проекта пользователю trafficbro, следуйте инструкциям в файле `HANDOVER.md`, где подробно описан процесс настройки и передачи всех компонентов проекта.

## Лицензия

MIT

---

Создано с использованием Next.js, Supabase и Helius.