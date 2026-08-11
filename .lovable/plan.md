# Implementation Plan - Enhancements for Repair Services Website

This plan details the implementation of animations for the "Work In Progress" section, adding full-size image viewing for project photos, implementing a detailed services popup, and adding prominent navigation buttons for repair types.

## User Review Required

> [!IMPORTANT]
> - The image carousel will feature a "full-screen" mode when an image is clicked, allowing users to browse high-resolution versions of the "Regisseur" project photos.
> - The services popup will maintain the dark, high-end aesthetic of the site, displaying all 13 service categories in a detailed grid.
> - The new repair type navigation buttons will be placed just above the "Work In Progress" section to provide clear entry points for Elite, New Building, and Secondary repair services.

## Proposed Changes

### 1. Work In Progress Enhancements
- **Animations:** Replace simple reveals with the `ProjectRow` style parallax and scale animations for individual images in the `RegisseurCarousel`.
- **Full-size View:** Implement a modal/overlay that opens when a carousel image is clicked, showing the image in high resolution with left/right navigation controls.
- **Scroll Improvements:** Add custom left/right navigation buttons for the desktop carousel to improve usability.

### 2. Services List Popup
- **UI Component:** Create a `DetailedServicesPopup` component using the existing Radix Dialog.
- **Trigger:** Add a "Show detailed list of works" (Показать подробный перечень работ) button at the bottom of the `Services` section.
- **Content:** The popup will display a structured grid of all services with icons and detailed descriptions, matching the site's design tokens.

### 3. Repair Type Navigation
- **New Component:** Create a `RepairTypeNav` component featuring three large, high-impact buttons for "Elite Repair", "New Building", and "Secondary Market".
- **Visuals:** Each button will use a background image related to its category, with clear text and a hover effect consistent with the `FeaturedWork` rows.
- **Placement:** Insert this section immediately before the `WorkInProgress` section in `src/routes/index.tsx`.

## Technical Details

### Frontend Changes
- **`src/routes/index.tsx`:**
    - Update `WorkInProgress` and `RegisseurCarousel` components.
    - Add `RepairTypeNav` component.
    - Update `Services` component to include the dialog trigger.
    - Implement a `FullscreenGallery` component.
- **`src/lib/i18n.tsx`:**
    - Add translations for "Show detailed list", "Close", and repair type labels.
- **`src/components/ui/dialog.tsx`:**
    - Ensure styling is consistent with the dark theme (already verified).

### Dependencies
- `framer-motion` for animations (already present).
- `lucide-react` for icons (already present).
- `radix-ui/react-dialog` (already present).

## Verification Plan

### Manual Verification
- Check "Work In Progress" carousel animations on scroll (should match portfolio rows).
- Verify clicking carousel images opens the full-screen gallery.
- Test navigation within the full-screen gallery.
- Verify the "Show detailed list" button opens the popup with all services.
- Test the new repair type navigation buttons for correct routing to `/elite`, `/newbuilding`, and `/secondary`.
- Check mobile responsiveness for the new sections.
