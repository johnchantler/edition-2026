import { cn } from "@/lib/utils";

export const ColumnFull = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn("col-span-3 flex w-full flex-col gap-12", className)}
      {...props}
    />
  );
};
