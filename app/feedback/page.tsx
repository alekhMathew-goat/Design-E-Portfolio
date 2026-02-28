"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

export default function FeedbackPage() {
  const { toast } = useToast()
  const [easeOfUse, setEaseOfUse] = useState("")
  const [mostHelpful, setMostHelpful] = useState("")
  const [suggestion, setSuggestion] = useState("")

  const handleSubmit = () => {
    toast({
      title: "Thanks!",
      description: "Feedback recorded for the demo.",
    })
    setEaseOfUse("")
    setMostHelpful("")
    setSuggestion("")
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-16 px-4">
        <div className="container mx-auto max-w-2xl">
          <Card className="border-2 border-border">
            <CardHeader>
              <CardTitle className="text-2xl md:text-3xl text-center">Feedback</CardTitle>
              <p className="text-center text-muted-text mt-2">Your feedback helps improve the design.</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label htmlFor="ease" className="text-base font-medium">
                  Was it easy to use?
                </Label>
                <Select value={easeOfUse} onValueChange={setEaseOfUse}>
                  <SelectTrigger id="ease" className="h-12 text-base">
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="somewhat">Somewhat</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label htmlFor="helpful" className="text-base font-medium">
                  Most helpful section
                </Label>
                <Select value={mostHelpful} onValueChange={setMostHelpful}>
                  <SelectTrigger id="helpful" className="h-12 text-base">
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="posting">Posting a request</SelectItem>
                    <SelectItem value="feed">Requests feed</SelectItem>
                    <SelectItem value="safety">Safety info</SelectItem>
                    <SelectItem value="profile">Profile</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label htmlFor="suggestion" className="text-base font-medium">
                  One suggestion
                </Label>
                <Textarea
                  id="suggestion"
                  placeholder="What would you improve?"
                  value={suggestion}
                  onChange={(e) => setSuggestion(e.target.value)}
                  maxLength={160}
                  className="min-h-24 text-base resize-none"
                />
                <p className="text-sm text-muted-text">{suggestion.length}/160 characters</p>
              </div>

              <Button
                onClick={handleSubmit}
                size="lg"
                className="w-full bg-primary hover:bg-primary/90 text-white text-lg h-14"
              >
                Submit (Demo)
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}
