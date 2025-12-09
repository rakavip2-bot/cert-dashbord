import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { Shield, Lock } from "lucide-react";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <header className="h-16 border-b border-border/40 bg-background/95 backdrop-blur-xl sticky top-0 z-20 flex items-center justify-between px-6 shadow-sm support-backdrop-blur:bg-background/60">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="hover:bg-primary/10 transition-colors" />
              <div className="flex flex-col">
                <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent flex items-center gap-3 filter drop-shadow-sm">
                  <Shield className="h-8 w-8 fill-primary/20 text-primary" />
                  ADMIN DASHBOARD
                </h1>
                <span className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-medium pl-9">Secure Command Center</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
            </div>
          </header>
          <main className="flex-1 p-6">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
