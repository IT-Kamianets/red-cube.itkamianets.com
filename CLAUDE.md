# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # запустити dev-сервер (Vite, http://localhost:5173)
npm run build    # зібрати в dist/
npm run preview  # переглянути збірку локально
```

Немає лінтера та тестів.

## Architecture

Одна сторінка-лендінг для готелю Red Cube (Кам'янець-Подільський). React 19 + Vite 6, без роутера, без CSS-фреймворку.

### Ключові особливості

**Скрол-контейнер** — не `window`, а `<div id="rc-scroll">` в `App.jsx`. Усі компоненти, що слухають скрол (наприклад, `Nav`), читають `document.getElementById("rc-scroll")`.

**Стилізація** — виключно inline-стилі через JS-об'єкти. Єдине джерело кольорів — `src/constants/colors.js` (експортується як `C`). Глобальні keyframe-анімації (`pulse`, `glowPulse`, `floatUp`, `cornerPulse`) оголошені в `<style>` тезі всередині `App.jsx`.

**Анімація появи секцій** — хук `useInView` (одноразовий `IntersectionObserver`). Компонент `Slide` обгортає контент і плавно його з'являє при в'їзді у viewport. Патерн використання:

```jsx
const [ref, inView] = useInView(0.1);
// ...
<section ref={ref}>
  <Slide inView={inView} delay={0.1}>…</Slide>
</section>
```

**UI-примітиви** (`src/components/ui/`):
- `NeonBorder` — анімована червона рамка, що "малюється" по периметру (4 сторони послідовно). Приймає `active`, `delay`, `color`, `glow`.
- `HeroBorder` — аналог `NeonBorder`, але з особливою логікою старту лівої лінії знизу вгору (специфічно для hero-блоку).
- `Slide` — fade+translateY при появі у viewport.
- `Label` — мітка секції у форматі `"01 / Назва"`, monospace.
- `CornerAccents` — пульсуючі кутові акценти.
- `Particles` — 35 плаваючих червоних крапок у Hero.

**Контент** (тексти, дані кімнат, ціни) захардкоджений прямо в компонентах. Немає CMS чи зовнішніх API.

**Hero-анімація** — фазова (`phase` 0→4), запускається через `setTimeout` при монтуванні. Кожна фаза вмикає наступний елемент.
