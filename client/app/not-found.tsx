export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">404 - Page Not Found</h1>
        <p className="text-slate-300 mb-8">The page you are looking for does not exist.</p>
        <a href="/" className="text-blue-400 hover:text-blue-300 underline">
          Go back home
        </a>
      </div>
    </div>
  )
}
