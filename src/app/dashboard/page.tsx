import { auth, currentUser } from "@clerk/nextjs/server";
import {
  BarChart3,
  TrendingUp,
  Users,
  DollarSign,
  Target,
  Eye,
  MousePointer,
  Calendar,
  Plus,
  Filter,
  Download,
  Settings,
  Bell,
  Wallet,
} from "lucide-react";
import Link from "next/link";
import MasterCard from "@/components/MasterCard";
import TransactionHistory from "@/components/TransactionHistory";
import DashboardChart from "@/components/DashboardChart";

// Sample data for the chart
const chartData = [
  {
    name: "Jan",
    spend: 12000,
    impressions: 180000,
    clicks: 3200,
    conversions: 180,
  },
  {
    name: "Feb",
    spend: 15000,
    impressions: 220000,
    clicks: 4100,
    conversions: 240,
  },
  {
    name: "Mar",
    spend: 18000,
    impressions: 280000,
    clicks: 5200,
    conversions: 310,
  },
  {
    name: "Apr",
    spend: 22000,
    impressions: 350000,
    clicks: 6500,
    conversions: 390,
  },
  {
    name: "May",
    spend: 25000,
    impressions: 420000,
    clicks: 7800,
    conversions: 470,
  },
  {
    name: "Jun",
    spend: 28000,
    impressions: 480000,
    clicks: 8900,
    conversions: 540,
  },
  {
    name: "Jul",
    spend: 32000,
    impressions: 550000,
    clicks: 10200,
    conversions: 620,
  },
];

export default async function DashboardPage() {
  await auth.protect();

  // Get the current user information
  const user = await currentUser();
  const userName = user?.firstName || user?.fullName || "User";

  return (
    <div className="min-h-screen max-w-7xl mx-auto text-left sm:text-center">
      {/* Dashboard Header */}
      <div className="bg-white border-b px-6 py-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600">
              Welcome back, {userName}! Here's your campaign overview.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 text-gray-400 hover:text-gray-600">
              <Bell className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Financial Management Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Add Money / Top Up */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Wallet className="w-5 h-5" />
                Quick Actions
              </h2>
            </div>
            <div className="space-y-4">
              <Link
                href="/dashboard/topup"
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                    <Plus className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 text-left">
                      Add Money
                    </div>
                    <div className="text-sm text-gray-600">
                      Top up your account balance
                    </div>
                  </div>
                </div>
                <div className="text-gray-400 group-hover:text-blue-600 transition-colors">
                  →
                </div>
              </Link>

              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-colors group cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-200 transition-colors">
                    <BarChart3 className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 text-left">
                      View Reports
                    </div>
                    <div className="text-sm text-gray-600">
                      Campaign performance analytics
                    </div>
                  </div>
                </div>
                <div className="text-gray-400 group-hover:text-green-600 transition-colors">
                  →
                </div>
              </div>

              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors group cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                    <Users className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 text-left">
                      Manage Clients
                    </div>
                    <div className="text-sm text-gray-600">
                      Client accounts and campaigns
                    </div>
                  </div>
                </div>
                <div className="text-gray-400 group-hover:text-purple-600 transition-colors">
                  →
                </div>
              </div>
            </div>
          </div>

          {/* Master Card */}
          <MasterCard />
        </div>

        {/* Transaction History */}
        <div className="mb-8">
          <TransactionHistory />
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Spend</p>
                <p className="text-2xl font-bold text-gray-900">$124,567</p>
                <p className="text-sm text-green-600 flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" />
                  +12.5%
                </p>
              </div>
              <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-slate-700" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Impressions</p>
                <p className="text-2xl font-bold text-gray-900">2.4M</p>
                <p className="text-sm text-green-600 flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" />
                  +8.2%
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Eye className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Clicks</p>
                <p className="text-2xl font-bold text-gray-900">45,892</p>
                <p className="text-sm text-green-600 flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" />
                  +15.3%
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <MousePointer className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Conversions</p>
                <p className="text-2xl font-bold text-gray-900">1,234</p>
                <p className="text-sm text-green-600 flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" />
                  +22.1%
                </p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Target className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Campaign Performance */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                Campaign Performance
              </h2>
              <div className="flex items-center gap-2">
                <button className="p-2 text-gray-400 hover:text-gray-600">
                  <Filter className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600">
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Chart with Recharts */}
            <div className="h-64">
              <DashboardChart data={chartData} />
            </div>
          </div>

          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                Top Performing Campaigns
              </h2>
              <button className="text-xs sm:text-sm text-blue-600 hover:text-blue-700 font-medium">
                View All
              </button>
            </div>
            <div className="space-y-3 sm:space-y-4">
              {[
                {
                  title: "Fashion Brand Q4",
                  metric: "ROAS: 4.2x",
                  change: "+45%",
                  color: "green",
                },
                {
                  title: "Tech Startup Launch",
                  metric: "CTR: 3.8%",
                  change: "+32%",
                  color: "blue",
                },
                {
                  title: "Global Awareness",
                  metric: "Reach: 2.1M",
                  change: "+18%",
                  color: "purple",
                },
              ].map((campaign, index) => (
                <div
                  key={index}
                  className={`flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 bg-gradient-to-r from-${campaign.color}-50 to-${campaign.color}-100 rounded-lg border border-${campaign.color}-200`}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <div
                        className={`w-2 h-2 bg-${campaign.color}-500 rounded-full`}
                      ></div>
                      <p className="font-semibold text-left text-gray-900 text-sm sm:text-base">
                        {campaign.title}
                      </p>
                    </div>
                    <p className="text-xs sm:text-sm text-left text-gray-600 ml-4">
                      {campaign.metric}
                    </p>
                  </div>
                  <div className="text-left sm:text-right mt-2 sm:mt-0 ml-4 sm:ml-0">
                    <p className="text-sm font-bold text-green-600">
                      {campaign.change}
                    </p>
                    <p className="text-xs text-gray-500">vs last month</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity & Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                Recent Activity
              </h2>
              <button className="text-xs sm:text-sm text-blue-600 hover:text-blue-700 font-medium">
                View All
              </button>
            </div>
            <div className="space-y-2 sm:space-y-3">
              {[
                {
                  icon: TrendingUp,
                  iconColor: "text-green-600",
                  bgColor: "bg-green-100",
                  title: 'Campaign "Fashion Brand Q4" exceeded ROAS target',
                  time: "2 hours ago",
                  timeColor: "bg-green-500",
                  badge: "Success",
                  badgeColor: "bg-green-100 text-green-800",
                },
                {
                  icon: Plus,
                  iconColor: "text-blue-600",
                  bgColor: "bg-blue-100",
                  title: "New creative assets uploaded for Tech Startup",
                  time: "4 hours ago",
                  timeColor: "bg-blue-500",
                  badge: "Upload",
                  badgeColor: "bg-blue-100 text-blue-800",
                },
                {
                  icon: DollarSign,
                  iconColor: "text-purple-600",
                  bgColor: "bg-purple-100",
                  title: "Budget adjustment made to Global Awareness campaign",
                  time: "6 hours ago",
                  timeColor: "bg-purple-500",
                  badge: "Budget",
                  badgeColor: "bg-purple-100 text-purple-800",
                },
                {
                  icon: BarChart3,
                  iconColor: "text-orange-600",
                  bgColor: "bg-orange-100",
                  title: "A/B test completed for Fashion Brand landing page",
                  time: "1 day ago",
                  timeColor: "bg-orange-500",
                  badge: "Test",
                  badgeColor: "bg-orange-100 text-orange-800",
                },
              ].map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 sm:p-4 hover:bg-gray-50 rounded-lg transition-colors border border-transparent hover:border-gray-200"
                >
                  <div
                    className={`flex-shrink-0 w-10 h-10 ${activity.bgColor} rounded-lg flex items-center justify-center`}
                  >
                    <activity.icon
                      className={`w-5 h-5 ${activity.iconColor}`}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm  text-left font-semibold text-gray-900 leading-tight">
                          {activity.title}
                        </p>
                        <p className="text-xs text-gray-500 mt-1.5 flex items-center gap-1">
                          <div
                            className={`w-1 h-1 ${activity.timeColor} rounded-full`}
                          ></div>
                          {activity.time}
                        </p>
                      </div>
                      <div className="flex-shrink-0">
                        <span
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${activity.badgeColor}`}
                        >
                          {activity.badge}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                Campaign Actions
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <button className="flex flex-col items-center p-4 sm:p-6 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all group">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-3 group-hover:bg-blue-200 transition-colors">
                  <Plus className="w-6 h-6 text-blue-600" />
                </div>
                <span className="text-sm font-semibold text-gray-900">
                  New Campaign
                </span>
                <span className="text-xs text-gray-500 mt-1 text-center">
                  Launch new advertising campaign
                </span>
              </button>

              <button className="flex flex-col items-center p-4 sm:p-6 border border-gray-200 rounded-lg hover:border-orange-300 hover:bg-orange-50 transition-all group">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-3 group-hover:bg-orange-200 transition-colors">
                  <Calendar className="w-6 h-6 text-orange-600" />
                </div>
                <span className="text-sm font-semibold text-gray-900">
                  Schedule Meeting
                </span>
                <span className="text-xs text-gray-500 mt-1 text-center">
                  Book strategy consultation
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
