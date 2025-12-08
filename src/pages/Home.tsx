import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Bell, Folder, Clock, CheckCircle, AlertTriangle, Activity, Shield } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";

const PIE_DATA = [
  { name: "Solved", value: 1245, color: "#10b981" }, // emerald-500
  { name: "Active", value: 27, color: "#f59e0b" }, // amber-500
  { name: "Pending", value: 12, color: "#ef4444" }, // red-500
];

const BAR_DATA = [
  { name: "Phishing", cases: 450 },
  { name: "Malware", cases: 320 },
  { name: "DDoS", cases: 150 },
  { name: "Insider", cases: 80 },
  { name: "Other", cases: 284 },
];

export default function Home() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="tech-card border-l-4 border-l-primary/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium font-mono">TOTAL CASES</CardTitle>
            <Folder className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground font-mono">1,284</div>
            <p className="text-xs text-muted-foreground">All time cases</p>
          </CardContent>
        </Card>

        <Card className="tech-card border-l-4 border-l-warning/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium font-mono">PENDING</CardTitle>
            <Clock className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground font-mono">12</div>
            <p className="text-xs text-muted-foreground">Awaiting resolution</p>
          </CardContent>
        </Card>

        <Card className="tech-card border-l-4 border-l-success/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium font-mono">SOLVED</CardTitle>
            <CheckCircle className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground font-mono">1,245</div>
            <p className="text-xs text-muted-foreground">Successfully resolved</p>
          </CardContent>
        </Card>

        <Card className="tech-card border-l-4 border-l-accent/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium font-mono">ACTIVE</CardTitle>
            <AlertTriangle className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground font-mono">27</div>
            <p className="text-xs text-muted-foreground">Currently working</p>
          </CardContent>
        </Card>
      </div>

      {/* Today's Workload & Alerts */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="tech-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              Today's Workload
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border border-primary/10">
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
                  <span className="font-mono text-sm">Cases Assigned</span>
                </div>
                <span className="font-bold font-mono text-lg">8</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border border-primary/10">
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-green-500" />
                  <span className="font-mono text-sm">Resolved Today</span>
                </div>
                <span className="font-bold font-mono text-lg">3</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border border-primary/10">
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-yellow-500" />
                  <span className="font-mono text-sm">Pending Actions</span>
                </div>
                <span className="font-bold font-mono text-lg">5</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="tech-card">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary" />
              Recent Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { id: "ALT-2024-001", msg: "High volume of failed logins detected", time: "10m ago", severity: "high" },
                { id: "ALT-2024-002", msg: "New malware signature identified", time: "45m ago", severity: "medium" },
                { id: "ALT-2024-003", msg: "System backup completed successfully", time: "2h ago", severity: "low" },
              ].map((alert, i) => (
                <div key={i} className="flex items-start gap-3 p-2 rounded hover:bg-muted/50 transition-colors">
                  <AlertTriangle className={`h-4 w-4 mt-0.5 ${alert.severity === 'high' ? 'text-red-500' :
                    alert.severity === 'medium' ? 'text-yellow-500' : 'text-blue-500'
                    }`} />
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">{alert.msg}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono">
                      <span>{alert.id}</span>
                      <span>•</span>
                      <span>{alert.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="tech-card">
          <CardHeader>
            <CardTitle>Case Status Distribution</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={PIE_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {PIE_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }}
                  itemStyle={{ color: 'hsl(var(--foreground))' }}
                />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="tech-card">
          <CardHeader>
            <CardTitle>Case Types Overview</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={BAR_DATA}>
                <XAxis
                  dataKey="name"
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value}`}
                />
                <Tooltip
                  cursor={{ fill: 'hsl(var(--primary) / 0.1)' }}
                  contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }}
                  itemStyle={{ color: 'hsl(var(--foreground))' }}
                />
                <Bar dataKey="cases" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Case Activities */}
      <Card className="tech-card">
        <CardHeader>
          <CardTitle>Recent Case Activities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {[
              { user: "Analyst Sarah", action: "updated case", target: "CASE-2024-001", time: "5 mins ago", icon: Activity },
              { user: "System", action: "flagged suspicious IP in", target: "CASE-2024-089", time: "12 mins ago", icon: AlertTriangle },
              { user: "Analyst Mike", action: "closed investigation", target: "CASE-2024-002", time: "1 hour ago", icon: CheckCircle },
              { user: "Automated Playbook", action: "executed response for", target: "CASE-2024-156", time: "2 hours ago", icon: Shield },
            ].map((activity, i) => (
              <div key={i} className="flex gap-4 items-start relative pb-6 last:pb-0 border-l border-primary/20 last:border-0 ml-2 pl-6">
                <span className="absolute -left-[5px] top-1 h-2.5 w-2.5 rounded-full bg-primary ring-4 ring-background" />
                <div className="flex-1 space-y-1">
                  <p className="text-sm text-foreground">
                    <span className="font-semibold text-primary">{activity.user}</span> {activity.action} <span className="font-mono text-xs bg-muted px-1 py-0.5 rounded">{activity.target}</span>
                  </p>
                  <p className="text-xs text-muted-foreground font-mono">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
