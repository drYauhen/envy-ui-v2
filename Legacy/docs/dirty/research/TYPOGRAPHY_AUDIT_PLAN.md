# План аудита типографики Envy UI v2

## Цель
Провести аудит существующей типографической системы на соответствие архитектуре компонентов (эталон: Badge) и задокументировать найденные проблемы для будущих исправлений.

## Контекст

### КРИТИЧНО: Multi-Context Архитектура

**Ключевой архитектурный факт:**
- Контексты могут **одновременно существовать на одной странице**
- Контексты могут быть **вложенными** (app внутри website, report внутри app)
- Темы **переключаются на лету per-context**
- Каждый контекст должен иметь **независимый baseline**

**Следствия для Typography:**
1. `rem` - глобален от root (обычно 16px), не контекстный
2. Baseline контекста задается через scoped правила:
   ```css
   [data-eui-context="app"] { font-size: 0.875rem; } /* 14px при root 16px */
   [data-eui-context="website"] { font-size: 1.125rem; } /* 18px при root 16px */
   ```
3. Typography API должен быть **контекст-нейтральным**
4. Резолюция значений по **ближайшему [data-eui-context]**

### Эталонная архитектура (Badge)
Badge компонент следует строгой архитектуре:
1. **Токены**: `tokens/components/badge.tokens.json` (DTCG структура)
2. **Контракт**: `tokens/components/badge.contract.json` (axes, selectors, componentVars)
3. **CSS структура**: `src/ui/components/badge/badge.structure.css` (только селекторы + var())
4. **CSS токены**: `generated/css/components/badge.tokens.css` (автогенерация)
5. **Правила ARCH-components-001**:
   - Single Source of Truth (токены JSON)
   - No Hardcoded Values (только var())
   - Theme Overrides via Compound Selectors
   - OKLCH Color Space
   - Semantic Layer Resolution
   - Component CSS Responsibility

**НО: Typography НЕ компонент, а Foundation/Roles слой**

### Текущее состояние типографики

**Токены:**
- Primitives: `/tokens/primitives/typography.json` (fontSize, fontWeight, lineHeight, letterSpacing, fontFamily)
- Context raw: `/tokens/contexts/app/raw/typography.json` (алиасы)
- Semantics: `/tokens/contexts/app/semantics/typography/text-styles.json` (heading, title, body, label, caption, overline, code)

**CSS:**
- `/src/ui/typography.css` - 20+ утилитных классов (.eui-text-*)

**ADR-0018:**
- REM для font-size (глобальное масштабирование)
- EM для spacing/icons (пропорциональное)
- PX для фиксированных размеров
- App context базовый size: 14px

## Шаги аудита

### Этап 1: Проверка иерархии токенов (30 мин)

**Задачи:**
1. Проверить структуру `primitives/typography.json`:
   - Используются ли абсолютные значения?
   - Соответствуют ли единицы ADR-0018 (REM для fontSize)?
   - Нет ли циклических ссылок?

2. Проверить `contexts/app/raw/typography.json`:
   - Ссылаются ли токены только на primitives?
   - Правильное ли пространство имен (eui.app.raw.*)?

3. Проверить `contexts/app/semantics/typography/text-styles.json`:
   - Ссылаются ли токены на primitives/raw (не на components)?
   - Правильная ли семантика (heading, body, label)?
   - Единый ли источник истины (deprecated файлы headings.json, titles.json, body.json, labels.json)?

**Файлы для проверки:**
- `/Users/eugenegoncharov/Projects/envy-ui-v2/tokens/primitives/typography.json`
- `/Users/eugenegoncharov/Projects/envy-ui-v2/tokens/contexts/app/raw/typography.json`
- `/Users/eugenegoncharov/Projects/envy-ui-v2/tokens/contexts/app/semantics/typography/text-styles.json`
- `/Users/eugenegoncharov/Projects/envy-ui-v2/tokens/contexts/app/semantics/typography/headings.json`
- `/Users/eugenegoncharov/Projects/envy-ui-v2/tokens/contexts/app/semantics/typography/titles.json`
- `/Users/eugenegoncharov/Projects/envy-ui-v2/tokens/contexts/app/semantics/typography/body.json`
- `/Users/eugenegoncharov/Projects/envy-ui-v2/tokens/contexts/app/semantics/typography/labels.json`

### Этап 2: Проверка CSS (20 мин)

**Задачи:**
1. Проверить `src/ui/typography.css`:
   - Нет ли литеральных значений (px, #, oklch)?
   - Все ли значения через var()?
   - Правильная ли структура селекторов?

2. Проверить генерацию CSS:
   - Существует ли `generated/css/components/typography.tokens.css` или аналог?
   - Генерируются ли CSS переменные из токенов?

3. Сравнить с Badge:
   - Разделены ли структура и токены?
   - CSS в правильной директории (`src/ui/components/typography/`)?

**Файлы для проверки:**
- `/Users/eugenegoncharov/Projects/envy-ui-v2/src/ui/typography.css`
- `/Users/eugenegoncharov/Projects/envy-ui-v2/generated/css/` (поиск typography)
- `/Users/eugenegoncharov/Projects/envy-ui-v2/src/ui/components/badge/badge.structure.css` (эталон)

### Этап 3: Проверка контракта (15 мин)

**Задачи:**
1. Проверить наличие `tokens/components/typography.contract.json`:
   - Существует ли файл?
   - Определены ли axes (style, level, weight)?
   - Определены ли selectors (scope, root)?
   - Определены ли componentVars?

2. Сравнить с Badge контрактом:
   - Аналогичная ли структура?
   - Полнота описания?

**Файлы для проверки:**
- `/Users/eugenegoncharov/Projects/envy-ui-v2/tokens/components/typography.contract.json` (ожидается отсутствие)
- `/Users/eugenegoncharov/Projects/envy-ui-v2/tokens/components/badge.contract.json` (эталон)

### Этап 4: Проверка ADR-0018 соответствия (20 мин)

**Задачи:**
1. Проверить единицы измерения в primitives:
   - fontSize: должны быть REM (не PX)
   - lineHeight: unitless числа (1.25, 1.5) ✓
   - letterSpacing: EM ✓

2. Проверить единицы в CSS:
   - font-size: должны использовать REM переменные
   - padding/spacing: должны использовать EM (если применимо)
   - line-height: должны использовать unitless

3. Проверить базовый font-size:
   - Установлен ли в :root?
   - Правильное ли значение для app context (14px согласно ADR)?

**Файлы для проверки:**
- `/Users/eugenegoncharov/Projects/envy-ui-v2/tokens/primitives/typography.json`
- `/Users/eugenegoncharov/Projects/envy-ui-v2/src/ui/typography.css`
- `/Users/eugenegoncharov/Projects/envy-ui-v2/docs/adr/ADR-0018-typography-units-architecture-rem-em-px.md`

### Этап 5: Проверка компонентных токенов (15 мин)

**Задачи:**
1. Проверить наличие `tokens/components/typography.tokens.json`:
   - Существует ли файл?
   - Если да, правильная ли структура (DTCG)?

2. Определить, где живут typography токены:
   - В semantics? (текущее)
   - В components? (как Badge)
   - Hybrid подход?

3. Проверить ссылки:
   - Если токены в components, ссылаются ли они только на semantics?

**Файлы для проверки:**
- `/Users/eugenegoncharov/Projects/envy-ui-v2/tokens/components/typography.tokens.json` (ожидается отсутствие)
- `/Users/eugenegoncharov/Projects/envy-ui-v2/tokens/contexts/app/semantics/typography/text-styles.json`

### Этап 6: Проверка организации файлов (10 мин)

**Задачи:**
1. Сравнить структуру с Badge:
   ```
   Badge:
   ├── tokens/components/badge.tokens.json
   ├── tokens/components/badge.contract.json
   ├── src/ui/components/badge/badge.index.css
   ├── src/ui/components/badge/badge.structure.css
   └── generated/css/components/badge.tokens.css

   Typography (текущее):
   ├── tokens/contexts/app/semantics/typography/text-styles.json
   └── src/ui/typography.css

   Typography (ожидаемое?):
   ├── tokens/components/typography.tokens.json
   ├── tokens/components/typography.contract.json
   ├── src/ui/components/typography/typography.index.css
   ├── src/ui/components/typography/typography.structure.css
   └── generated/css/components/typography.tokens.css
   ```

2. Определить, является ли Typography компонентом или утилитами:
   - Badge = компонент (visual wrapper)
   - Typography = утилиты (text styles)
   - Нужна ли полная Badge-like структура?

**Директории для проверки:**
- `/Users/eugenegoncharov/Projects/envy-ui-v2/src/ui/components/`
- `/Users/eugenegoncharov/Projects/envy-ui-v2/tokens/components/`

## Ожидаемые находки

### 🔴 Критические проблемы

**Проблема 1: ПОТЕНЦИАЛЬНОЕ НАРУШЕНИЕ ADR-0018 (требует уточнения)**
- **Что:** `primitives/typography.json` использует PX для fontSize
- **Контекст:** ADR-0018 требует REM, НО в multi-context архитектуре нужно решить КАК:
  - ❌ **НЕПРАВИЛЬНО**: Конвертация `rem = px / 14` (привязка к app context)
    - Сломает независимость контекстов
    - Вложенные контексты будут масштабироваться неправильно
    - Website/report начнут масштабироваться вместе с app
  - ✅ **ПРАВИЛЬНО**: Либо PX (контекст-независимые), либо REM от root 16px:
    ```json
    // Вариант A: Оставить PX (контекст-независимо)
    "xs": { "$value": "12px" }

    // Вариант B: REM от root 16px (стандартный)
    "xs": { "$value": "0.75rem" }  // 12px / 16px = 0.75rem

    // А baseline контекста задавать scoped:
    [data-eui-context="app"] { font-size: 0.875rem; } /* 14px */
    [data-eui-context="website"] { font-size: 1.125rem; } /* 18px */
    ```
- **Влияние:**
  - ADR-0018 нужно уточнить для multi-context
  - Текущие PX могут быть валидны (контекст-независимость)
  - Или нужна стратегия REM + scoped baseline
- **Статус:** **ЗАБЛОКИРОВАНО до архитектурного решения**

**Проблема 2: Отсутствие Foundation контракта**
- **Что:** Нет `typography.foundation.contract.json`
- **Должно быть:** Foundation contract (НЕ component contract как Badge)
- **Отличие от Badge:**
  - Badge = UI компонент с axes/variants
  - Typography = Foundation roles (утилиты)
  - Контракт должен документировать:
    - Scoping per context
    - Invariants (context-neutral API)
    - Typography roles (.eui-text-* API)
    - Связь с semantic tokens
    - НЕ component axes/variants
- **Влияние:**
  - Нет документации foundation roles
  - Нет описания scoping и context-neutrality
  - Сложнее понять архитектуру для разработчиков

**Проблема 3: Неправильная организация файлов**
- **Что:** CSS в `src/ui/typography.css` (корневой уровень)
- **Должно быть:** Foundation структура (НЕ components)
  ```
  src/ui/foundation/typography/typography.structure.css
  generated/css/foundation/typography.tokens.css
  ```
- **Влияние:**
  - Неправильная категоризация (не в foundation)
  - Нет разделения structure/tokens как у Badge
  - Сложнее найти и поддерживать

### 🟡 Средние проблемы

**Проблема 4: Правильное размещение токенов (НЕ проблема)**
- **Что:** Typography токены в semantics, не в components
- **Статус:** ✅ **Правильно**
  - Typography = Foundation/Roles, НЕ UI компонент
  - Semantic токены правильно размещены
  - НЕ нужно создавать `components/typography.tokens.json`
  - НЕ нужны component axes как у Badge
- **Действие:** Оставить как есть
- **Документировать:** Foundation contract объясняет, что это утилиты

**Проблема 5: Дублирование токенов**
- **Что:** Deprecated файлы (headings.json, titles.json, body.json, labels.json) всё ещё существуют
- **Должно быть:** Удалить после миграции на text-styles.json
- **Влияние:**
  - Путаница о источнике истины
  - Потенциальные несоответствия

**Проблема 6: Нет генерации typography.tokens.css**
- **Что:** Возможно отсутствует `generated/css/components/typography.tokens.css`
- **Должно быть:** Автогенерация CSS переменных из токенов
- **Влияние:**
  - Ручное управление переменными
  - Риск несоответствия токенов и CSS

### 🟢 Что работает хорошо

1. ✅ **CSS использует var()**: Нет литеральных значений в typography.css
2. ✅ **Semantic структура**: text-styles.json хорошо организован (heading, title, body, label)
3. ✅ **Правильные единицы**: lineHeight (unitless), letterSpacing (em)
4. ✅ **Font family**: Правильные fallback стеки (Source Sans 3, monospace)
5. ✅ **DTCG schema**: Токены следуют DTCG 2025 формату

## Рекомендации для будущих исправлений

### ⚠️ ЗАБЛОКИРОВАНО: ADR-0018 миграция требует архитектурного решения

**Что нельзя делать:**
- ❌ PX→REM конверсию по базе 14px (app context)
- ❌ Изменять root html font-size ради app контекста
- ❌ Любые глобальные правила, затрагивающие все контексты одновременно

**Что нужно решить сначала:**
1. **Стратегия multi-context baseline:**
   - Вариант A: Оставить PX в primitives (контекст-независимо)
   - Вариант B: REM от root 16px + scoped baseline per context

2. **Если Вариант B (REM):**
   ```json
   // primitives/typography.json
   "fontSize": {
     "xs": { "$value": "0.75rem" },   // 12px при root 16px
     "sm": { "$value": "0.875rem" },  // 14px при root 16px
     "base": { "$value": "1rem" },    // 16px при root 16px
     "md": { "$value": "1.125rem" },  // 18px при root 16px
     ...
   }

   // CSS scoped baseline
   [data-eui-context="app"] {
     font-size: 0.875rem; /* 14px базовый для app */
   }
   [data-eui-context="website"] {
     font-size: 1.125rem; /* 18px базовый для website */
   }
   [data-eui-context="report"] {
     font-size: 0.75rem; /* 12px базовый для report */
   }
   ```

3. **Обновить ADR-0018:**
   - Добавить раздел "Multi-Context Considerations"
   - Задокументировать scoped baseline стратегию
   - Объяснить почему rem не контекстный

**Статус:** Требуется отдельный ADR или обновление ADR-0018

### Приоритет 1: Foundation структура (4-6 часов)

**Задача:** Создать foundation contract и реорганизовать файлы

**Шаги:**
1. Создать `/tokens/foundation/typography.contract.json`:
   ```json
   {
     "foundation": "typography",
     "type": "roles",
     "description": "Foundation typography roles (utilities), not a UI component",
     "selectors": {
       "scope": "[data-eui-context]",
       "api": ".eui-text-*"
     },
     "roles": {
       "heading": ["1", "2", "3", "4", "5", "6"],
       "title": ["lg", "md", "sm"],
       "body": ["large", "base", "small"],
       "bodyStrong": ["base", "small"],
       "label": ["md", "sm"],
       "caption": [],
       "overline": [],
       "code": ["base", "small"]
     },
     "invariants": [
       "Typography roles apply text styles only (font-family, font-size, font-weight, line-height, letter-spacing)",
       "No layout or spacing (use separate utilities)",
       "Context-neutral API: works within any [data-eui-context]",
       "Values resolve to nearest [data-eui-context] scope",
       "Semantic layer (contexts/app/semantics/typography/) is source of truth",
       "Multi-context safe: can have nested contexts with independent baselines"
     ],
     "scoping": {
       "mechanism": "CSS custom properties scoped to [data-eui-context]",
       "inheritance": "Typography roles inherit from nearest context",
       "baseline": "Each context can define scoped baseline (e.g. [data-eui-context='app'] { font-size: 0.875rem; })"
     }
   }
   ```

2. Реорганизовать CSS:
   - Создать: `/src/ui/foundation/typography/typography.structure.css` (селекторы + var())
   - Создать: `/src/ui/foundation/typography/typography.index.css` (entry point)
   - Генерировать: `/generated/css/foundation/typography.tokens.css` (автогенерация переменных)
   - Сохранить старый: `/src/ui/typography.css` (для обратной совместимости, deprecated)

3. Обновить импорты:
   - В main CSS добавить импорт из foundation/
   - Оставить старый импорт с комментарием @deprecated

4. Обновить генерацию:
   - Настроить Style Dictionary для foundation/typography
   - Генерировать в generated/css/foundation/

### Приоритет 2: Очистка токенов (1-2 часа)

**Задача:** Очистить deprecated файлы

**Шаги:**
1. Удалить deprecated файлы:
   - `/tokens/contexts/app/semantics/typography/headings.json`
   - `/tokens/contexts/app/semantics/typography/titles.json`
   - `/tokens/contexts/app/semantics/typography/body.json`
   - `/tokens/contexts/app/semantics/typography/labels.json`

2. Убедиться, что `text-styles.json` единственный источник истины:
   - Проверить все импорты в Style Dictionary конфигурации
   - Убедиться, что генерация использует только text-styles.json
   - Пересобрать токены: `npm run build:tokens`

3. Обновить документацию:
   - Отметить text-styles.json как single source of truth
   - Добавить комментарий в schema о deprecated файлах

### Приоритет 3: Документация (2-3 часа)

**Задача:** Обновить документацию

**Файлы для обновления:**
1. `/docs/adr/ADR-0018-typography-units-architecture-rem-em-px.md`:
   - **Добавить раздел "Multi-Context Considerations"**:
     - Объяснить почему PX→REM миграция заблокирована
     - Описать scoped baseline стратегию
     - Варианты решения (PX vs REM + scoped)
   - Обновить статус на "Partially Implemented, Multi-Context Strategy Pending"

2. `/docs/architecture/ARCH-foundation-001-typography-roles.md` (создать):
   - Typography как Foundation/Roles слой, не UI компонент
   - Отличие от component паттерна (Badge)
   - Context-neutral API
   - Scoping mechanism
   - Invariants

3. `/docs/architecture/ARCH-components-001-component-css-architecture.md`:
   - Добавить раздел "Foundation vs Components"
   - Typography как пример foundation roles
   - Когда что использовать

4. `/docs/guides/typography-usage-guide.md` (создать):
   - Когда использовать какой role
   - Примеры для компонентов
   - Mapping из TYPOGRAPHY_TEXT_STYLE_MAPPING.md
   - Multi-context примеры

## Что можно делать прямо сейчас (безопасно)

### ✅ Разрешенные операции (read-only + safe refactoring):

1. **Аудит иерархии tokens** (primitives → raw → semantics):
   - Проверить ссылки между слоями
   - Проверить на циклические зависимости
   - Проверить на self-alias

2. **Аудит CSS на literals**:
   - Проверить, что нет hardcoded PX/colors/oklch
   - Проверить, что все значения через var()
   - Проверить, что нет layout/spacing

3. **Создать foundation contract**:
   - Задокументировать roles API
   - Задокументировать scoping mechanism
   - Задокументировать invariants
   - НЕ требует изменения кода, только документация

4. **Разделить structure vs tokens** (миграционно):
   - Создать новую структуру foundation/
   - Сохранить старый файл с @deprecated
   - Обновить импорты постепенно
   - Обратно совместимо

5. **Очистить deprecated файлы**:
   - Удалить headings.json, titles.json, body.json, labels.json
   - Убедиться, что text-styles.json единственный источник
   - Низкий риск (файлы уже deprecated)

## Что НЕЛЬЗЯ делать (риск поломок)

### ❌ Запрещенные операции:

1. **PX→REM миграция по базе 14px**:
   - Сломает multi-context архитектуру
   - Вложенные контексты масштабируются неправильно
   - Website/report начнут масштабироваться вместе с app

2. **Изменение root html font-size**:
   - Затронет ВСЕ контексты одновременно
   - Сломает независимость контекстов
   - Нарушит scoped baseline механизм

3. **Глобальные typography правила**:
   - Любые правила без [data-eui-context] scope
   - Правила на :root/html/body
   - Затронут все контексты

4. **Превращение Typography в компонент**:
   - Создание components/typography.tokens.json
   - Component axes/variants по паттерну Badge
   - Концептуально неправильно (foundation, не component)

## Верификация

После проведения аудита проверить:

1. ✅ **Отчет о проблемах создан**:
   - Все найденные проблемы задокументированы
   - Указаны приоритеты (критические, средние)
   - Приведены примеры кода

2. ✅ **Рекомендации даны**:
   - Пошаговые инструкции для каждого исправления
   - Оценка времени
   - Риски и митигация

3. ✅ **Критические файлы идентифицированы**:
   - Список файлов с путями
   - Что нужно изменить в каждом

4. ✅ **Сравнение с Badge проведено**:
   - Показаны различия в архитектуре
   - Объяснено, почему различия существуют
   - Рекомендован подход (Hybrid)

## Критические файлы

### Для проверки (Аудит)
1. `/Users/eugenegoncharov/Projects/envy-ui-v2/tokens/primitives/typography.json` - **PX → REM проблема**
2. `/Users/eugenegoncharov/Projects/envy-ui-v2/tokens/contexts/app/raw/typography.json` - иерархия
3. `/Users/eugenegoncharov/Projects/envy-ui-v2/tokens/contexts/app/semantics/typography/text-styles.json` - семантика
4. `/Users/eugenegoncharov/Projects/envy-ui-v2/src/ui/typography.css` - CSS структура
5. `/Users/eugenegoncharov/Projects/envy-ui-v2/generated/css/` - генерация (проверить наличие)

### Ожидаемые отсутствующие файлы (foundation, НЕ components)
1. `/Users/eugenegoncharov/Projects/envy-ui-v2/tokens/foundation/typography.contract.json` - **отсутствует** (нужно создать)
2. `/Users/eugenegoncharov/Projects/envy-ui-v2/src/ui/foundation/typography/typography.structure.css` - **отсутствует** (нужно создать)
3. `/Users/eugenegoncharov/Projects/envy-ui-v2/src/ui/foundation/typography/typography.index.css` - **отсутствует** (нужно создать)
4. `/Users/eugenegoncharov/Projects/envy-ui-v2/generated/css/foundation/typography.tokens.css` - **отсутствует** (генерация)

**НЕ создавать (концептуально неправильно):**
- ❌ `tokens/components/typography.contract.json` - Typography не компонент
- ❌ `tokens/components/typography.tokens.json` - Typography не компонент
- ❌ `src/ui/components/typography/*` - Typography не компонент

### Эталонные файлы (Badge)
1. `/Users/eugenegoncharov/Projects/envy-ui-v2/tokens/components/badge.tokens.json`
2. `/Users/eugenegoncharov/Projects/envy-ui-v2/tokens/components/badge.contract.json`
3. `/Users/eugenegoncharov/Projects/envy-ui-v2/src/ui/components/badge/badge.structure.css`

### Документация
1. `/Users/eugenegoncharov/Projects/envy-ui-v2/docs/adr/ADR-0018-typography-units-architecture-rem-em-px.md`
2. `/Users/eugenegoncharov/Projects/envy-ui-v2/docs/architecture/ARCH-components-001-component-css-architecture.md`
3. `/Users/eugenegoncharov/Projects/envy-ui-v2/docs/dirty/TYPOGRAPHY_TEXT_STYLE_MAPPING.md`

## Временная оценка

### Только аудит (текущая задача): 2 часа
- Проверка всех файлов: 1.5 часа
- Написание отчета: 0.5 часа

### Безопасные исправления (можно делать сейчас): 7-11 часов
- Foundation структура (контракт + файлы): 4-6 часов
- Очистка deprecated токенов: 1-2 часа
- Документация: 2-3 часа

### Заблокированные исправления (требуют ADR): неизвестно
- ADR-0018 multi-context стратегия: требует архитектурного решения
- PX→REM миграция (если решат): 2-4 часа после утверждения стратегии
- Тестирование после миграции: 4-8 часов

**Итого (безопасная часть)**: 7-11 часов

## Выводы

Typography система в целом хорошо организована, но требует уточнения архитектуры для multi-context окружения.

### ✅ Что работает хорошо:
- CSS правильно использует var() без literals
- Semantic токены хорошо структурированы
- Typography правильно размещена в semantics (не в components)

### ⚠️ Что требует решения:
1. **ADR-0018 стратегия для multi-context** (ЗАБЛОКИРОВАНО):
   - PX в primitives может быть валидным (контекст-независимость)
   - Или нужна стратегия REM + scoped baseline
   - Требуется архитектурное решение перед миграцией

2. **Foundation структура** (МОЖНО ДЕЛАТЬ):
   - Создать foundation contract
   - Реорганизовать файлы в foundation/
   - Разделить structure/tokens

3. **Очистка deprecated** (МОЖНО ДЕЛАТЬ):
   - Удалить старые файлы typography roles
   - text-styles.json как единственный источник

### 🚫 Что НЕЛЬЗЯ делать:
- PX→REM по базе 14px (app context) - сломает multi-context
- Превращать Typography в UI компонент - концептуально неправильно
- Глобальные правила без [data-eui-context] scope

### Рекомендуемый подход:
1. **Сейчас**: Провести аудит, создать foundation contract, реорганизовать файлы
2. **Позже**: Решить ADR-0018 multi-context стратегию через отдельный ADR
3. **Затем**: Применить стратегию (PX или REM + scoped)
