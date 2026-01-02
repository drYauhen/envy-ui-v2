# Dev App GraphQL Server

GraphQL сервер с SQLite базой данных для управления навигационным меню в dev-app.

## Структура

- `index.ts` - GraphQL сервер (GraphQL Yoga)
- `db/` - База данных SQLite
  - `database.ts` - Подключение и запросы к БД
  - `init.sql` - SQL схема
  - `seed.ts` - Начальные данные
- `schema/` - GraphQL схема
  - `schema.ts` - Схема, типы и resolvers

## Установка

```bash
cd server
npm install
```

## Инициализация базы данных

```bash
npm run db:init
```

Это создаст базу данных `db/database.sqlite` и заполнит её начальными данными.

## Запуск

### Только сервер
```bash
npm run dev
```

Сервер будет доступен на `http://localhost:3001/graphql`

### Вместе с фронтендом
Из корня `apps/dev-app/`:
```bash
npm run dev:all
```

Это запустит и фронтенд (Vite) и GraphQL сервер одновременно.

## GraphQL Playground

После запуска сервера откройте `http://localhost:3001/graphql` для доступа к GraphQL Playground.

### Пример запроса

```graphql
query {
  navigation {
    key
    title
    items {
      key
      label
      icon
      badge
      routePath
    }
  }
}
```

### Пример mutation

```graphql
mutation {
  updateNavigationItem(
    id: 1
    label: "New Label"
    icon: "new-icon"
  ) {
    id
    label
    icon
  }
}
```

## API Endpoints

- `POST /graphql` - GraphQL endpoint
- `GET /graphql` - GraphQL Playground (только в dev режиме)

## База данных

База данных SQLite хранится в `db/database.sqlite`. 

**Важно:** Файл базы данных добавлен в `.gitignore` и не будет коммититься в репозиторий.

## Структура БД

### navigation_sections
- `id` - Primary key
- `key` - Уникальный ключ секции
- `title` - Название секции
- `order_index` - Порядок отображения

### navigation_items
- `id` - Primary key
- `section_key` - Связь с секцией
- `key` - Уникальный ключ элемента
- `label` - Текст элемента
- `icon` - Имя иконки
- `badge` - Бейдж (опционально)
- `route_path` - Путь для навигации
- `order_index` - Порядок в секции
- `is_active` - Активен ли элемент
- `is_disabled` - Отключен ли элемент

