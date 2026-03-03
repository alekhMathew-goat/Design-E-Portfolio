// "use client"

// import { useState } from "react"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Textarea } from "@/components/ui/textarea"
// import { LocationPicker } from "@/components/location-picker"
// import OnboardingTip from "../Atoms/OnboardingTip"
// import { RequestTypeSelector } from "../Molecules/RequestTypeSelector"
// import { PrioritySelector } from "../Molecules/PrioritySelector"
// import { PreferredTimeSelector } from "../Molecules/PreferredTimeSelector"
// import { FormLabel } from "../Atoms/FormLabel"

// interface Props {
//     user: any
//     seenTip: boolean
//     markSeenTip: () => void
//     saveRequest: (request: any) => void
// }

// export const NewRequestForm = ({ user, seenTip, markSeenTip, saveRequest }: Props) => {
//     const [selectedType, setSelectedType] = useState("")
//     const [priority, setPriority] = useState("")
//     const [preferredTime, setPreferredTime] = useState("")
//     const [notes, setNotes] = useState("")
//     const [location, setLocation] = useState<{ address: string; lat: number; lng: number } | null>(null)

//     const handleSubmit = () => {
//         if (!user || !location || !priority || !selectedType || !preferredTime) return

//         const requestTypeLabels: Record<string, string> = {
//             talk: "Someone to talk to",
//             hospital: "Hospital assistance",
//             groceries: "Groceries help",
//             checkin: "Check-in visit",
//         }

//         const newRequest = {
//             id: `req_${Date.now()}`,
//             userId: user.id,
//             userName: user.profile.name,
//             userPhone: user.profile.phone,
//             type: selectedType,
//             title: requestTypeLabels[selectedType] || selectedType,
//             description: notes || "No additional notes",
//             priority: priority as "low" | "medium" | "high" | "urgent",
//             location,
//             date: new Date().toLocaleDateString(),
//             time: preferredTime,
//             status: "open" as const,
//             createdAt: new Date().toISOString(),
//         }

//         saveRequest(newRequest)
//     }

//     return (
//         <div className="container mx-auto max-w-3xl">
//             {!seenTip && (
//                 <OnboardingTip
//                     title="Posting a request — quick tips"
//                     description="Choose a clear priority, add your location, and a short note. Helpers see higher-priority requests first."
//                     onClose={markSeenTip}
//                 />
//             )}

//             <Card className="border-2 border-border">
//                 <CardHeader>
//                     <CardTitle className="text-2xl md:text-3xl text-center">What do you need help with today?</CardTitle>
//                 </CardHeader>
//                 <CardContent className="space-y-8">
//                     <RequestTypeSelector selectedType={selectedType} onSelect={setSelectedType} />
//                     <LocationPicker onLocationSelect={setLocation} />
//                     <PrioritySelector value={priority} onChange={setPriority} />
//                     <PreferredTimeSelector value={preferredTime} onChange={setPreferredTime} />

//                     <div className="space-y-3">
//                         <FormLabel htmlFor="notes" className="text-base font-medium">
//                             Optional note
//                         </FormLabel>
//                         <Textarea
//                             id="notes"
//                             placeholder="Example: I prefer a short visit."
//                             value={notes}
//                             onChange={(e) => setNotes(e.target.value)}
//                             maxLength={160}
//                             className="min-h-24 text-base resize-none"
//                         />
//                         <p className="text-sm text-muted-text">{notes.length}/160 characters</p>
//                     </div>

//                     <Button
//                         onClick={handleSubmit}
//                         size="lg"
//                         className="w-full bg-[#dd673c] hover:bg-[#dd673c]/90 text-white text-lg h-14"
//                         disabled={!selectedType || !preferredTime || !location || !priority}
//                     >
//                         {!selectedType || !preferredTime || !location || !priority
//                             ? "Please complete all required fields"
//                             : "Post Request"}
//                     </Button>
//                 </CardContent>
//             </Card>
//         </div>
//     )
// }


// NewRequestForm.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { LocationPicker } from "@/components/location-picker";
import OnboardingTip from "../Atoms/OnboardingTip";
import { RequestTypeSelector } from "../Molecules/RequestTypeSelector";
import { PrioritySelector } from "../Molecules/PrioritySelector";
import { PreferredTimeSelector } from "../Molecules/PreferredTimeSelector";
import { FormLabel } from "../Atoms/FormLabel";

interface Props {
    user: any;
    seenTip: boolean;
    markSeenTip: () => void;
    saveRequest: (request: any) => void;
}

export const NewRequestForm = ({ user, seenTip, markSeenTip, saveRequest }: Props) => {
    const router = useRouter();

    const [selectedType, setSelectedType] = useState("");
    const [priority, setPriority] = useState("");
    const [preferredTime, setPreferredTime] = useState("");
    const [notes, setNotes] = useState("");
    const [location, setLocation] = useState<{ address: string; lat: number; lng: number } | null>(null);

    const handleSubmit = () => {
        if (!user || !location || !priority || !selectedType || !preferredTime) {
            alert("Please complete all required fields");
            return;
        }

        const requestTypeLabels: Record<string, string> = {
            talk: "Someone to talk to",
            hospital: "Hospital assistance",
            groceries: "Groceries help",
            checkin: "Check-in visit",
        };

        const newRequest = {
            id: `req_${Date.now()}`,
            userId: user.id,
            userName: user.profile.name,
            userPhone: user.profile.phone,
            type: selectedType,
            title: requestTypeLabels[selectedType] || selectedType,
            description: notes || "No additional notes",
            priority: priority as "low" | "medium" | "high" | "urgent",
            location,
            date: new Date().toLocaleDateString(),
            time: preferredTime,
            status: "open" as const,
            createdAt: new Date().toISOString(),
        };

        // Save the request
        saveRequest(newRequest);

        // Reset form (optional)
        setSelectedType("");
        setPriority("");
        setPreferredTime("");
        setNotes("");
        setLocation(null);

        // Navigate to requests page
        router.push("/requests?posted=1");
    };

    return (
        <div className="container mx-auto max-w-3xl">
            {!seenTip && (
                <OnboardingTip
                    title="Posting a request — quick tips"
                    description="Choose a clear priority, add your location, and a short note. Helpers see higher-priority requests first."
                    onClose={markSeenTip}
                />
            )}

            <Card className="border-2 border-border">
                <CardHeader>
                    <CardTitle className="text-2xl md:text-3xl text-center">
                        What do you need help with today?
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-8">
                    <RequestTypeSelector selectedType={selectedType} onSelect={setSelectedType} />
                    <LocationPicker onLocationSelect={setLocation} />
                    <PrioritySelector value={priority} onChange={setPriority} />
                    <PreferredTimeSelector value={preferredTime} onChange={setPreferredTime} />

                    <div className="space-y-3">
                        <FormLabel htmlFor="notes" className="text-base font-medium">
                            Optional note
                        </FormLabel>
                        <Textarea
                            id="notes"
                            placeholder="Example: I prefer a short visit."
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            maxLength={160}
                            className="min-h-24 text-base resize-none"
                        />
                        <p className="text-sm text-muted-text">{notes.length}/160 characters</p>
                    </div>

                    <Button
                        onClick={handleSubmit}
                        size="lg"
                        className="w-full bg-[#dd673c] hover:bg-[#dd673c]/90 text-white text-lg h-14"
                    >
                        Post Request
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
};