# Fuse Studio 2.3.1 — Roblox-скиллы для Codex, Claude Code и Google Antigravity

**23 скилл-команды, 85 справочников, 6 сценариев, 3 экспертных агента, 5 примеров Luau.** Один плагин для программирования, красивого GUI и эффектов, сетевого кода, безопасности, DataStore, NPC и выпуска игр.

Fuse Studio создан с учётом сильных сторон [ro-engineer](https://github.com/excaldev/ro-engineer) и [roblox-brain](https://github.com/AkitoDevs/roblox-brain), но это самостоятельная переработка и дополнение; **не буквальное объединение 100% файлов двух исходников**. Оригинальные MIT-уведомления: [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).

## Установка в OpenAI Codex

### Установка в приложении Codex без CLI (Windows)

**CLI устанавливать не нужно.** Скачай [ZIP с Fuse Studio](https://github.com/Demosand/Fuse-Studio/archive/refs/heads/main.zip), распакуй и запусти двойным кликом `scripts/install-codex-app.cmd`. Установщик сохранит другие плагины в персональном маркетплейсе и сделает резервную копию конфигурации. Перезапусти Codex, открой **Plugins / Каталог плагинов** → **Personal Plugins** (или свой текущий персональный маркетплейс) → **Fuse Studio** → **Install**.

Он не требует Git или Codex CLI. Для работы локального MCP-поиска понадобится Node.js 18+. Подробности: [docs/codex.md](docs/codex.md).


Fuse Studio 2.3 поддерживает **Codex CLI и совместимые приложения Codex** как полноценный плагин: 23 скилла, Stud UI, вся локальная база знаний и MCP.

**Если установлен Codex CLI**, можно использовать команды:

```powershell
codex plugin marketplace add Demosand/Fuse-Studio
codex plugin add fuse-studio@fuse-studio
codex plugin list
```

После установки открой Codex или перезапусти его. В диалоге используй `/skills` или упомяни `$fuse-studio`, `$stud-ui`, `$ui`, `$combat`, `$vfx` — модель также может сама выбрать подходящий навык. Node.js 18+ необходим только для встроенного локального MCP-поиска.

**Не нужно вручную копировать 23 папки навыков.** Для обновления: `codex plugin marketplace upgrade fuse-studio`. Полная инструкция: [docs/codex.md](docs/codex.md).

## Установка в Google Antigravity

**Теперь Fuse Studio — нативный плагин Antigravity:** 23 скилла, 3 агента и локальный MCP-поиск знаний.

**Если установлен Antigravity CLI (`agy`):**

```powershell
agy plugin install https://github.com/Demosand/Fuse-Studio
agy plugin list
```

**Для приложения Antigravity на Windows без CLI**, открой PowerShell (нужен Git) и выполни:

```powershell
New-Item -ItemType Directory -Force "$HOME\.gemini\config\plugins" | Out-Null; git clone https://github.com/Demosand/Fuse-Studio.git "$HOME\.gemini\config\plugins\fuse-studio"
```

После установки зайди в **Customizations → Installed**. Для обновления папки: `git -C "$HOME\.gemini\config\plugins\fuse-studio" pull --ff-only`. Команды в Antigravity: `/fuse-studio`, `/ui`, `/stud-ui`, `/combat`, `/vfx` и другие — **без префикса** `fuse-studio:`. Для поиска по базе нужен Node.js 18+, сами скиллы работают и без него.

Подробная инструкция: **[docs/antigravity.md](docs/antigravity.md)**. Claude Code продолжает работать как раньше. Codex подключается отдельно.

## Установка в Claude Code

Плагин уже опубликован в GitHub. Для установки Claude Code используй команды ниже.

В Claude Code:

```text
/plugin marketplace add Demosand/Fuse-Studio
/plugin install fuse-studio@fuse-studio
```

После публикации и установки перезапустите Claude Code. Node.js 18+ нужен только для встроенного локального поиска (не нужен npm install). Плагин не отправляет заметки автору и не подключается к внешним API.

Для обновления:

```text
/plugin marketplace update fuse-studio
/plugin update fuse-studio@fuse-studio
```

## Главные команды

```text
/fuse-studio:ui Сделай премиальный GUI инвентаря с анимациями и адаптивностью
/fuse-studio:ui-motion Добавь красивые анимации кнопок и переходов
/fuse-studio:gui-audit Оцени и улучши мой интерфейс
/fuse-studio:vfx Сделай красивый VFX для ударов мечом
/fuse-studio:combat Реализуй безопасную стрельбу с компенсацией пинга
/fuse-studio:build Напиши эту игровую механику на Luau
/fuse-studio:optimize Найди и исправь лаги
/fuse-studio:security Проверь RemoteEvents на эксплойты
/fuse-studio:npc Сделай NPC с нормальным ИИ и pathfinding
/fuse-studio:data Улучши DataStore и сохранение
/fuse-studio:studio Проверь и исправь открытый проект Roblox Studio
```

`studio` работает с живым Roblox Studio **только если дополнительно установлен совместимый Studio MCP**. Без него Claude сможет писать код с точным указанием мест расположения, но не сможет проверить его запуск автоматически.

## Преимущества версии 2.0

- **GUI сильно улучшен:** дизайн-системы, адаптивная вёрстка, микровзаимодействия, многошаговые анимации, инвентари, магазины, HUD, gamepad, touch, локализация и чек-лист визуального качества.
- **VFX улучшен:** направленные эффекты, лучи/трейлы, камеры, звук, уровни качества, безопасная очистка.
- **Инженерия улучшена:** Strict Luau, rollback, lag compensation, защита RemoteEvents, миграции сохранений, работа с большим количеством NPC, профилирование.
- **Экономия контекста:** поиск по разделу и чтение по частям. Скиллы вызываются вручную, когда нужны.
- **Проверяемость:** `npm test`, `npm run check`, `npm run benchmark`. Тесты поиска не доказывают, что Fuse Studio уже превосходит оригиналы при генерации игры.

Подробнее в [английском README](README.md), [каталоге знаний](reference-index.md) и [проверках](docs/verification.md).

## Stud UI и выбор дизайна (2.1)

Для нового GUI без выбранного стиля Fuse Studio спросит **один раз**: Stud, Premium Simulator, Modern Minimal, Glass, Sci-Fi, Tactical HUD, Retro Pixel, Cartoon, Fantasy или свой референс. Если стиль уже выбран или GUI только исправляется, дополнительных вопросов нет.

`/fuse-studio:ui-styles` — выбрать стиль. `/fuse-studio:stud-ui` — сразу Stud. `/fuse-studio:ui` — UI по выбранному стилю.

Включён полноценный MIT-код [Stud UI Clean Roblox](https://github.com/TemporaryLooker22/Stud-UI-Clean-Roblox): StudUI, StudMotion, CheckUIIcons (1022 иконки), справочники и 6 примеров. См. `vendor/stud-ui` и `docs/stud-ui-integration.md`.

**Официальный репозиторий:** [Demosand/Fuse-Studio](https://github.com/Demosand/Fuse-Studio). Для установки используй `/plugin marketplace add Demosand/Fuse-Studio`, затем `/plugin install fuse-studio@fuse-studio`.
