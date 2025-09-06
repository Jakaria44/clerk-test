import ContactForm from "@/components/ContactForm";
import { MapPin, Mail, Phone, Clock } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Let's Bridge Your Brand to the World
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ready to start your next campaign? Get in touch with our team of
            digital media experts and let's discuss how we can help you achieve
            your goals.
          </p>
        </div>

        {/* Contact Form */}
        <div className="mb-16">
          <ContactForm />
        </div>

        {/* Additional Contact Information */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-sm text-center">
            <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-6 h-6 text-slate-700" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Visit Us
            </h3>
            <p className="text-gray-600">
              San Francisco, CA
              <br />
              United States
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm text-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Mail className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Email Us
            </h3>
            <p className="text-gray-600">
              hello@ggmedia.agency
              <br />
              support@ggmedia.agency
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Phone className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Call Us
            </h3>
            <p className="text-gray-600">
              +1 (415) 555-0123
              <br />
              Mon-Fri 9AM-6PM PST
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm text-center">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Response Time
            </h3>
            <p className="text-gray-600">
              Within 24 hours
              <br />
              Emergency: 2 hours
            </p>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16 bg-white rounded-xl shadow-sm p-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Frequently Asked Questions
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                What services does Golden Gate Media offer?
              </h3>
              <p className="text-gray-600">
                We specialize in digital media buying, programmatic advertising,
                social media campaigns, creative optimization, and performance
                tracking across all major platforms.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                What is your typical response time?
              </h3>
              <p className="text-gray-600">
                We respond to all inquiries within 24 hours. For urgent matters,
                we provide emergency support with a 2-hour response time.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Do you work with small businesses?
              </h3>
              <p className="text-gray-600">
                Absolutely! We work with businesses of all sizes, from startups
                to enterprise companies. We tailor our services to fit your
                budget and goals.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                What makes Golden Gate Media different?
              </h3>
              <p className="text-gray-600">
                Our Golden Gate-inspired approach combines data-driven
                strategies with creative excellence, providing transparent
                reporting and global reach with local expertise.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
