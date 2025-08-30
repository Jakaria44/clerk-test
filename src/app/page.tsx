import {
  ArrowRight,
  Target,
  Globe,
  BarChart3,
  Palette,
  TrendingUp,
  Users,
  Zap,
  Award,
} from "lucide-react";
import { SignInButton } from "@clerk/nextjs";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-50 via-white to-blue-50 min-h-screen flex items-center py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8">
            Bridge Your Brand to the World
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-5xl mx-auto leading-relaxed">
            At Global Gate Media, we connect brands with audiences through
            powerful digital media buying. From precision targeting to global
            scale, we help you get the right message, in the right place, at the
            right time.
          </p>
          <SignInButton mode="modal">
            <button className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-lg text-lg transition-all duration-200 transform hover:scale-105 shadow-lg">
              👉 Let's Talk Media
              <ArrowRight className="w-5 h-5" />
            </button>
          </SignInButton>
        </div>
      </section>

      {/* About Us Section */}
      <section
        id="about"
        className="min-h-screen flex items-center py-20 px-4 bg-white"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                About Us
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                We are Global Gate Media, a digital media buying agency born at
                the intersection of creativity, technology, and strategy.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Inspired by the Golden Gate — a symbol of connection — we bridge
                the gap between your brand and the audiences that matter most.
                Whether you're an emerging startup or an established enterprise,
                our mission is simple: maximize your media ROI and grow your
                impact.
              </p>
            </div>
            <div className="bg-gradient-to-br from-slate-100 to-blue-50 p-8 rounded-2xl">
              <div className="text-center">
                <div className="text-6xl mb-4">🌉</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Golden Gate Inspired
                </h3>
                <p className="text-gray-600">
                  Connecting brands with audiences across the digital landscape
                </p>
              </div>
            </div>
            <div className="text-center mt-12">
              <SignInButton mode="modal">
                <button className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg">
                  Start Your Journey
                  <ArrowRight className="w-4 h-4" />
                </button>
              </SignInButton>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section
        id="services"
        className="min-h-screen flex items-center py-20 px-4 bg-gray-50"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive digital media solutions designed to maximize your
              ROI and grow your impact
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Service 1 */}
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center mb-6">
                <Target className="w-6 h-6 text-slate-700" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Media Buying & Planning
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>
                  • Data-driven campaigns on Google, Meta, YouTube, TikTok, and
                  beyond
                </li>
                <li>• Strategic media planning tailored to your goals</li>
              </ul>
            </div>

            {/* Service 2 */}
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                <BarChart3 className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Programmatic Advertising
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Real-time bidding across premium ad networks</li>
                <li>• Audience-first targeting with precision analytics</li>
              </ul>
            </div>

            {/* Service 3 */}
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Social Media Campaigns
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>
                  • Paid campaigns across Facebook, Instagram, LinkedIn, TikTok
                </li>
                <li>
                  • Engagement strategies that convert clicks into customers
                </li>
              </ul>
            </div>

            {/* Service 4 */}
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-6">
                <Palette className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Creative Optimization
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>• A/B testing ad creatives for maximum performance</li>
                <li>
                  • Eye-catching visuals and compelling copy that resonates
                </li>
              </ul>
            </div>

            {/* Service 5 */}
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-6">
                <TrendingUp className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Performance Tracking
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Transparent reporting with real-time dashboards</li>
                <li>• Continuous optimization for higher ROI</li>
              </ul>
            </div>
          </div>
          <div className="text-center mt-12">
            <SignInButton mode="modal">
              <button className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg">
                Explore Our Services
                <ArrowRight className="w-4 h-4" />
              </button>
            </SignInButton>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="min-h-screen flex items-center py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose Global Gate Media?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-slate-700" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Smart Targeting
              </h3>
              <p className="text-gray-600">
                Reach the right people at the right time
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Global Expertise
              </h3>
              <p className="text-gray-600">
                Run campaigns across borders and cultures
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Transparent Results
              </h3>
              <p className="text-gray-600">
                Every click, view, and conversion tracked
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Palette className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Creative + Data
              </h3>
              <p className="text-gray-600">
                A perfect blend of art and analytics
              </p>
            </div>
          </div>
          <div className="text-center mt-12">
            <SignInButton mode="modal">
              <button className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg">
                Choose Global Gate Media
                <ArrowRight className="w-4 h-4" />
              </button>
            </SignInButton>
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section
        id="case-studies"
        className="min-h-screen flex items-center py-20 px-4 bg-gray-50"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Success Stories
            </h2>
            <p className="text-xl text-gray-600">
              Real results from real campaigns
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center mb-6">
                <TrendingUp className="w-6 h-6 text-slate-700" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                E-commerce Growth
              </h3>
              <p className="text-gray-600 mb-4">
                Increased ROAS by 3.2x for a fashion retailer through targeted
                Facebook + Google Ads.
              </p>
              <div className="text-2xl font-bold text-slate-700">3.2x ROAS</div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                <Zap className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Tech Startup Launch
              </h3>
              <p className="text-gray-600 mb-4">
                Generated 100K+ app installs in 60 days through strategic mobile
                advertising.
              </p>
              <div className="text-2xl font-bold text-green-600">
                100K+ Installs
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                <Award className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Global Brand Awareness
              </h3>
              <p className="text-gray-600 mb-4">
                Managed cross-border campaigns reaching 12M+ users across
                multiple markets.
              </p>
              <div className="text-2xl font-bold text-purple-600">
                12M+ Reach
              </div>
            </div>
          </div>
          <div className="text-center mt-12">
            <SignInButton mode="modal">
              <button className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg">
                See Your Success Story
                <ArrowRight className="w-4 h-4" />
              </button>
            </SignInButton>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-slate-700 to-slate-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Scale Smarter?
          </h2>
          <p className="text-xl text-slate-200 mb-8">
            Let's plan your next campaign and unlock growth.
          </p>
          <SignInButton mode="modal">
            <button className="inline-flex items-center gap-2 bg-white text-blue-600 font-semibold py-4 px-8 rounded-lg text-lg transition-all duration-200 transform hover:scale-105 shadow-lg">
              👉 Book a Free Strategy Call
              <ArrowRight className="w-5 h-5" />
            </button>
          </SignInButton>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">🌉 Global Gate Media</h3>
              <p className="text-gray-400 mb-4">
                Bridge Your Brand to the World
              </p>
              <div className="space-y-2 text-gray-400">
                <p>📍 San Francisco, CA</p>
                <p>🌐 ggmedia.agency</p>
                <p>✉️ hello@ggmedia.agency</p>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">
                Global Gate Media, LLC
              </h4>
              <p className="text-gray-400">
                Connecting brands with audiences through powerful digital media
                buying. From precision targeting to global scale, we help you
                get the right message, in the right place, at the right time.
              </p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Golden Gate Media, LLC. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
