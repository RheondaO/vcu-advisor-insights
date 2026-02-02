# Hiding Scrollbars in Iframes and Modals

## The Problem
When your app is running inside an **iframe** or has content in **modals**, regular CSS won't work because:
- **Iframes** are separate documents with their own DOM
- **Modals** are often dynamically created and may load after your CSS
- **Cross-origin iframes** can't be accessed due to browser security

## Solutions

### 🔧 Solution 1: Automatic (Recommended)

**1. Add the utility file:**
Save `hideScrollbars.ts` to `src/utils/hideScrollbars.ts`

**2. Update your App.tsx:**
```typescript
import { useEffect } from "react";
import { initScrollbarHiding } from "@/utils/hideScrollbars";

const App = () => {
  useEffect(() => {
    const cleanup = initScrollbarHiding();
    return cleanup;
  }, []);

  // ... rest of your app
};
```

This automatically hides scrollbars in:
- All current and future iframes
- All modals/dialogs
- The main document

### 🎯 Solution 2: React Hooks (For Specific Components)

**1. Add the hooks file:**
Save `useHideScrollbars.ts` to `src/hooks/useHideScrollbars.ts`

**2. Use in your components:**

#### For Iframes:
```typescript
import { useIframeScrollbarHiding } from "@/hooks/useHideScrollbars";

function MyComponent() {
  const iframeRef = useIframeScrollbarHiding();
  
  return (
    <iframe 
      ref={iframeRef}
      src="https://example.com"
    />
  );
}
```

#### For Modals:
```typescript
import { useModalScrollbarHiding } from "@/hooks/useHideScrollbars";

function MyComponent() {
  useModalScrollbarHiding(); // Just call it once
  
  return (
    <Dialog>
      <DialogContent>
        {/* Your modal content */}
      </DialogContent>
    </Dialog>
  );
}
```

#### For Any Scrollable Element:
```typescript
import { useHideScrollbars } from "@/hooks/useHideScrollbars";

function MyComponent() {
  const scrollRef = useHideScrollbars<HTMLDivElement>();
  
  return (
    <div ref={scrollRef} className="overflow-auto h-64">
      {/* Scrollable content */}
    </div>
  );
}
```

### 🌐 Solution 3: For Your Entire App in an Iframe

If your **entire dashboard app** is inside an iframe on another site:

**1. Update index.html:**
Replace your `index.html` with the provided version that has inline styles.

**2. Add to the parent page** (the page containing the iframe):
```html
<iframe id="myDashboard" src="your-dashboard-url">
</iframe>

<script>
  const iframe = document.getElementById('myDashboard');
  iframe.style.overflow = 'hidden';
  
  iframe.addEventListener('load', function() {
    try {
      // Try to access iframe content (same-origin only)
      const iframeDoc = iframe.contentDocument;
      const style = iframeDoc.createElement('style');
      style.textContent = `
        * { scrollbar-width: none !important; }
        *::-webkit-scrollbar { display: none !important; }
      `;
      iframeDoc.head.appendChild(style);
    } catch(e) {
      console.log('Cross-origin iframe - styles applied to iframe container only');
    }
  });
</script>
```

### 📊 Solution 4: For Your Specific StudentTable

Update `src/components/dashboard/StudentTable.tsx`:

```typescript
import { useHideScrollbars } from "@/hooks/useHideScrollbars";

export function StudentTable({ students, showContact, showAcademic }: StudentTableProps) {
  const tableScrollRef = useHideScrollbars<HTMLDivElement>();
  
  // ... rest of component
  
  return (
    <div className="glass-card p-6">
      <h3 className="text-lg font-semibold text-primary mb-4">Flagged Student List</h3>
      <div ref={tableScrollRef} className="overflow-auto max-h-96">
        <Table>
          {/* Your table content */}
        </Table>
      </div>
    </div>
  );
}
```

## 🔍 Debugging

If scrollbars still appear:

1. **Check if it's a cross-origin iframe:**
   - Open browser DevTools Console
   - Look for errors mentioning "cross-origin" or "blocked by CORS"
   - Cross-origin iframes can only hide the iframe's own scrollbar, not internal ones

2. **Check if the modal is using a different component:**
   - Search for `role="dialog"` or `role="alertdialog"` in DevTools
   - Make sure `useModalScrollbarHiding()` is called in a component that renders before the modal

3. **Force reload:**
   - Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
   - Clear cache and reload

4. **Verify the hooks are running:**
   - Add console.logs in the utility files
   - Check they're being called

## 🎯 Quick Setup Checklist

- [ ] Copy `hideScrollbars.ts` to `src/utils/`
- [ ] Copy `useHideScrollbars.ts` to `src/hooks/`
- [ ] Update `App.tsx` to call `initScrollbarHiding()`
- [ ] Replace `index.html` with the new version
- [ ] Update `tailwind.config.ts` with the plugin
- [ ] Hard refresh your browser (Ctrl+Shift+R)

## 💡 Pro Tips

- **For same-origin iframes:** All solutions work perfectly
- **For cross-origin iframes:** Only the iframe container scrollbar can be hidden
- **For modals:** Use `useModalScrollbarHiding()` in your layout/app component
- **For tables:** Use `useHideScrollbars()` on the scrollable div wrapper
