// GrandparentProfileCard.tsx =======================
"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { User, Phone, AlertCircle, MapPin } from "lucide-react"
import { ProfileItem } from "../Atoms/ProfileItem"
import { ProfileForm } from "../Molecules/ProfileForm"
import { useState } from "react"
import Link from "next/link"

interface Props {
    user: any
    onUpdate: (data: any) => void
}

export const GrandparentProfileCard = ({ user, onUpdate }: Props) => {
    const [isEditing, setIsEditing] = useState(false)

    return (
        <Card className="border-2 border-border">
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Your Profile</CardTitle>
                <Button variant="outline" onClick={() => setIsEditing(!isEditing)}>
                    {isEditing ? "Cancel" : "Edit"}
                </Button>
            </CardHeader>
            <CardContent className="space-y-6">
                {isEditing ? (
                    <ProfileForm
                        initialValues={{
                            name: user.profile.name,
                            age: user.profile.age?.toString() || "",
                            phone: user.profile.phone,
                            emergencyContact: user.profile.emergencyContact || "",
                        }}
                        onSave={(data) => {
                            onUpdate(data)
                            setIsEditing(false)
                        }}
                    />
                ) : (
                    <>
                        <ProfileItem icon={<User className="w-6 h-6 text-[#50966d]" />} label="Name" value={user.profile.name} />
                        {user.profile.age && <ProfileItem icon={<User className="w-6 h-6 text-[#50966d]" />} label="Age" value={user.profile.age.toString()} />}
                        <ProfileItem icon={<Phone className="w-6 h-6 text-[#50966d]" />} label="Phone" value={user.profile.phone} />
                        {user.profile.preferredContact && (
                            <ProfileItem icon={<Phone className="w-6 h-6 text-[#50966d]" />} label="Preferred Contact" value={user.profile.preferredContact} />
                        )}
                        {user.profile.emergencyContact && (
                            <ProfileItem icon={<AlertCircle className="w-6 h-6 text-warning" />} label="Emergency Contact" value={user.profile.emergencyContact} />
                        )}
                        {user.profile.location && (
                            <ProfileItem icon={<MapPin className="w-6 h-6 text-primary" />} label="Location" value={user.profile.location.address} />
                        )}
                    </>
                )}

                <div className="space-y-3 pt-4 border-t border-border">
                    <Button
                        type="submit"
                        className="w-full bg-[#dd673c] hover:bg-[#dd673c]/20 text-white hover:text-black h-14"

                    >
                        <Link href="/request/new">Post a Request</Link>
                    </Button>
                    <Button asChild size="lg" variant="outline" className="w-full border-2  h-14">
                        <Link href="/requests">Browse Available Helpers</Link>
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}