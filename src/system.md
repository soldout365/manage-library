# Project Structure - Library Management System (Frontend)

## 📁 Complete Project Folder Tree

```
manage-library/
├── .git/
├── .vscode/
│   ├── extensions.json
│   └── settings.json
├── node_modules/
├── public/
├── src/
│   ├── App.css
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   ├── routes.tsx
│   ├── system.md
│   ├── vite-env.d.ts
│   ├── apis/
│   │   ├── auth.api.ts
│   │   ├── author.api.ts
│   │   ├── book-category.api.ts
│   │   ├── book.api.ts
│   │   ├── image.api.ts
│   │   ├── loaction.api.ts
│   │   ├── publisher.api.ts
│   │   ├── reader-type.api.ts
│   │   ├── reader.api.ts
│   │   └── user.api.ts
│   ├── assets/
│   ├── components/
│   │   ├── book-cover.tsx
│   │   ├── page-header.tsx
│   │   ├── pagination-wrapper.tsx
│   │   ├── PrivateRouter.tsx
│   │   ├── PublicRouter.tsx
│   │   ├── search-bar.tsx
│   │   └── ui/
│   │       ├── alert-dialog.tsx
│   │       ├── avatar.tsx
│   │       ├── badge.tsx
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── collapsible.tsx
│   │       ├── combobox.tsx
│   │       ├── command.tsx
│   │       ├── dialog.tsx
│   │       ├── dropdown-menu.tsx
│   │       ├── form.tsx
│   │       ├── input.tsx
│   │       ├── label.tsx
│   │       ├── pagination.tsx
│   │       ├── popover.tsx
│   │       ├── scroll-area.tsx
│   │       ├── select.tsx
│   │       ├── separator.tsx
│   │       ├── sheet.tsx
│   │       ├── sidebar.tsx
│   │       ├── skeleton.tsx
│   │       ├── sonner.tsx
│   │       ├── table.tsx
│   │       ├── tabs.tsx
│   │       ├── textarea.tsx
│   │       └── tooltip.tsx
│   ├── configs/
│   │   └── instance.ts
│   ├── contexts/
│   │   └── auth-context.context.tsx
│   ├── hooks/
│   │   ├── use-mobile.ts
│   │   ├── useDebounce.ts
│   │   ├── useQueryParam.ts
│   │   ├── useSearch.ts
│   │   ├── auth/
│   │   │   ├── useChangePassword.tsx
│   │   │   ├── useForgotPassword.tsx
│   │   │   ├── useLogin.tsx
│   │   │   └── useResetPassword.tsx
│   │   ├── authors/
│   │   │   ├── useCreateAuthor.ts
│   │   │   ├── useDeleteAuthorById.ts
│   │   │   ├── useGetAuthors.ts
│   │   │   ├── useSearchAuthor.ts
│   │   │   └── useUpdateAuthorById.ts
│   │   ├── book-categories/
│   │   │   ├── useCreateLocation.ts
│   │   │   ├── useDeleteLocation.ts
│   │   │   ├── useGetBookCategories.ts
│   │   │   ├── useSearchBookCategory.ts
│   │   │   └── useUpdateLocation.ts
│   │   ├── books/
│   │   │   └── useGetBooks.ts
│   │   ├── locations/
│   │   │   ├── useCreateLocation.ts
│   │   │   ├── useDeleteLocation.ts
│   │   │   ├── useGetLocations.ts
│   │   │   ├── useSearchLocation.ts
│   │   │   └── useUpdateLocation.ts
│   │   ├── publishers/
│   │   │   ├── useCreatePublisher.ts
│   │   │   ├── useDeletePublisher.ts
│   │   │   ├── useGetPublishers.ts
│   │   │   └── useUpdatePublisher.ts
│   │   ├── reader-types/
│   │   ├── readers/
│   │   ├── uploads/
│   │   └── users/
│   ├── layouts/
│   │   ├── root-layout.tsx
│   │   ├── components/
│   │   └── data/
│   ├── lib/
│   │   ├── utils.ts
│   │   └── validate.ts
│   ├── pages/
│   │   ├── (managements)/
│   │   │   ├── authors/
│   │   │   │   └── page.tsx
│   │   │   ├── book-categories/
│   │   │   │   └── page.tsx
│   │   │   ├── books/
│   │   │   │   ├── create/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── update/
│   │   │   │   │   └── [id]/
│   │   │   │   │       └── page.tsx
│   │   │   │   └── page.tsx
│   │   │   ├── locations/
│   │   │   │   └── page.tsx
│   │   │   ├── publishers/
│   │   │   │   └── page.tsx
│   │   │   ├── reader-types/
│   │   │   │   └── page.tsx
│   │   │   └── readers/
│   │   │       ├── create/
│   │   │       │   └── page.tsx
│   │   │       ├── update/
│   │   │       │   └── [id]/
│   │   │       │       └── page.tsx
│   │   │       └── page.tsx
│   │   ├── authentication/
│   │   │   ├── change-password/
│   │   │   │   └── page.tsx
│   │   │   ├── forgot-password/
│   │   │   │   └── page.tsx
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   └── reset-password/
│   │   │       └── page.tsx
│   │   ├── books/
│   │   │   ├── [id]/
│   │   │   │   └── page.tsx
│   │   │   └── page.tsx
│   │   ├── home/
│   │   │   └── page.tsx
│   │   ├── providers/
│   │   │   └── page.tsx
│   │   └── reader-types/
│   │       └── page.tsx
│   ├── stores/
│   │   ├── auth.store.ts
│   │   └── book-store.ts
│   ├── types/
│   │   ├── auth.type.ts
│   │   ├── author.type.ts
│   │   ├── book-category.type.ts
│   │   ├── book.type.ts
│   │   ├── common.type.ts
│   │   ├── image.type.ts
│   │   ├── layout.type.ts
│   │   ├── location.type.ts
│   │   ├── publisher.type.ts
│   │   ├── reader-types.type.ts
│   │   ├── reader.type.ts
│   │   └── user.type.ts
│   └── utils/
│       ├── format-date.ts
│       └── getReaderTypeDisplayName.ts
├── .env
├── .env.example
├── .eslintrc.cjs
├── .gitignore
├── .prettierrc
├── components.json
├── index.html
├── package-lock.json
├── package.json
├── postcss.config.js
├── README.md
├── tailwind.config.js
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

---

## 📂 Folder & File Descriptions

### Root Level Files

#### `App.tsx`

Main application component that sets up the root structure, routing, and global providers.

- **Purpose**: Root React component
- **Contents**: Application-wide configuration and layout setup

#### `App.css`

Global styles for the main App component.

- **Purpose**: Application-level CSS styles
- **Contents**: Global styling rules, CSS variables, theme configurations

#### `main.tsx`

Application entry point that renders the React application to the DOM.

- **Purpose**: Bootstrap the React app
- **Contents**: ReactDOM.render() call, imports for global styles

#### `index.css`

Global stylesheet imported into the application.

- **Purpose**: Base styles and CSS resets
- **Contents**: Global CSS rules, typography, base element styles

#### `routes.tsx`

Route configuration and navigation setup for the application.

- **Purpose**: Define all application routes
- **Contents**: React Router configuration with route paths and components

#### `vite-env.d.ts`

TypeScript declarations for Vite environment variables and types.

- **Purpose**: Type definitions for Vite
- **Contents**: Vite client types and module declarations

#### `system.md`

This file - documentation of the project structure.

- **Purpose**: Architecture documentation
- **Contents**: Complete folder hierarchy with descriptions

---

## 📁 Main Folders

### `apis/`

Contains all API client functions for communicating with the backend server.

- **Purpose**: Centralize HTTP requests and API endpoint calls
- **Contents**: API functions using Axios/Fetch for different resources

**Files:**

- `auth.api.ts` - Authentication API calls (login, register, logout)
- `author.api.ts` - Author management API endpoints
- `book-category.api.ts` - Book category API operations
- `book.api.ts` - Book-related API requests (CRUD operations)
- `image.api.ts` - Image upload and management API
- `loaction.api.ts` - Location/library branch API calls
- `publisher.api.ts` - Publisher management endpoints
- `reader-type.api.ts` - Reader type classification API
- `reader.api.ts` - Library reader/member API operations
- `user.api.ts` - User management API requests

---

### `assets/`

Static assets such as images, icons, fonts, and other media files.

- **Purpose**: Store static resources used across the application
- **Contents**: Images, SVG icons, fonts, and media files

---

### `components/`

Reusable React components organized by functionality and UI elements.

- **Purpose**: Modular, reusable UI components
- **Contents**: React functional components with TypeScript

**Root Component Files:**

- `book-cover.tsx` - Book cover image display component
- `page-header.tsx` - Page header component with title and breadcrumbs
- `pagination-wrapper.tsx` - Pagination control wrapper component
- `PrivateRouter.tsx` - Protected route component for authenticated users
- `PublicRouter.tsx` - Public route component for unauthenticated access
- `search-bar.tsx` - Global search bar component

#### `components/ui/`

UI component library - reusable primitive components (likely from shadcn/ui).

- **Purpose**: Base UI building blocks
- **Contents**: Pre-built UI components with consistent styling

**UI Components:**

- `alert-dialog.tsx` - Alert dialog/modal component
- `avatar.tsx` - User avatar display component
- `badge.tsx` - Badge/label component
- `button.tsx` - Reusable button component with variants
- `card.tsx` - Card container component
- `collapsible.tsx` - Collapsible/accordion component
- `combobox.tsx` - Searchable select component
- `command.tsx` - Command palette/menu component
- `dialog.tsx` - Modal dialog component
- `dropdown-menu.tsx` - Dropdown menu component
- `form.tsx` - Form wrapper and field components
- `input.tsx` - Text input field component
- `label.tsx` - Form label component
- `pagination.tsx` - Pagination navigation component
- `popover.tsx` - Popover/tooltip positioning component
- `scroll-area.tsx` - Custom scrollable area component
- `select.tsx` - Select dropdown component
- `separator.tsx` - Visual separator/divider component
- `sheet.tsx` - Side sheet/drawer component
- `sidebar.tsx` - Sidebar navigation component
- `skeleton.tsx` - Loading skeleton placeholder component
- `sonner.tsx` - Toast notification component
- `table.tsx` - Data table component
- `tabs.tsx` - Tab navigation component
- `textarea.tsx` - Multi-line text input component
- `tooltip.tsx` - Tooltip component

---

### `configs/`

Configuration files for application settings and API setup.

- **Purpose**: Centralize configuration values
- **Contents**: API base URLs, environment settings, app constants

**Files:**

- `instance.ts` - Axios instance configuration with interceptors and base URL

---

### `contexts/`

React Context providers for global state management.

- **Purpose**: Share state across components without prop drilling
- **Contents**: Context providers using React Context API

**Files:**

- `auth-context.context.tsx` - Authentication context providing user state and auth methods

---

### `hooks/`

Custom React hooks for data fetching, state management, and reusable logic.

- **Purpose**: Extract and reuse component logic
- **Contents**: Custom hooks following React hooks convention

**Root Hook Files:**

- `use-mobile.ts` - Hook for detecting mobile viewport
- `useDebounce.ts` - Debounce hook for delayed value updates
- `useQueryParam.ts` - Hook for managing URL query parameters
- `useSearch.ts` - Search functionality hook

#### `hooks/auth/`

Authentication-related custom hooks.

- `useChangePassword.tsx` - Hook for password change functionality
- `useForgotPassword.tsx` - Hook for forgot password flow
- `useLogin.tsx` - Hook for user login
- `useResetPassword.tsx` - Hook for password reset

#### `hooks/authors/`

Author management hooks.

- `useCreateAuthor.ts` - Hook for creating new authors
- `useDeleteAuthorById.ts` - Hook for deleting authors
- `useGetAuthors.ts` - Hook for fetching authors list
- `useSearchAuthor.ts` - Hook for searching authors
- `useUpdateAuthorById.ts` - Hook for updating author information

#### `hooks/book-categories/`

Book category management hooks.

- `useCreateLocation.ts` - Hook for creating book categories
- `useDeleteLocation.ts` - Hook for deleting book categories
- `useGetBookCategories.ts` - Hook for fetching book categories
- `useSearchBookCategory.ts` - Hook for searching categories
- `useUpdateLocation.ts` - Hook for updating book categories

#### `hooks/books/`

Book management hooks.

- `useGetBooks.ts` - Hook for fetching books list with filters

#### `hooks/locations/`

Location/library branch management hooks.

- `useCreateLocation.ts` - Hook for creating locations
- `useDeleteLocation.ts` - Hook for deleting locations
- `useGetLocations.ts` - Hook for fetching locations
- `useSearchLocation.ts` - Hook for searching locations
- `useUpdateLocation.ts` - Hook for updating location details

#### `hooks/publishers/`

Publisher management hooks.

- `useCreatePublisher.ts` - Hook for creating publishers
- `useDeletePublisher.ts` - Hook for deleting publishers
- `useGetPublishers.ts` - Hook for fetching publishers list
- `useUpdatePublisher.ts` - Hook for updating publisher information

#### `hooks/reader-types/`

Reader type classification hooks.

- **Purpose**: Manage different types of library readers/members

#### `hooks/readers/`

Library reader/member management hooks.

- **Purpose**: Handle reader registration and management

#### `hooks/uploads/`

File upload functionality hooks.

- **Purpose**: Handle file and image uploads

#### `hooks/users/`

User management hooks.

- **Purpose**: User account and profile management

---

### `layouts/`

Layout components that define the structure of pages.

- **Purpose**: Reusable page layouts and shells
- **Contents**: Layout wrappers, navigation structures

**Files:**

- `root-layout.tsx` - Main application layout wrapper

#### `layouts/components/`

Layout-specific components.

- **Purpose**: Components used within layouts (headers, sidebars)

#### `layouts/data/`

Layout configuration data.

- **Purpose**: Navigation menus, sidebar items configuration

---

### `lib/`

Library utilities and helper functions.

- **Purpose**: Shared utility functions and libraries
- **Contents**: Helper functions, third-party library wrappers

**Files:**

- `utils.ts` - General utility functions (classnames, formatting)
- `validate.ts` - Validation helper functions and schemas

---

### `pages/`

Page-level components representing different routes/views.

- **Purpose**: Route-level components that compose smaller components
- **Contents**: Full page views for each application route

#### `pages/(managements)/`

Management section pages (admin/staff functionality).

- **Purpose**: Administrative and management pages

#### `pages/authentication/`

Authentication pages.

- **Purpose**: Login, register, forgot password pages

#### `pages/books/`

Book-related pages.

- **Purpose**: Book catalog, details, and management pages

#### `pages/home/`

Home/landing page.

- **Purpose**: Main dashboard or home page

#### `pages/providers/`

Provider/vendor management pages.

- **Purpose**: Publisher and content provider pages

#### `pages/reader-types/`

Reader type management pages.

- **Purpose**: Manage different categories of library members

---

### `stores/`

State management stores (likely using Zustand or similar).

- **Purpose**: Global application state management
- **Contents**: Store definitions with state and actions

**Files:**

- `auth.store.ts` - Authentication state store (user, token, session)
- `book-store.ts` - Book-related state management

---

### `types/`

TypeScript type definitions and interfaces for the entire application.

- **Purpose**: Type safety and IntelliSense support
- **Contents**: Interface definitions, type aliases, enums

**Files:**

- `auth.type.ts` - Authentication-related types (User, Token, LoginRequest)
- `author.type.ts` - Author entity types and interfaces
- `book-category.type.ts` - Book category type definitions
- `book.type.ts` - Book entity types and interfaces
- `common.type.ts` - Shared/common types used across the app
- `image.type.ts` - Image and file upload types
- `layout.type.ts` - Layout configuration types
- `location.type.ts` - Location/branch types
- `publisher.type.ts` - Publisher entity types
- `reader-types.type.ts` - Reader classification types
- `reader.type.ts` - Library reader/member types
- `user.type.ts` - User entity types and interfaces

---

### `utils/`

Utility functions and helper methods.

- **Purpose**: Reusable utility functions
- **Contents**: Pure functions for formatting, calculations, transformations

**Files:**

- `format-date.ts` - Date formatting utility functions
- `getReaderTypeDisplayName.ts` - Helper to get readable reader type names

---

## 🎨 Frontend Architecture Overview

### Project Tech Stack

- **Framework**: React 18+ with TypeScript
- **Build Tool**: Vite
- **UI Components**: Custom components + shadcn/ui library
- **State Management**: Zustand stores + React Context
- **Routing**: React Router
- **API Client**: Axios (configured in configs/instance.ts)
- **Styling**: CSS Modules / Tailwind CSS

### Component Hierarchy

```
App.tsx
  ├── Root Layout
  │   ├── Sidebar Navigation
  │   ├── Page Header
  │   └── Main Content Area
  │       └── Pages (Routes)
  │           ├── Home
  │           ├── Books
  │           ├── Authentication
  │           └── Management Pages
  └── Context Providers
      └── AuthContext
```

### Data Flow Pattern

```
User Interaction
    ↓
Page Component
    ↓
Custom Hook (useGetBooks, useLogin, etc.)
    ↓
API Function (book.api.ts, auth.api.ts)
    ↓
Axios Instance (configs/instance.ts)
    ↓
Backend Server
    ↓
Response Data
    ↓
Store Update (Zustand) / State Update
    ↓
UI Re-render
```

### Folder Organization Pattern

The project follows a **feature-based organization** with clear separation:

1. **API Layer** (`apis/`) - Backend communication
2. **Data Layer** (`stores/`, `contexts/`) - State management
3. **Logic Layer** (`hooks/`) - Business logic and data fetching
4. **Presentation Layer** (`components/`, `pages/`) - UI components
5. **Type Layer** (`types/`) - TypeScript definitions
6. **Utility Layer** (`utils/`, `lib/`) - Helper functions

---

## 📝 Development Guidelines

### Naming Conventions

- **Components**: PascalCase (`BookCard.tsx`, `SearchBar.tsx`)
- **Hooks**: camelCase with `use` prefix (`useGetBooks.ts`, `useAuth.ts`)
- **API Files**: kebab-case with `.api.ts` suffix (`book.api.ts`)
- **Types**: kebab-case with `.type.ts` suffix (`book.type.ts`)
- **Utilities**: camelCase (`formatDate.ts`)

### File Organization Rules

- One component per file
- Keep components under 200 lines
- Group related hooks by feature
- Co-locate types with their feature when possible
- Use index.ts for barrel exports

### Import Conventions

```typescript
// External libraries
import React from 'react'
import { useQuery } from '@tanstack/react-query'

// Internal - absolute imports
import { Button } from '@/components/ui/button'
import { useAuth } from '@/hooks/auth/useLogin'
import { Book } from '@/types/book.type'

// Internal - relative imports for same feature
import { BookCard } from './book-card'
```

### TypeScript Best Practices

- Define interfaces for all props
- Use type inference where possible
- Avoid `any` - use `unknown` if needed
- Create types for API responses
- Use enums for fixed sets of values

### Component Structure Template

```typescript
// Imports
import React from 'react';
import { SomeType } from '@/types';

// Types/Interfaces
interface ComponentNameProps {
  prop1: string;
  prop2?: number;
}

// Component
export const ComponentName: React.FC<ComponentNameProps> = ({
  prop1,
  prop2
}) => {
  // Custom hooks
  const { data } = useSomeHook();

  // Local state
  const [state, setState] = React.useState();

  // Effects
  React.useEffect(() => {
    // Effect logic
  }, []);

  // Event handlers
  const handleClick = () => {
    // Handler logic
  };

  // Render
  return (
    <div>
      {/* JSX */}
    </div>
  );
};
```

---

## 🔄 Updating This Document

When adding new folders, files, or making structural changes:

1. Update the folder tree structure at the top
2. Add or modify descriptions in the appropriate section
3. Keep the hierarchy and indentation consistent
4. Include example file names where helpful
5. Update the "Last Updated" date below
6. Commit changes with a descriptive message

---

## 📌 Quick Reference

### Common Paths

- **Add new API**: `src/apis/[resource].api.ts`
- **Add new hook**: `src/hooks/[feature]/use[Action].ts`
- **Add new page**: `src/pages/[section]/[page-name].tsx`
- **Add new component**: `src/components/[component-name].tsx`
- **Add new type**: `src/types/[resource].type.ts`
- **Add new utility**: `src/utils/[util-name].ts`

### Key Files to Know

- `src/main.tsx` - Application entry point
- `src/App.tsx` - Root component with providers
- `src/routes.tsx` - All route definitions
- `src/configs/instance.ts` - Axios configuration
- `src/contexts/auth-context.context.tsx` - Authentication state
- `src/lib/utils.ts` - Common utility functions

---

_Last Updated: November 8, 2025_
_Project: Library Management System - Frontend (React + TypeScript + Vite)_
