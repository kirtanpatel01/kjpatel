import { cn } from "@/lib/utils";

export default function Panel({ className, ...props }: React.ComponentProps<"section">) {
  return (
    <section
      className={cn(
        "screen-line-before screen-line-after border-x border-slate-300",
        className
      )}
      {...props}
    />
  );
}