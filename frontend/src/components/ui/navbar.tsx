import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Sheet, SheetTrigger, SheetContent, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import MenuIcon from "../icons/menu-icon"
import Icon from "@/assets/images/icon.png"
import { ModeToggle } from "../mode-toggle"

export default function NavBar() {
    return (
        <header className="sticky top-0 z-10 flex h-16 w-full items-center justify-between px-4 backdrop-filter backdrop-blur-lg bg-opacity-30 md:px-6">
            <MobileSidebar />
            <Link to="/" className="hidden lg:flex lg:items-center">
                <img
                    src={Icon}
                    className="object-cover"
                    alt="Andromeda logo"
                    width={24}
                    height={24}
                />
                <span className="font-bold ml-2">Andromeda</span>
            </Link>
            <nav className="hidden lg:flex items-center space-x-4">
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
                    to="/faq"
                    className="text-sm font-medium hover:text-primary transition"
                >
                    FAQ
                </Link>
            </nav>
            <ModeToggle />
        </header>
    )
}

function MobileSidebar() {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="lg:hidden">
                    <MenuIcon className="h-6 w-6" />
                    <span className="sr-only">Toggle navigation menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left">
                <SheetTitle className="flex gap-2">
                    <img
                        src={Icon}
                        className="object-cover"
                        alt="Andromeda logo"
                        width={24}
                        height={24}
                    />
                    Andromeda
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
                        to="/faq"
                        className="flex items-center text-sm font-medium hover:text-primary transition"
                    >
                        FAQ
                    </Link>
                </div>
            </SheetContent>
        </Sheet>
    )
}
