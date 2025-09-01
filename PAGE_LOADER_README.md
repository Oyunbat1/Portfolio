# PageLoader Implementation Guide

This guide explains how to use the dynamic PageLoader system for page transitions in your portfolio.

## How It Works

The PageLoader system consists of three main components:

1. **PageLoader** - The actual loading animation component
2. **PageTransitionWrapper** - Wrapper that handles automatic page transitions
3. **usePageLoader** - Custom hook for manual control

## Automatic Page Transitions

The PageLoader is automatically triggered when navigating between pages. It's configured in your `layout.tsx`:

```tsx
<PageTransitionWrapper>
  {children}
</PageTransitionWrapper>
```

### Important Notes

- **Initial load**: The loader won't show on the initial page load (only the Preloader shows)
- **Page transitions**: Shows when navigating between ALL pages including Home, About, Contact, Work
- **Preloader**: Only shows on the very first visit to the site

## Manual Control

If you need manual control over the PageLoader, you can use the `usePageLoader` hook:

```tsx
import { usePageLoader } from '../hooks/usePageLoader';
import { AnimatePresence } from 'framer-motion';
import PageLoader from './components/PageLoader';

const YourComponent = () => {
  const { isLoading, showLoader, hideLoader, triggerLoader } = usePageLoader();

  const handleSomeAction = () => {
    showLoader();
    // Do something
    setTimeout(() => {
      hideLoader();
    }, 2000);
  };

  const handleQuickTransition = () => {
    triggerLoader(1500); // Shows loader for 1.5 seconds
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <PageLoader onComplete={hideLoader} />}
      </AnimatePresence>
      
      {/* Your component content */}
    </>
  );
};
```

## PageLoader Features

The PageLoader automatically:
- Shows the current page name (Home, About, Contact, Work)
- Adapts colors based on the page (black background with white text for About, white background with black text for others)
- Handles responsive design
- Provides smooth animations
- Properly handles animation completion

### Customization

You can customize the PageLoader by modifying the `PageLoader.tsx` component:

- Change animation duration in the `curve` object
- Modify the page name display logic
- Adjust colors for different pages
- Change the loading indicator style

## Best Practices

1. **Use automatic transitions** for most cases - they work seamlessly
2. **Use manual control** only when you need custom loading logic
3. **Don't modify the home page** - it has its own Preloader
4. **Test on different screen sizes** as the loader is responsive

## Troubleshooting

### Loader not showing:
- Check that you're navigating between different pages
- Verify the PageTransitionWrapper is properly configured in layout.tsx
- Ensure you're not on the initial page load

### Black screen issues:
- The loader properly calls `onComplete` when animation finishes
- Check that your page content is loading properly
- Verify no conflicts with existing animations

### Animation issues:
- Check that framer-motion is properly installed
- Verify the animation variants are correctly defined
- Ensure the component is wrapped in AnimatePresence
