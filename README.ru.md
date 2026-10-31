# Kira Studio — установка и возможности

**Объединённый набор скиллов для Claude Code и Roblox Studio.** В нём есть архитектура и оптимизация Luau, серверная безопасность, DataStore, дизайн интерфейсов, VFX, освещение, анимации, NPC, экономика и тестирование.

Вдохновлён [ro-engineer](https://github.com/excaldev/ro-engineer) и [roblox-brain](https://github.com/AkitoDevs/roblox-brain), но это самостоятельно переработанная подборка, **не полная буквальная копия** двух баз знаний. Оригинальные лицензии: [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).

## Установка после загрузки на GitHub

В Claude Code:

```text
/plugin marketplace add ВАШ_НИК/kira-studio
/plugin install kira-studio@kira-studio
```

Замените `ВАШ_НИК` на логин GitHub. Важно: файлы `.claude-plugin/marketplace.json`, `.claude-plugin/plugin.json`, `.mcp.json` должны лежать в нужных местах, а не быть потеряны при загрузке.

## Команды

- `/kira-studio:kira-studio` — универсальный режим.
- `/kira-studio:build` — написание/исправление игровых систем.
- `/kira-studio:ui` — продвинутые интерфейсы.
- `/kira-studio:vfx` — эффекты, анимация, камера, звук.
- `/kira-studio:review` — аудит ошибок и эксплойтов.
- `/kira-studio:optimize` — лаги, FPS, сеть, профилирование.
- `/kira-studio:plan` — архитектура новой механики.

Все данные локальны. **Никаких анонимных отправок уроков автору**, как у оригинального `roblox-brain`. Требуется Node.js 18+ для локального MCP-поиска; установка npm-пакетов не нужна. Без MCP-бриджа Roblox Studio плагин сам игру редактировать не сможет — нужны соответствующие Studio MCP-инструменты.

Перед публикацией запустите `npm test` и, если доступна команда Claude, `claude plugin validate .`.
