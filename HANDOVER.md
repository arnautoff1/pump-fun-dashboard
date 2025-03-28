# Инструкция по передаче проекта trafficbro

Этот документ содержит пошаговые инструкции по настройке и передаче проекта дашборда для отслеживания токенов Pump.Fun.

## Подготовка к передаче

### 1. Настройка GitHub репозитория

```bash
# Для Linux/macOS
chmod +x ./scripts/setup-github.sh
./scripts/setup-github.sh

# Для Windows
.\scripts\setup-github.ps1
```

Скрипт выполнит:
- Инициализацию Git репозитория
- Создание первого коммита
- Настройку GitHub репозитория (при необходимости)

### 2. Настройка Supabase

1. Зайдите на [Supabase](https://supabase.com/) и создайте новый проект
2. В SQL Editor выполните скрипт миграции из файла `migrations/01_init_schema.sql`
3. В разделе "Project Settings" > "API" скопируйте:
   - Project URL (это значение для `NEXT_PUBLIC_SUPABASE_URL`)
   - Project API Keys > anon public (это значение для `NEXT_PUBLIC_SUPABASE_ANON_KEY`)

### 3. Настройка Vercel

1. Зайдите на [Vercel](https://vercel.com/) и создайте новый проект
2. Импортируйте GitHub репозиторий
3. Настройте следующие переменные окружения в разделе "Settings" > "Environment Variables":

```
NEXT_PUBLIC_SUPABASE_URL=<URL из Supabase>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon key из Supabase>
HELIUS_API_KEY=<ваш ключ API Helius>
WEBHOOK_SECRET=<случайная строка для безопасности вебхука>
PUMP_FUN_PROGRAM_ID=<адрес программы Pump.Fun>
BITQUERY_API_KEY=<ваш ключ API Bitquery>
PUMPPORTAL_API_KEY=<ваш ключ API PumpPortal>
```

4. Нажмите "Deploy"

### 4. Настройка вебхука Helius

1. Получите URL вашего приложения на Vercel (например, `https://your-app.vercel.app`)
2. Зарегистрируйтесь в [Helius](https://www.helius.dev/) и создайте новый вебхук:
   - URL: `https://your-app.vercel.app/api/webhook`
   - Тип транзакций: TOKEN_MINT
   - В заголовках указать `Secret: ваш_WEBHOOK_SECRET`

## Передача проекта

### 1. Передача GitHub репозитория

**Вариант 1: Добавление collaborator**
1. Перейдите в настройки репозитория: "Settings" > "Collaborators" > "Add people"
2. Добавьте пользователя trafficbro как collaborator

**Вариант 2: Передача ownership**
1. Перейдите в настройки репозитория: "Settings" > "General" > "Danger Zone" > "Transfer ownership"
2. Укажите пользователя trafficbro как нового владельца

### 2. Передача проекта Vercel

1. Перейдите в настройки проекта Vercel: "Settings" > "General" > "Transfer Project"
2. Выберите "Transfer to Personal Account"
3. Введите имя пользователя trafficbro

### 3. Передача проекта Supabase

1. В настройках проекта Supabase: "Project Settings" > "General" > "Transfer ownership"
2. Укажите email пользователя: arseniy.gruzdev@gmail.com

## Отправка учетных данных

Отправьте на email arseniy.gruzdev@gmail.com следующую информацию:

```
Тема письма: Передача проекта дашборда Pump.Fun

Уважаемый trafficbro,

Подготовлены и готовы к передаче:

1. GitHub репозиторий: <ссылка на репозиторий>
2. Проект Vercel: <ссылка на проект>
3. Проект Supabase:
   - URL: <NEXT_PUBLIC_SUPABASE_URL>
   - Key: <NEXT_PUBLIC_SUPABASE_ANON_KEY>

Дополнительно:
4. Учетные данные API:
   - HELIUS_API_KEY: <ваш ключ>
   - WEBHOOK_SECRET: <значение>
   - PUMP_FUN_PROGRAM_ID: <значение>
   - BITQUERY_API_KEY: <ваш ключ>
   - PUMPPORTAL_API_KEY: <ваш ключ>

Приглашения для доступа к репозиторию и проектам отправлены на этот же email.

С уважением,
<Ваше имя> 