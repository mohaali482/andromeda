import { BriefcaseBusiness, Github, Linkedin } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-background/95 text-foreground p-4 text-center">
            <div className="flex justify-center pt-8">
                <a href="https://mohammedali.vercel.app/" className="mx-2 size-10"><BriefcaseBusiness size={35} /></a>
                <a href="https://www.linkedin.com/in/mohammed-ali-fenta/" className="mx-2"><Linkedin size={35} /></a>
                <a href="https://github.com/mohaali482" className="mx-2"><Github size={35} /></a>
            </div>
            <p>From Mohammed Ali to the world.</p>
        </footer>
    )
}