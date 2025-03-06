# Creating and Customizing Components with shadcn/ui

This README provides guidelines for adding and customizing components in our Next.js application using shadcn/ui. Our project uses Tailwind CSS for styling and follows a consistent design system with custom colors and typography.

## Table of Contents

- [Setup](#setup)
- [Adding a New shadcn Component](#adding-a-new-shadcn-component)
- [Customizing Components](#customizing-components)
- [Best Practices](#best-practices)
- [Example: Custom Button Component](#example-custom-button-component)

## Setup

Our project uses the following key technologies:

- Next.js 15.2+
- React 19+
- Tailwind CSS 4
- shadcn/ui components
- class-variance-authority (CVA) for component variants
- clsx for conditional class merging

Make sure your development environment is properly set up with these dependencies.

## Adding a New shadcn Component

1. **Install the component** using the shadcn CLI:

   ```bash
   npx shadcn-ui@latest add [component-name]
   ```

   For example:

   ```bash
   npx shadcn-ui@latest add button
   ```

2. **Find the component** in your project directory, typically at:

   ```
   src/components/ui/[component-name].tsx
   ```

3. **Understand the component** by reviewing its structure, props, and styling.

## Customizing Components

To customize a shadcn component to match our design system:

1. **Create a custom component file** in the appropriate directory:

   ```
   src/components/[component-name].tsx
   ```

2. **Import the base shadcn component** and other necessary utilities:

   ```typescript
   'use client'

   import { cva, type VariantProps } from 'class-variance-authority'
   import { clsx } from 'clsx'
   import { ComponentProps, forwardRef } from 'react'
   // Import the base shadcn component if needed
   ```

3. **Define variants with CVA** using our design system's colors and styles:

   ```typescript
   const componentVariants = cva(
     'base-classes-here',
     {
       variants: {
         // Define your variants
       },
       defaultVariants: {
         // Set default variants
       }
     }
   )
   ```

4. **Create a typed props interface** extending the base component props:

   ```typescript
   export interface CustomComponentProps
     extends ComponentProps<typeof BaseComponent>,
       VariantProps<typeof componentVariants> {
     // Add any additional props
   }
   ```

5. **Implement the component** using `forwardRef` for proper ref handling:

   ```typescript
   const CustomComponent = forwardRef<HTMLElement, CustomComponentProps>(
     ({ className, ...props }, ref) => {
       return (
         <BaseComponent
           className={clsx(componentVariants({ className }))}
           ref={ref}
           {...props}
         />
       )
     }
   )

   CustomComponent.displayName = 'CustomComponent'

   export { CustomComponent }
   ```

## Best Practices

1. **Follow the project's design system** - Use our color variables and typography classes defined in `globals.css` and `typography.css`.

2. **Maintain accessibility** - Ensure your components work with keyboard navigation and screen readers.

3. **Properly type your components** - Use TypeScript interfaces and type declarations.

4. **Add display names** - Always add a display name to your components for better debugging.

5. **Use client directive** - Add `'use client'` at the top of components using client-side features.

6. **Dynamic imports** - Use Next.js dynamic imports for components with browser-only dependencies.

7. **Document your components** - Add comments explaining complex patterns or decisions.

## Example

You can see example inside components/ui/[component].tsx

## Adding Your Own Components

When adding new components:

1. Consider if you need a base shadcn component first
2. Use our design tokens for colors and spacing
3. Follow the pattern shown in the Button example
4. Test your component for accessibility
5. Document any complex behavior or API

Happy component building!

## Working with SVG Icons from Figma

### Importing Icons from Figma

To import SVG icons from [Muslim101 V.2 – Figma](https://www.figma.com/design/JZr3kM0lQfm9OEfSQiyLpd/Muslim101-V.2?node-id=359-3398&p=f&t=5ZnXJcTEd6sL28Ta-0):

1. **Select the icon in Figma** you want to use in your component
2. **Right-click and select "Copy as SVG"** or use the export panel to download it
3. **Create a new React component** using the SVG code

For example, after copying an SVG from Figma, create a component like this:

```typescript
// src/components/icons/CheckboxIcon.tsx
import { cn } from '@/lib/utils'
import { IconProps } from '@/types/IconProps'
import React from 'react'

export const CheckboxIcon: React.FC<IconProps> = ({
  className = '',
  size,
  ...props
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 6 5"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('stroke-current', className)}
      {...props}
    >
      <path
        d="M0.833659 3.83332L1.40008 4.25814C1.82877 4.57966 2.43471 4.50611 2.77404 4.09138L5.16699 1.16666"
        stroke="white"
        strokeLinecap="round"
      />
    </svg>
  )
}
```

### Organizing Icons

For better organization:

1. **Create a dedicated directory** for your icons:

   ```
   src/components/icons/
   ```

2. **Create an icon props interface** in a common types file:

   ```typescript
   // src/types/IconProps.ts
   export interface IconProps extends React.SVGProps<SVGSVGElement> {
     size?: number
     className?: string
   }
   ```

3. **Create an index file** to simplify imports:

   ```typescript
   // src/components/icons/index.ts
   export * from './CheckboxIcon'
   // Export other icons here
   ```

### Using Icons in Components

Import and use your icons in components:

```typescript
import { CheckboxIcon } from '@/components/icons'

const MyComponent = () => {
  return (
    <div>
      <CheckboxIcon size={16} className="text-primary-500" />
    </div>
  )
}
```

### Best Practices for SVG Icons

1. **Use the `stroke-current` or `fill-current` classes** to allow color inheritance from parent elements
2. **Keep the viewBox attribute** from the original SVG
3. **Remove unnecessary attributes** like width, height, and colors that you want to control via props
4. **Use the cn utility** for class name merging
5. **Provide sensible defaults** for size and other props

### Alternative: Using Lucide Icons

Our project also has Lucide icons available. To use them:

```typescript
import { Check } from 'lucide-react'

const MyComponent = () => {
  return <Check className="h-4 w-4 text-primary-500" />
}
```
