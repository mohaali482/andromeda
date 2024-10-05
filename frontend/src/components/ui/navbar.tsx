import { NavLink as Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Sheet, SheetTrigger, SheetContent, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import MenuIcon from "../icons/menu-icon"
import Icon from "@/assets/images/icon.png"
import { ModeToggle } from "../mode-toggle"
import { useState } from "react"

export default function NavBar() {
    return (
        <header className="sticky top-0 z-10 flex h-16 w-full items-center justify-between px-4 backdrop-filter backdrop-blur-lg bg-background/30 md:px-6 mb-2">
            <MobileSidebar />
            <Link to="/" className="hidden lg:flex lg:items-center">
                <img
                    src={Icon}
                    className="object-cover"
                    alt="Andromeda logo"
                    width={24}
                    height={24}
                />
                <span className="font-bold ml-2 text-primary-foreground dark:text-foreground">Andromeda</span>
            </Link>
            <div className="flex gap-2 items-center text-primary-foreground dark:text-foreground">
                <nav className="hidden lg:flex items-center space-x-6 mr-6">
                    <NavLink
                        to="/apod"
                    >
                        APOD
                    </NavLink>
                    <NavLink
                        to="/mars-rover-photos"
                    >
                        Mars Rover Photos
                    </NavLink>
                    <NavLink
                        to="/about"
                    >
                        About
                    </NavLink>
                </nav>
                <ModeToggle />
            </div>
        </header>
    )
}

function MobileSidebar() {
    const [open, setOpen] = useState(false)

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="bg-transparent lg:hidden">
                    <MenuIcon className="h-6 w-6" />
                    <span className="sr-only">Toggle navigation menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left">
                <SheetTitle>
                    <Link to="/" className="flex gap-2">
                        <img
                            src={Icon}
                            className="object-cover"
                            alt="Andromeda logo"
                            width={24}
                            height={24}
                        />
                        Andromeda
                    </Link>
                </SheetTitle>
                <SheetDescription />
                <div className="grid gap-4 py-6 pl-4">
                    <SheetNavLink
                        to="/apod"
                        setOpen={setOpen}
                    >
                        APOD
                    </SheetNavLink>
                    <SheetNavLink
                        to="/mars-rover-photos"
                        setOpen={setOpen}
                    >
                        Mars Rover Photos
                    </SheetNavLink>
                    <SheetNavLink
                        to="/about"
                        setOpen={setOpen}
                    >
                        About
                    </SheetNavLink>
                </div>
            </SheetContent>
        </Sheet>
    )
}

function NavLink({ to, children }: { to: string, children: React.ReactNode }) {
    return (
        <Link
            to={to}
            className="text-sm font-medium hover:text-primary transition"
        >
            {children}
        </Link>
    )
}

function SheetNavLink({ to, children, setOpen }: { to: string, children: React.ReactNode, setOpen: (open: boolean) => void }) {
    return (
        <Link
            to={to}
            onClick={() => setOpen(false)}
            className={({ isActive }) => "flex items-center text-lg font-medium transition rounded-sm px-2 py-1"
                + (isActive ? " bg-gray-400 dark:bg-gray-900" : " hover:bg-gray-400/15 hover:text-primary")
            }
        >
            {children}
        </Link>
    )
}
