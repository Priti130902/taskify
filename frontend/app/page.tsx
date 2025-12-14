 import Link from "next/link";

export default function Home() {
  return (
    <main>
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-semibold text-lg">
            <div className="h-9 w-9 rounded-lg bg-emerald-500 text-white flex items-center justify-center">
              ✓
            </div>
            Taskify
          </div>

          <div className="flex items-center gap-4">
            <Link href="/auth" className="text-sm text-gray-600 hover:text-black">
              Login
            </Link>
            <Link
              href="/auth"
              className="bg-emerald-500 text-white px-4 py-2 rounded-xl text-sm font-medium hover:opacity-90"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-emerald-100">
        <div className="container mx-auto px-6 py-32 text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium mb-6">
            ⚡ Full-Stack Task Management
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Build tasks faster with{" "}
            <span className="text-emerald-500">Taskify</span>
          </h1>

          <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
            A modern, secure task management dashboard inspired by Lovable.dev.
            Clean UI, scalable architecture, and production-ready design.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/auth"
              className="bg-emerald-500 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow hover:scale-[1.02] transition"
            >
              Start Managing Tasks →
            </Link>

            <a
              href="https://github.com"
              target="_blank"
              className="px-8 py-4 rounded-xl border text-lg font-medium hover:bg-gray-50 transition"
            >
              View on GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Why Taskify?
          </h2>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                title: "Clean UI",
                desc: "Lovable-style layout with soft gradients and spacing.",
              },
              {
                title: "Secure",
                desc: "JWT authentication & protected routes.",
              },
              {
                title: "Scalable",
                desc: "Built with modern React & backend architecture.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition"
              >
                <div className="h-10 w-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
                  ✓
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Ready to get started?
        </h2>
        <p className="text-gray-600 mb-8">
          Create your free account and start managing tasks today.
        </p>
        <Link
          href="/auth"
          className="inline-block bg-emerald-500 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:opacity-90 transition"
        >
          Create Free Account
        </Link>
      </section>
            {/* Footer */}
      <footer className="border-t bg-white">
        <div className="container mx-auto px-6 py-16">
          <div className="grid gap-12 md:grid-cols-4">

            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 font-semibold text-lg mb-4">
                <div className="h-9 w-9 rounded-lg bg-emerald-500 text-white flex items-center justify-center">
                  ✓
                </div>
                Taskify
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                Taskify is a modern task management platform built for speed,
                clarity, and productivity. Manage your tasks smarter.
              </p>
            </div>

            {/* Product */}
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-3 text-sm text-gray-600">
                <li><Link href="#" className="hover:text-emerald-500">Features</Link></li>
                <li><Link href="#" className="hover:text-emerald-500">Pricing</Link></li>
                <li><Link href="#" className="hover:text-emerald-500">Roadmap</Link></li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-3 text-sm text-gray-600">
                <li><Link href="#" className="hover:text-emerald-500">Documentation</Link></li>
                <li><Link href="#" className="hover:text-emerald-500">API Reference</Link></li>
                <li><Link href="#" className="hover:text-emerald-500">Support</Link></li>
              </ul>
            </div>

            {/* Get Started */}
            <div>
              <h4 className="font-semibold mb-4">Get Started</h4>
              <p className="text-sm text-gray-600 mb-4">
                Start organizing your tasks in minutes.
              </p>
              <Link
                href="/auth"
                className="inline-block bg-emerald-500 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:opacity-90 transition"
              >
                Create Account
              </Link>
            </div>

          </div>

          {/* Bottom */}
          <div className="mt-16 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
            <p>© {new Date().getFullYear()} Taskify. All rights reserved.</p>

            <div className="flex gap-6">
              <Link href="#" className="hover:text-emerald-500">Privacy</Link>
              <Link href="#" className="hover:text-emerald-500">Terms</Link>
              <Link href="#" className="hover:text-emerald-500">Contact</Link>
            </div>
          </div>
        </div>
      </footer>

    </main>
  );
}
