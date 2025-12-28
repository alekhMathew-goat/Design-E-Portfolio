import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex gap-6">
            <Link href="/help" className="text-muted-text hover:text-text transition-colors text-sm">
              Help & Safety
            </Link>
            <Link href="/feedback" className="text-muted-text hover:text-text transition-colors text-sm">
              Feedback
            </Link>
          </div>
          <p className="text-sm text-muted-text">© Gran-assist</p>
        </div>
      </div>
    </footer>
  )
}
