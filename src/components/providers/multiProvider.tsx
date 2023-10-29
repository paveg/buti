import { TooltipProvider } from "~/ui/tooltip"

export const MultiProvider = ({ children }: { children: React.ReactNode }) => {
  return <TooltipProvider>
    {children}
  </TooltipProvider>
}
