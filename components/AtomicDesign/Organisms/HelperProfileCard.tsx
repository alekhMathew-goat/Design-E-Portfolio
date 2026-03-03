"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { User, Phone, MapPin, Star, CheckCircle } from "lucide-react"
import { ProfileItem } from "../Atoms/ProfileItem"
import { HelperProfileForm } from "../Molecules/HelperProfileForm"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { updateUser, getCurrentUser } from "@/lib/auth"

interface Props {
    user: any
    setUser: (user: any) => void
}

export const HelperProfileCard = ({ user, setUser }: Props) => {
    const [isEditing, setIsEditing] = useState(false)
    const router = useRouter()

    const [formValues, setFormValues] = useState({
        name: user.profile.name || "",
        phone: user.profile.phone || "",
        bio: user.profile.bio || "",
        specialties: user.profile.specialties || "",
        experience: user.profile.experience?.toString() || "",
    })

    const handleChange = (field: string, value: string) => {
        setFormValues((prev) => ({ ...prev, [field]: value }))
    }

    const handleSave = () => {
        updateUser(user.id, {
            profile: {
                ...user.profile,
                ...formValues,
            },
        })
        setUser(getCurrentUser())
        setIsEditing(false)
    }

    return (
        <Card className="border-2 border-border">
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-2xl md:text-3xl">
                    Helper Profile
                </CardTitle>

                {!isEditing && (
                    <Button variant="outline" onClick={() => setIsEditing(true)}>
                        Edit
                    </Button>
                )}
            </CardHeader>

            <CardContent className="space-y-6">
                {isEditing ? (
                    <HelperProfileForm
                        values={formValues}
                        onChange={handleChange}
                        onSave={handleSave}
                    />
                ) : (
                    <>
                        <ProfileItem
                            icon={<User className="w-6 h-6 text-[#50966d]" />}
                            label="Name"
                            value={user.profile.name}
                        />

                        <ProfileItem
                            icon={<Phone className="w-6 h-6 text-[#50966d]" />}
                            label="Phone"
                            value={user.profile.phone}
                        />

                        {user.profile.bio && (
                            <ProfileItem
                                icon={<User className="w-6 h-6 text-[#50966d]" />}
                                label="Bio"
                                value={user.profile.bio}
                            />
                        )}

                        {user.profile.specialties && (
                            <ProfileItem
                                icon={<Star className="w-6 h-6 text-[#50966d]" />}
                                label="Specialties"
                                value={user.profile.specialties}
                            />
                        )}

                        {user.profile.experience && (
                            <ProfileItem
                                icon={<CheckCircle className="w-6 h-6 text-[#50966d]" />}
                                label="Years of Experience"
                                value={user.profile.experience}
                            />
                        )}

                        {user.profile.location && (
                            <ProfileItem
                                icon={<MapPin className="w-6 h-6 text-[#50966d]" />}
                                label="Location"
                                value={user.profile.location.address}
                            />
                        )}

                        <div className="space-y-3 pt-4 border-t border-border">
                            <Button
                                size="lg"
                                className="w-full bg-[#dd673c] hover:bg-[#dd673c]/90 text-white h-14"
                                onClick={() => router.push("/requests")}
                            >
                                View Available Requests
                            </Button>

                            <Button
                                size="lg"
                                variant="outline"
                                className="w-full border-2 h-14"
                                onClick={() => router.push("/help")}
                            >
                                Get Help & Safety Tips
                            </Button>
                        </div>
                    </>
                )}
            </CardContent>
        </Card>
    )
}