import { Header } from "../Organisms/Header"
export const MainLayout = ({ children }: any) => {
    return (
        <>
            <Header />
            <main>{children}</main>
        </>
    )
}