"use client"
import { RoleCard } from "../Atoms/RoleCard"
import { onboardingRoles } from "../Data/onboardingRoles"
interface Props {
    userName: string
}
export const OnboardingSelection = ({ userName }: Props) => {
    return (
        <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-text mb-2">
                    Welcome, {userName}!
                </h1>
                <p className="text-lg text-muted-text">
                    Choose how you'd like to use Gran-assist
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {onboardingRoles.map((role) => (
                    <RoleCard
                        key={role.id}
                        href={role.href}
                        icon={role.icon}
                        title={role.title}
                        description={role.description}
                        color={role.color}
                        hoverBorder={role.hoverBorder}
                        bgColor={role.bgColor}
                        hoverBg={role.hoverBg}
                    />
                ))}
            </div>
        </div>
    )
}