import NavBar from "@/components/ui/navbar";
import { Outlet } from "react-router-dom";

export default function Layout() {
    return (
        <div>
            <header>
                <NavBar />
            </header>
            <main className="px-8">
                <Outlet />
            </main>
        </div>
    )
}