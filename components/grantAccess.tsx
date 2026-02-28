import { Card, CardContent } from "@/components/ui/card"
import { MessageCircle, Heart, Shield } from "lucide-react"
export default function GrantAccess() {
  return (
    <div className="mx-8 mb-8 mt-4 rounded-lg overflow-hidden  ">
               <div className="container mx-auto ">
                 <h2 className="text-3xl font-bold text-text mb-12 text-center">Why Gran-assist?</h2>
                 <div className="grid md:grid-cols-3 gap-8">
                   <Card className="border-2 border-border hover:border-[#50966d] transition-colors">
                     <CardContent className="pt-8 pb-8 text-center">
                       <div className="w-16 h-16 bg-[#50966d] rounded-full flex items-center justify-center mx-auto mb-4">
                         <MessageCircle className="w-8 h-8 text-white" />
                       </div>
                       <h3 className="text-xl font-semibold text-[#dd673c] mb-3">Simple to Use</h3>
                       <p className="text-muted-text leading-relaxed">Large buttons, clear options, no complicated forms. Designed with accessibility in mind.</p>
                     </CardContent>
                   </Card>
       
                   <Card className="border-2 border-border hover:border-[#50966d] transition-colors">
                     <CardContent className="pt-8 pb-8 text-center">
                       <div className="w-16 h-16 bg-[#50966d] rounded-full flex items-center justify-center mx-auto mb-4">
                         <Heart className="w-8 h-8 text-white" />
                       </div>
                       <h3 className="text-xl text-[#dd673c] font-semibold t mb-3">Community Driven</h3>
                       <p className="text-muted-text leading-relaxed">Connect with caring helpers ready to assist with daily tasks and check-ins.</p>
                     </CardContent>
                   </Card>
       
                   <Card className="border-2 border-border hover:border-[#50966d] transition-colors">
                     <CardContent className="pt-8 pb-8 text-center">
                       <div className="w-16 h-16 bg-[#50966d] rounded-full flex items-center justify-center mx-auto mb-4">
                         <Shield className="w-8 h-8 text-white" />
                       </div>
                       <h3 className="text-xl font-semibold text-[#dd673c] mb-3">Safety-First</h3>
                       <p className="text-muted-text leading-relaxed">Clear guidance and emergency reminders. Help when you need it, built with care.</p>
                     </CardContent>
                   </Card>
                 </div>
               </div>
   
    </div>
  )
}
