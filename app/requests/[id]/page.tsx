"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { Header } from "@/components/AtomicDesign/Organisms/Header";
import { LocationCard } from "@/components/AtomicDesign/Molecules/LocationCard";
import { PRIORITY_INFO, SAFETY_REMINDER, TIME_ICON } from "@/components/AtomicDesign/Data/requestInfoData";
import { getRequestById, updateRequest, getCurrentUser } from "@/lib/auth";
import { RequesterInfo } from "@/components/AtomicDesign/Molecules/RequesterInfo";

export default function RequestDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [request, setRequest] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = getCurrentUser();
    const requestData = getRequestById(params.id);

    if (!requestData) {
      router.push("/requests");
      return;
    }

    setUser(currentUser);
    setRequest(requestData);
    setLoading(false);
  }, [params.id, router]);

  const handleAccept = () => {
    if (!user || !request) return;

    updateRequest(request.id, {
      status: "accepted",
      acceptedBy: {
        id: user.id,
        name: user.profile.name,
        phone: user.profile.phone,
      },
    });

    router.push(`/confirmation?requestId=${request.id}`);
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!request) return null;

  const priority = PRIORITY_INFO[request.priority] || PRIORITY_INFO.medium;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-16 px-4">
        <div className="container mx-auto max-w-2xl space-y-6">
          <Card className="border-2 border-border">
            <CardHeader>
              <CardTitle className="text-2xl md:text-3xl">Request Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Title & badges */}
              <h2 className="text-2xl font-bold text-text mb-2">{request.title}</h2>
              <div className="flex flex-wrap gap-3 text-sm text-muted-text">
                <span className="px-3 py-1 bg-primary/10 rounded-full text-primary font-medium">Type: {request.type}</span>
                <span className="px-3 py-1 bg-secondary/10 rounded-full text-secondary font-medium">Status: {request.status}</span>
                <span className={`px-3 py-1 rounded-full font-bold flex items-center gap-1 ${priority.bg} ${priority.text}`}>
                  {priority.description}
                </span>
              </div>

              {/* Requester Info */}
              <RequesterInfo name={request.userName} phone={request.userPhone} />

              {/* Location */}
              <LocationCard address={request.location.address} lat={request.location.lat} lng={request.location.lng} />

              {/* Accept Button */}
              {request.status === "open" && user?.role === "helper" && (
                <div className="space-y-3 pt-6 border-t border-border">
                  <Button
                    onClick={handleAccept}
                    size="lg"
                    className="w-full bg-accent hover:bg-accent/90 text-white text-base h-12 font-semibold"
                  >
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Accept Request
                  </Button>
                  <Button asChild size="lg" variant="outline" className="w-full border-2 text-base h-12 bg-transparent">
                    <Link href="/requests">Back to Requests</Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Safety Reminder */}
          <Card className="border-2 border-warning/30 bg-warning/5">
            <CardContent className="pt-6 flex gap-4">
              <SAFETY_REMINDER.icon className="w-6 h-6 text-warning flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-text mb-2">{SAFETY_REMINDER.title}</h3>
                <p className="text-sm text-muted-text leading-relaxed">{SAFETY_REMINDER.description}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}