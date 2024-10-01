import Footer from "@/components/footer";
import NavBar from "@/components/ui/navbar";
import { Outlet } from "react-router-dom";

export default function Layout() {
    return (
        <div className="min-h-[calc(100dvh)] bg-repeat-y"
            style={{
                backgroundImage: 'url(/images/background.jpg)',
                backgroundColor: "#2F1E23"
            }}>
            <NavBar />
            <main className="px-4 h-full lg:px-16">
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}