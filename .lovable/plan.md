# Plan - UI Reorganization and Content Update

Reorganize main page sections, implement an image carousel for "Work in Progress", and update the "Services" section with new content based on provided images.

## User-facing changes

- **Section Reordering**: The "Projects in Work" section will now appear before "Completed Projects".
- **Interactive Carousel**: The "Projects in Work" section will feature a swipeable/scrollable gallery for the "Regisseur" residential complex project, allowing users to view multiple photos with smooth animations.
- **Updated Services**: The "Services" section will be expanded to include all services shown in the uploaded images:
  - Demolition (Демонтаж)
  - Design (Проектирование)
  - Procurement (Закупка материала)
  - Installation (Монтаж)
  - Commissioning (Пуско-наладочные работы)
  - Waste Removal & Cleaning (Вывоз мусора и клининг)
  - Electrical work (Электрика)
  - Plumbing & Heating (Сантехника и отопление)
  - Low-voltage systems (Слаботочка)
  - Smart Home (Умный дом)
- **Visual Polish**: Animations for project images will be consistent across sections.

## Technical details

- **Route Adjustments**: Swapping `WorkInProgress` and `FeaturedWork` components in `src/routes/index.tsx`.
- **Carousel Implementation**: 
  - Enhance `WorkInProgress` with a `RegisseurCarousel` component.
  - Use `framer-motion` for horizontal scrolling and reveal animations (consistent with `ProjectRow`).
- **I18n Update**: Add new service keys and descriptions to `src/lib/i18n.tsx`.
- **Component Refactoring**: Update `Services` and `ServiceRow` to handle the expanded list of services efficiently.
- **Asset Integration**: Use all images from `src/lib/regisseur-assets.ts` in the new carousel.
