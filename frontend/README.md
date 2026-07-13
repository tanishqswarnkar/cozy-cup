# Cozy Cup

A React + Vite + Tailwind starter for a coffee roastery/café site.

## Setup

```bash
npm install
npm run dev
```

Opens at http://localhost:5173

## Structure

```
src/
  components/
    Nav.jsx        - top navigation
    Hero.jsx        - headline + interactive roast dial
    RoastDial.jsx    - draggable slider, the signature interactive element
    ShopGrid.jsx     - coffee lot cards, pulls from a data array
    CoffeeCard.jsx   - single product card
    Visit.jsx        - café hours + map placeholder
    Footer.jsx
  App.jsx
  main.jsx
  index.css
tailwind.config.js  - brand colors/fonts as design tokens
```

## Design tokens

Colors and fonts live in `tailwind.config.js` under `theme.extend` — change them
there and every component picks it up.

| Token | Value |
|---|---|
| `ink` | `#201B15` |
| `ecru` | `#E8E2D3` |
| `moss` | `#4B5D3A` |
| `gold` | `#C79A3C` |
| `font-display` | Fraunces |
| `font-sans` | Inter |
| `font-mono` | JetBrains Mono |

## Next steps

- Swap the shop `lots` array in `ShopGrid.jsx` for real product/CMS data
- Wire the "Cart" button up to actual cart state
- Add a product detail page and routing (react-router)
