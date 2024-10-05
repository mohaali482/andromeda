import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Sheet, SheetTrigger, SheetContent, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import MenuIcon from "../icons/menu-icon"
import Icon from "@/assets/images/icon.png"
import { ModeToggle } from "../mode-toggle"

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
                    <Link
                        to="/apod"
                        className="text-sm font-medium hover:text-primary transition"
                    >
                        APOD
                    </Link>
                    <Link
                        to="/mars-rover-photos"
                        className="text-sm font-medium hover:text-primary transition"
                    >
                        Mars Rover Photos
                    </Link>
                    <Link
                        to="/about"
                        className="text-sm font-medium hover:text-primary transition"
                    >
                        About
                    </Link>
                </nav>
                <ModeToggle />
            </div>
        </header>
    )
}

function MobileSidebar() {
    return (
        <Sheet>
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
                <div className="grid gap-4 py-6">
                    <Link
                        to="/apod"
                        className="flex items-center text-sm font-medium hover:text-primary transition"
                    >
                        APOD
                    </Link>
                    <Link
                        to="/mars-rover-photos"
                        className="flex items-center text-sm font-medium hover:text-primary transition"
                    >
                        Mars Rover Photos
                    </Link>
                    <Link
                        to="/about"
                        className="flex items-center text-sm font-medium hover:text-primary transition"
                    >
                        About
                    </Link>
                </div>
            </SheetContent>
        </Sheet>
    )
}
