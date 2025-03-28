# Инструкция по деплою на Vercel

## Предварительные требования

1. Аккаунт на [GitHub](https://github.com/)
2. Аккаунт на [Vercel](https://vercel.com/)
3. Аккаунт на [Supabase](https://supabase.com/)
4. API ключи для Helius, Bitquery и PumpPortal

## Шаг 1: Подготовка репозитория GitHub

1. Форкните этот репозиторий на GitHub или создайте новый репозиторий и загрузите туда код проекта
2. Убедитесь, что структура проекта корректна:
   - В корне проекта есть файлы `package.json`, `next.config.js`, `vercel.json`
   - Файл `.env.local.example` присутствует

## Шаг 2: Настройка Supabase

1. Создайте новый проект в Supabase
2. Выполните скрипт миграции из файла `migrations/01_init_schema.sql` в SQL Editor
3. Настройте политики безопасности (RLS) и CORS (см. `migrations/init_supabase.md`)
4. Скопируйте URL проекта и анонимный ключ из раздела "Settings" > "API"

## Шаг 3: Деплой на Vercel

1. Зайдите в свой аккаунт на [Vercel](https://vercel.com/)
2. Нажмите "Add New" > "Project"
3. Выберите "Import Git Repository" и авторизуйтесь через GitHub
4. Выберите ваш репозиторий с проектом
5. В разделе "Configure Project":
   - Оставьте настройки Framework Preset как "Next.js"
   - В разделе "Environment Variables" добавьте все переменные окружения:
     ```
     NEXT_PUBLIC_SUPABASE_URL=ваш_supabase_url
     NEXT_PUBLIC_SUPABASE_ANON_KEY=ваш_supabase_anon_key
     HELIUS_API_KEY=ваш_helius_api_key
     WEBHOOK_SECRET=случайная_строка_для_безопасности_вебхука
     PUMP_FUN_PROGRAM_ID=адрес_программы_pump_fun
     BITQUERY_API_KEY=ваш_bitquery_api_key
     PUMPPORTAL_API_KEY=ваш_pumpportal_api_key
     ```
   - Нажмите "Deploy"

## Шаг 4: Настройка вебхука Helius

1. После успешного деплоя получите URL вашего приложения на Vercel (например, `https://your-app.vercel.app`)
2. Зарегистрируйтесь или войдите в аккаунт на [Helius](https://www.helius.xyz/)
3. В разделе Webhooks создайте новый вебхук:
   - URL: `https://your-app.vercel.app/api/webhook`
   - Тип транзакций: TOKEN_MINT
   - Дополнительные опции: "Enhanced"
   - В заголовках указать:
     ```
     Secret: ваш_WEBHOOK_SECRET
     ```

## Шаг 5: Проверка деплоя

1. Перейдите на опубликованный URL вашего приложения
2. Убедитесь, что дашборд загружается и отображает данные
3. Проверьте логи в Vercel на наличие ошибок
4. Если необходимо, внесите правки и повторите деплой

## Шаг 6: Настройка непрерывного развертывания (CI/CD)

Vercel автоматически настраивает CI/CD для вашего репозитория:
1. Каждый push в основную ветку будет инициировать новый деплой
2. Pull requests создадут preview deployments

## Шаг 7: Мониторинг и аналитика

1. Vercel предоставляет встроенные инструменты для мониторинга:
   - "Analytics" для отслеживания производительности
   - "Logs" для просмотра логов приложения
   - "Functions" для мониторинга serverless-функций

2. Дополнительно можно подключить:
   - Vercel Speed Insights для анализа производительности
   - Sentry для мониторинга ошибок

## Шаг 8: Передача проекта пользователю trafficbro

1. **Для GitHub репозитория**:
   - Перейдите в настройки репозитория: "Settings" > "Manage access"
   - Пригласите пользователя trafficbro как коллаборатора или
   - Передайте владение репозиторием: "Settings" > "Danger Zone" > "Transfer ownership"

2. **Для Vercel проекта**:
   - Перейдите в настройки проекта: "Settings" > "General"
   - В разделе "Transfer Project" выберите "Transfer to Personal Account"
   - Введите имя пользователя trafficbro

3. **Для Supabase проекта**:
   - Следуйте инструкциям в файле `migrations/init_supabase.md` для передачи проекта

## Дополнительные рекомендации

1. **Масштабирование**:
   - Для больших проектов рассмотрите возможность использования платных планов Supabase и Vercel
   - Настройте кэширование для уменьшения нагрузки на API

2. **Безопасность**:
   - Регулярно обновляйте зависимости
   - Используйте Vercel secrets для управления чувствительными переменными окружения
   - Настройте Row Level Security в Supabase 