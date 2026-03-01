# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # dev-сервер (Vite, http://localhost:5173)
npm run build    # збірка в dist/
npm run preview  # локальний перегляд збірки
```

Немає лінтера та тестів.

## Architecture

Одна сторінка-лендінг для готелю Red Cube (Кам'янець-Подільський). React 19 + Vite 6, без роутера, без CSS-фреймворку.

### Стилізація

Виключно inline-стилі через JS-об'єкти. **Єдине джерело кольорів** — `src/constants/colors.js` (експортується як `C`). Ніякого Tailwind, CSS-модулів чи CSS-in-JS — єдиний виняток `Footer.module.css` для компонента `Footer`.

Глобальні keyframe-анімації (`pulse`, `glowPulse`, `floatUp`, `cornerPulse`) та media-queries оголошені в `<style>` тезі всередині `App.jsx`.

### Скрол-контейнер

Скрол — не `window`, а `<div id="rc-scroll">` в `App.jsx`. Усі компоненти, що слухають скрол або вимірюють позиції (наприклад, `Nav`, `ConnectorLines`), читають `document.getElementById("rc-scroll")` або отримують `scrollContainerRef` через props.

### Секції та анімація появи

Секції: `Hero → Stats → About → Rooms → Dining → Amenities → Gallery → Reviews → Contacts → Footer`.

Хук `useInView` (`src/hooks/useInView.js`) — одноразовий `IntersectionObserver` відносно `#rc-scroll`. Компонент `Slide` обгортає контент і робить fade+translateY при в'їзді у viewport:

```jsx
const [ref, inView] = useInView(0.1);
<section ref={ref}>
  <Slide inView={inView} delay={0.1}>…</Slide>
</section>
```

### ConnectorLines

`ConnectorLines` (`src/components/ui/ConnectorLines.jsx`) — глобальний шар поверх усього контенту (`position:absolute`, `zIndex:10`, `pointerEvents:none`). Малює анімовані червоні лінії між секціями: вертикальна вниз від `boxRef` + горизонтальна вправо до краю екрану.

Конфігурується в `App.jsx` через масив `pairs`:
- `sectionRef` / `boxRef` — секція та її головний блок контенту
- `nextHeadingRef` — `<h2>` наступної секції (куди веде вертикальна лінія)
- `vDelay` / `hDelay` — затримки анімації в секундах
- `tailTriggerRef` — якщо задано, тригер анімації спрацьовує коли цей елемент входить у viewport (замість `boxRef`; використовується для довгих секцій типу Rooms)

### UI-примітиви (`src/components/ui/`)

- `NeonBorder` — анімована рамка, що "малюється" по периметру (4 сторони послідовно). Props: `active`, `delay`, `color`, `glow`.
- `HeroBorder` — аналог `NeonBorder` зі специфічною логікою: ліва лінія стартує знизу вгору.
- `Slide` — fade+translateY анімація появи.
- `Label` — мітка секції `"01 / Назва"`, monospace.
- `CornerAccents` — пульсуючі кутові акценти.
- `Particles` — 35 плаваючих червоних крапок у Hero.
- `ScrollTopBtn` — кнопка повернення вгору.
- `HotelMap` — вбудована карта.

### Hero-анімація

Фазова (`phase` 0→4), запускається через `setTimeout` при монтуванні. Кожна фаза вмикає наступний елемент (`Label` → заголовок → підзаголовок → кнопка → `HeroBorder`).

### Хуки (`src/hooks/`)

- `useInView(threshold)` — одноразовий `IntersectionObserver` відносно `#rc-scroll`.
- `useConnectorTails(sectionRef, boxRef, nextHeadingRef)` — вимірює позиції для ліній-конекторів (застарілий, використовувався до `ConnectorLines`).
- `useTextScramble()` — ефект глітч-скрамблу тексту.

### Контент

Тексти, дані кімнат і ціни захардкоджені прямо в компонентах. Немає CMS чи зовнішніх API. Зображення — `.webp` файли в `src/images/`.
