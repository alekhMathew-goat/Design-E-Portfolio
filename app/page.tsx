import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

import Hero from "@/components/hero"
import QuickAccess from "@/components/quickAccess"
import GrantAccess from "@/components/grantAccess"

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
    
      <Header />

<Hero/>
<QuickAccess/>
<GrantAccess/> 
<Footer />
    </div>
  )
}
