
export default function QuickAccess() {
  return (
    <div className="mx-8 mb-8 mt-4 rounded-lg overflow-hidden  ">

      <div className="container mx-auto text-center">
        <h2 className="text-2xl font-semibold text-text mb-4">How it works — 3 simple step</h2>
        <p className="text-sm text-muted-text mb-6">Get help quickly by following these easy steps.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 border-2 border-border rounded-lg">
            <div className="text-xl font-bold text-[#dd673c] mb-2">1. Post a request</div>
            <div className="text-sm text-muted-text">Choose a request type, add your location and priority, then post.</div>
          </div>

          <div className="p-4 border-2 border-border rounded-lg">
            <div className="text-xl font-bold text-[#dd673c] mb-2">2. Helpers browse</div>
            <div className="text-sm text-muted-text">Helpers see requests nearby and can view details on the map.</div>
          </div>

          <div className="p-4 border-2 border-border rounded-lg">
            <div className="text-xl font-bold text-[#dd673c] mb-2">3. Connect safely</div>
            <div className="text-sm text-muted-text">Accept a match, then contact the requester to coordinate help.</div>
          </div>
        </div>
      </div>

    </div>
  )
}
