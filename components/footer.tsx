import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center md:justify-between gap-6">
          
          {/* Links */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Link
              href="/help"
              className="text-muted-text hover:text-text transition-colors text-sm"
            >
              Help & Safety
            </Link>
            <Link
              href="/feedback"
              className="text-muted-text hover:text-text transition-colors text-sm"
            >
              Feedback
            </Link>
          </div>

          {/* Emergency Call */}
          <a
            href="tel:112"
            className="w-full md:w-auto text-center font-bold text-red-600 border border-red-600 rounded-md px-4 py-2 text-sm hover:bg-red-600 hover:text-white transition-colors"
          >
            CALL 112 FOR EMERGENCY
          </a>

          {/* Copyright */}
          <p className="text-sm text-muted-text text-center">
            © Gran-assist
          </p>
        </div>
      </div>
    </footer>
  )
}
