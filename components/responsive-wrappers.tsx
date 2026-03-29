import React from "react";
import { cn } from "@/lib/utils";

/**
 * PageContainer - Standardized responsive padding for page content
 * Mobile: p-4, Tablet: p-6, Desktop: p-24
 */
export function PageContainer({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("min-h-[calc(100vh-7.1rem)] sm:min-h-[calc(100vh-5.6rem)] p-4 sm:p-6", className)}>
      {children}
    </div>
  );
}

/**
 * SectionHeading - Responsive heading with consistent scaling
 * Mobile: text-xl, Tablet: text-3xl, Desktop: text-4xl
 */
export function SectionHeading({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={cn(
        "font-mono font-bold text-xl sm:text-3xl lg:text-4xl",
        className
      )}
    >
      {children}
    </h2>
  );
}

/**
 * PageHeading - Large hero-style heading
 * Mobile: text-3xl, Tablet: text-5xl, Desktop: text-7xl
 */
export function PageHeading({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h1
      className={cn(
        "text-3xl sm:text-5xl lg:text-7xl font-black tracking-tighter text-foreground text-balance",
        className
      )}
    >
      {children}
    </h1>
  );
}

/**
 * ResponsiveGrid - Grid wrapper with consistent responsive behavior
 * Mobile: 1 column, Tablet: 2 columns, Desktop: customizable
 */
export function ResponsiveGrid({
  children,
  cols = 3,
  className,
}: {
  children: React.ReactNode;
  cols?: 2 | 3 | 4;
  className?: string;
}) {
  const colsClass = {
    2: "md:grid-cols-2",
    3: "md:grid-cols-3",
    4: "md:grid-cols-4",
  }[cols];

  return (
    <div
      className={cn(
        "grid grid-cols-1",
        colsClass,
        "gap-4 sm:gap-6",
        className
      )}
    >
      {children}
    </div>
  );
}

/**
 * FlexContainer - Flex wrapper for responsive layouts
 * Common: row on desktop, column on mobile
 */
export function FlexContainer({
  children,
  direction = "row",
  className,
}: {
  children: React.ReactNode;
  direction?: "row" | "col";
  className?: string;
}) {
  const dirClass = direction === "row" ? "lg:flex-row" : "lg:flex-col";

  return (
    <div
      className={cn(
        "flex flex-col",
        dirClass,
        "gap-6",
        className
      )}
    >
      {children}
    </div>
  );
}

/**
 * SectionSpacing - Consistent vertical spacing between sections
 * Mobile: py-4, Tablet: py-6, Desktop: py-12
 */
export function SectionSpacing({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("py-4 sm:py-6", className)}>
      {children}
    </section>
  );
}

/**
 * ResponsiveText - Responsive text sizing
 * Mobile: base / sm, Tablet: lg, Desktop: xl
 */
export function ResponsiveText({
  children,
  size = "base",
  className,
}: {
  children: React.ReactNode;
  size?: "sm" | "base" | "lg" | "xl";
  className?: string;
}) {
  const sizeClass = {
    sm: "text-sm sm:text-base lg:text-lg",
    base: "text-base sm:text-lg lg:text-xl",
    lg: "text-lg sm:text-xl lg:text-2xl",
    xl: "text-xl sm:text-2xl lg:text-3xl",
  }[size];

  return <p className={cn(sizeClass, className)}>{children}</p>;
}
