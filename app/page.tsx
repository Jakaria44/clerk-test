import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Zap, Users, TrendingUp, Star, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-muted py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">
            Empower Your Financial Future
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto text-pretty">
            Secure, transparent, and reliable financial services designed to help you achieve your goals with
            confidence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dashboard">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-lg px-8 py-3">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/services">
              <Button variant="outline" size="lg" className="text-lg px-8 py-3 bg-transparent">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Why Choose GGMedia?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience the future of financial services with our cutting-edge platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Shield className="h-12 w-12 text-accent mx-auto mb-4" />
                <CardTitle>Bank-Level Security</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Your data and transactions are protected with enterprise-grade encryption and security protocols.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Zap className="h-12 w-12 text-accent mx-auto mb-4" />
                <CardTitle>Lightning Fast</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Process transactions and access your account information instantly with our optimized platform.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Users className="h-12 w-12 text-accent mx-auto mb-4" />
                <CardTitle>24/7 Support</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Our dedicated support team is available around the clock to assist you with any questions.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <TrendingUp className="h-12 w-12 text-accent mx-auto mb-4" />
                <CardTitle>Smart Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Get insights into your spending patterns and financial health with our advanced analytics.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-muted py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Trusted by Thousands</h2>
            <p className="text-xl text-muted-foreground">See what our customers have to say about their experience</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                  ))}
                </div>
                <CardTitle className="text-lg">Sarah Johnson</CardTitle>
                <CardDescription>Small Business Owner</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  "GGMedia has transformed how I manage my business finances. The interface is intuitive and the
                  security gives me peace of mind."
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                  ))}
                </div>
                <CardTitle className="text-lg">Michael Chen</CardTitle>
                <CardDescription>Freelance Designer</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  "The analytics features help me understand my spending patterns better. I've been able to save more
                  money since switching to GGMedia."
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                  ))}
                </div>
                <CardTitle className="text-lg">Emily Rodriguez</CardTitle>
                <CardDescription>Marketing Manager</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  "Customer support is exceptional. They resolved my issue within minutes and were incredibly helpful
                  throughout the process."
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Ready to Take Control of Your Finances?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of satisfied customers who trust GGMedia with their financial future.
          </p>
          <Link href="/dashboard">
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-lg px-8 py-3">
              Start Your Journey Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Shield className="h-6 w-6 text-accent" />
                <span className="text-xl font-bold">GGMedia</span>
              </div>
              <p className="text-primary-foreground/80">
                Empowering your financial future with secure, reliable, and innovative solutions.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-primary-foreground/80">
                <li>
                  <Link href="/services" className="hover:text-accent transition-colors">
                    Digital Banking
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="hover:text-accent transition-colors">
                    Investment Management
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="hover:text-accent transition-colors">
                    Financial Planning
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="hover:text-accent transition-colors">
                    Business Solutions
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-primary-foreground/80">
                <li>
                  <Link href="/about" className="hover:text-accent transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-accent transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="hover:text-accent transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/press" className="hover:text-accent transition-colors">
                    Press
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-primary-foreground/80">
                <li>
                  <Link href="/privacy" className="hover:text-accent transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-accent transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/security" className="hover:text-accent transition-colors">
                    Security
                  </Link>
                </li>
                <li>
                  <Link href="/compliance" className="hover:text-accent transition-colors">
                    Compliance
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-primary-foreground/80">
            <p>&copy; 2024 GGMedia. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
