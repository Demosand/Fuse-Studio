# Fuse Studio 2.1 — усиленный набор навыков Roblox для Claude Code

**21 скилл-команда, 82 справочника, 6 сценариев, 3 экспертных агента, 5 примеров Luau.** Один плагин для программирования, красивого GUI и эффектов, сетевого кода, безопасности, DataStore, NPC и выпуска игр.

Fuse Studio создан с учётом сильных сторон [ro-engineer](https://github.com/excaldev/ro-engineer) и [roblox-brain](https://github.com/AkitoDevs/roblox-brain), но это самостоятельная переработка и дополнение; **не буквальное объединение 100% файлов двух исходников**. Оригинальные MIT-уведомления: [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).

## Установка из GitHub

Создайте репозиторий `fuse-studio`. Распакуйте ZIP и загрузите **содержимое архива в корень репозитория**. Скрытые файлы `.claude-plugin` и `.mcp.json` обязательны.

В Claude Code:

```text
/plugin marketplace add Demosand/Kira-Studio
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

**Имя GitHub-репозитория нужно отдельно переименовать** в Settings > General: `Kira-Studio` → `Fuse-Studio`. Пока не переименовал, добавляй marketplace по `Demosand/Kira-Studio`; сам плагин уже устанавливается через `/plugin install fuse-studio@fuse-studio`.
