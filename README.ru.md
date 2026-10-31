# Kira Studio 2.0 — усиленный набор навыков Roblox для Claude Code

**21 скилл-команда, 82 справочника, 6 сценариев, 3 экспертных агента, 5 примеров Luau.** Один плагин для программирования, красивого GUI и эффектов, сетевого кода, безопасности, DataStore, NPC и выпуска игр.

Kira Studio создан с учётом сильных сторон [ro-engineer](https://github.com/excaldev/ro-engineer) и [roblox-brain](https://github.com/AkitoDevs/roblox-brain), но это самостоятельная переработка и дополнение; **не буквальное объединение 100% файлов двух исходников**. Оригинальные MIT-уведомления: [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).

## Установка из GitHub

Создайте репозиторий `kira-studio`. Распакуйте ZIP и загрузите **содержимое архива в корень репозитория**. Скрытые файлы `.claude-plugin` и `.mcp.json` обязательны.

В Claude Code:

```text
/plugin marketplace add Demosand/Kira-Studio
/plugin install kira-studio@kira-studio
```

После публикации и установки перезапустите Claude Code. Node.js 18+ нужен только для встроенного локального поиска (не нужен npm install). Плагин не отправляет заметки автору и не подключается к внешним API.

Для обновления:

```text
/plugin marketplace update kira-studio
/plugin update kira-studio@kira-studio
```

## Главные команды

```text
/kira-studio:ui Сделай премиальный GUI инвентаря с анимациями и адаптивностью
/kira-studio:ui-motion Добавь красивые анимации кнопок и переходов
/kira-studio:gui-audit Оцени и улучши мой интерфейс
/kira-studio:vfx Сделай красивый VFX для ударов мечом
/kira-studio:combat Реализуй безопасную стрельбу с компенсацией пинга
/kira-studio:build Напиши эту игровую механику на Luau
/kira-studio:optimize Найди и исправь лаги
/kira-studio:security Проверь RemoteEvents на эксплойты
/kira-studio:npc Сделай NPC с нормальным ИИ и pathfinding
/kira-studio:data Улучши DataStore и сохранение
/kira-studio:studio Проверь и исправь открытый проект Roblox Studio
```

`studio` работает с живым Roblox Studio **только если дополнительно установлен совместимый Studio MCP**. Без него Claude сможет писать код с точным указанием мест расположения, но не сможет проверить его запуск автоматически.

## Преимущества версии 2.0

- **GUI сильно улучшен:** дизайн-системы, адаптивная вёрстка, микровзаимодействия, многошаговые анимации, инвентари, магазины, HUD, gamepad, touch, локализация и чек-лист визуального качества.
- **VFX улучшен:** направленные эффекты, лучи/трейлы, камеры, звук, уровни качества, безопасная очистка.
- **Инженерия улучшена:** Strict Luau, rollback, lag compensation, защита RemoteEvents, миграции сохранений, работа с большим количеством NPC, профилирование.
- **Экономия контекста:** поиск по разделу и чтение по частям. Скиллы вызываются вручную, когда нужны.
- **Проверяемость:** `npm test`, `npm run check`, `npm run benchmark`. Тесты поиска не доказывают, что Kira Studio уже превосходит оригиналы при генерации игры.

Подробнее в [английском README](README.md), [каталоге знаний](reference-index.md) и [проверках](docs/verification.md).
