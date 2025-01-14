import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { navbar } from "@/data/navbar";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Import usePathname hook

export function AppSidebar() {
  const pathname = usePathname(); // Get the current path

  return (
    <Sidebar className="md:hidden bg-customBg text-customPrimary">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navbar.map((item) => {
                const isActive = pathname === item.url; // Check if the current path matches the item's URL

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link
                        href={item.url}
                        className={`${
                          isActive
                            ? "text-customSecondary underline underline-offset-4 decoration-customSecondary decoration-2"
                            : "text-customPrimary"
                        } hover:underline hover:underline-offset-4 hover:decoration-customSecondary hover:decoration-2 active:underline active:underline-offset-4 active:decoration-customSecondary active:decoration-2`}
                      >
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
