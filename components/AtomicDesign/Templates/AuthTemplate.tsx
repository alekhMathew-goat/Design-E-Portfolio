import { Footer } from "@/components/footer"
import { Header } from "../Organisms/Header"

export const AuthTemplate = ({ children }: any) => {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 py-16 px-4">
                <div className="container mx-auto max-w-md">
                    {children}
                </div>
            </main>
            <Footer />
        </div>
    )
}
