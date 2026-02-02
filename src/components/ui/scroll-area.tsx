const ScrollArea = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <ScrollAreaPrimitive.Root 
    ref={ref} 
    className={cn("relative overflow-hidden", className)} 
    {...props}
  >
    {/* The magic is here: 
      1. h-full w-full makes it fit.
      2. overflow-y-scroll forces it to behave.
      3. The custom classes for webkit/firefox hide the bar.
    */}
    <ScrollAreaPrimitive.Viewport 
      className="h-full w-full rounded-[inherit] !overflow-y-scroll"
      style={{ 
        scrollbarWidth: 'none', 
        msOverflowStyle: 'none',
        WebkitOverflowScrolling: 'touch' 
      }}
    >
      {children}
    </ScrollAreaPrimitive.Viewport>
    
    {/* We strictly do not render <ScrollBar /> here */}
    
    <ScrollAreaPrimitive.Corner />
  </ScrollAreaPrimitive.Root>
));

export { ScrollArea, ScrollBar };
