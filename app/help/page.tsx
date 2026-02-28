"use client";
import { useState } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, Shield, HeartHandshake, ChevronDown } from "lucide-react";

type FAQItemProps = {
  question: string;
  answer: string;
};

const FAQItem = ({ question, answer }: FAQItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b last:border-b-0 py-4">
      <button
        type="button"
        className="flex w-full items-center justify-between text-left cursor-pointer"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
      >
        <h3 className="font-semibold text-lg">{question}</h3>
        <ChevronDown className={`w-6 h-6 transform transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}/>

      </button>
      {isOpen && <p className="mt-2 text-gray-600">{answer}</p>}
    </div>
  );
};

const FAQ = () => {
  const faqData = [
    {
      question: "How can I request urgent help?",
      answer:
        "If you need urgent assistance, select 'Urgent' priority when posting a request. This will display your request first to nearby helpers. For true emergencies, always call local emergency services (911 in the US) first.",
    },
    {
      question: "How can I verify helpers?",
      answer:
        "View helper profiles to see their experience, specialties, and any reviews. You can contact them directly via phone number listed in their profile before accepting help.",
    },
    {
      question: "What types of requests can I post?",
      answer:
        "Common requests include: someone to talk to, hospital assistance, grocery help, and check-in visits. You can add specific details in the optional notes field.",
    },
    {
      question: "Is my personal information safe?",
      answer:
        "This is a demo platform. In production, all personal information would be encrypted and protected. Only verified helpers see your location and contact info.",
    },
    {
      question: "What if I'm not comfortable with a helper?",
      answer:
        "You can decline any request acceptance. Trust your instincts — if something doesn't feel right, don't proceed and try another helper.",
    },
    {
      question: "How do I cancel a request?",
      answer:
        "You can cancel an open request at any time from the requests page. Once a helper has accepted, contact them directly to reschedule or cancel.",
    },
  ];

  return (
    <div className="mx-8 mb-8 mt-4 rounded-lg overflow-hidden">
      <h2 className="text-center mb-4 text-2xl font-bold">FAQ - EdTech Platform</h2>
      {faqData.map((item, index) => (
        <FAQItem key={index} question={item.question} answer={item.answer} />
      ))}
    </div>
  );
};

export default function HelpPage() {
  const [activeCard, setActiveCard] = useState<null | string>(null);

  const toggleCard = (card: string) => {
    setActiveCard(activeCard === card ? null : card);
  };
  return (
    <div className="mx-8 mb-8 mt-4 rounded-lg overflow-hidden">
      <Header />

<main className="flex-1 py-16 px-4">
      <div className="border-2 border-border space-y-6 m-2 p-6 rounded-lg">
        <h1 className="text-3xl md:text-4xl font-bold text-text mb-8">
          Help & Safety
        </h1>

        <div className="!flex justify-center gap-6">
          {/* Meeting Volunteers Safely */}
          <Card
            className="w-1/2 border-2 border-warning/30 bg-warning/5 cursor-pointer"
            onClick={() => toggleCard("volunteers")}
          >
            <CardContent className="pt-2">
              <div className="flex gap-4 items-center">
                <AlertTriangle className="w-8 h-8 text-warning flex-shrink-0" />
                <h2 className="text-xl font-semibold text-text">
                  Meeting Volunteers Safely
                </h2>
              </div>
              {activeCard === "volunteers" && (
                <p className="text-muted-text leading-relaxed mt-3">
                  If someone is in immediate danger or needs urgent medical care,
                  call <strong>112</strong> or contact local emergency services
                  right away.
                </p>
              )}
            </CardContent>
          </Card>

          {/* Scope of this demo */}
          <Card
            className="w-1/2 border-2 border-border cursor-pointer"
            onClick={() => toggleCard("demo")}
          >
            <CardContent className="pt-2">
              <div className="flex gap-4 items-center">
                <HeartHandshake className="w-8 h-8 text-[#50966d] flex-shrink-0" />
                {/* <Info className="w-8 h-8 text-primary flex-shrink-0" /> */}
                <h2 className="text-xl font-semibold text-text">
                  Scope of this demo
                </h2>
              </div>
              {activeCard === "demo" && (
                <p className="text-muted-text leading-relaxed mt-3">
                  This is a prototype model for a school project. It does not
                  process or store real data.
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mt-12">
        <FAQ />
      </div>
    </main>

      <Footer />
    </div>
  );
}

export { FAQ };
