import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Settings as SettingsIcon, Moon, Sun, Palette, LayoutTemplate, Type, Monitor,
  User, Camera, Bell, Mail, MessageSquare, Shield, Lock, Smartphone,
  Server, Users, AlertTriangle, Globe, Clock, Save, RotateCcw, CheckCircle
} from "lucide-react";
import { toast } from "sonner";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("theme");
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;
    const isDarkMode = root.classList.contains("dark");
    setIsDark(isDarkMode);
  }, []);

  const toggleTheme = () => {
    const root = window.document.documentElement;
    root.classList.toggle("dark");
    const newTheme = root.classList.contains("dark") ? "dark" : "light";
    setIsDark(!isDark);
    localStorage.setItem("theme", newTheme);
  };

  const menuItems = [
    { id: "theme", label: "Theme Customization", icon: Palette },
    { id: "layout", label: "Layout Settings", icon: LayoutTemplate },
    { id: "profile", label: "Profile Settings", icon: User },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security & Access", icon: Shield },
    { id: "system", label: "System (Admin)", icon: Server },
    { id: "language", label: "Language & Region", icon: Globe },
  ];

  const handleSave = () => {
    toast.success("Settings saved successfully");
  };

  const handleReset = () => {
    toast.info("Settings reset to defaults");
  };

  const renderContent = () => {
    switch (activeTab) {
      case "theme":
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <Card className="tech-card border-l-4 border-l-primary/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Palette className="h-5 w-5 text-primary" /> Theme Mode</CardTitle>
                <CardDescription>Choose your preferred visual theme</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between p-4 rounded-lg border bg-card/50">
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-full ${isDark ? 'bg-primary/20' : 'bg-muted'}`}>
                      {isDark ? <Moon className="h-6 w-6 text-primary" /> : <Sun className="h-6 w-6 text-orange-500" />}
                    </div>
                    <div>
                      <Label className="text-base">Dark Mode</Label>
                      <p className="text-sm text-muted-foreground">Switch between light and dark themes</p>
                    </div>
                  </div>
                  <Switch checked={isDark} onCheckedChange={toggleTheme} />
                </div>

                <div className="space-y-4">
                  <Label>High Contrast Theme</Label>
                  <div className="flex items-center justify-between p-4 rounded-lg border bg-card/50">
                    <div className="flex items-center gap-4">
                      <Monitor className="h-6 w-6 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Increase Contrast</p>
                        <p className="text-sm text-muted-foreground">Better visibility for accessibility</p>
                      </div>
                    </div>
                    <Switch />
                  </div>
                </div>

                <div className="space-y-4">
                  <Label>Accent Color</Label>
                  <div className="flex gap-3">
                    {['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-orange-500', 'bg-red-500'].map((color, i) => (
                      <button key={i} className={`h-8 w-8 rounded-full ${color} ring-2 ring-offset-2 ring-offset-background hover:scale-110 transition-transform ${i === 0 ? 'ring-primary' : 'ring-transparent'}`} />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "layout":
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <Card className="tech-card border-l-4 border-l-blue-500/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><LayoutTemplate className="h-5 w-5 text-blue-500" /> Interface Layout</CardTitle>
                <CardDescription>Customize the dashboard structure</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Sidebar Position</Label>
                    <Select defaultValue="left">
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="left">Left</SelectItem>
                        <SelectItem value="right">Right</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Sidebar State</Label>
                    <Select defaultValue="expanded">
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="expanded">Expanded</SelectItem>
                        <SelectItem value="collapsed">Collapsed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Type className="h-4 w-4" />
                      <Label>Font Size</Label>
                    </div>
                    <span className="text-sm text-muted-foreground">Medium</span>
                  </div>
                  <Slider defaultValue={[50]} max={100} step={25} className="w-full" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Small</span>
                    <span>Medium</span>
                    <span>Large</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <Label>Card Style</Label>
                  <div className="flex bg-muted rounded-lg p-1">
                    <Button variant="ghost" size="sm" className="bg-background shadow-sm rounded-md text-xs h-7">Rounded</Button>
                    <Button variant="ghost" size="sm" className="text-xs h-7">Sharp</Button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <Label>Enable Animations</Label>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "profile":
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <Card className="tech-card border-l-4 border-l-green-500/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><User className="h-5 w-5 text-green-500" /> Profile Information</CardTitle>
                <CardDescription>Manage your personal details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-6">
                  <div className="relative">
                    <Avatar className="h-24 w-24 border-2 border-primary/20">
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <Button size="icon" variant="secondary" className="absolute bottom-0 right-0 rounded-full h-8 w-8 shadow-md">
                      <Camera className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-medium text-lg">Analyst User</h3>
                    <p className="text-sm text-muted-foreground">Senior Security Analyst</p>
                    <Badge variant="outline" className="mt-2">Level 3 Clearance</Badge>
                  </div>
                </div>

                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" defaultValue="Analyst User" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" defaultValue="analyst@caseflow.sec" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="password">Change Password</Label>
                    <Input id="password" type="password" placeholder="••••••••" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "notifications":
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <Card className="tech-card border-l-4 border-l-yellow-500/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Bell className="h-5 w-5 text-yellow-500" /> Notification Preferences</CardTitle>
                <CardDescription>Control how you receive alerts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Channels</h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-muted-foreground" />
                      <Label>Email Notifications</Label>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Smartphone className="h-5 w-5 text-muted-foreground" />
                      <Label>SMS Alerts</Label>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <MessageSquare className="h-5 w-5 text-muted-foreground" />
                      <Label>In-App Messages</Label>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Triggers</h3>
                  <div className="flex items-center justify-between">
                    <Label>Case Updates</Label>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>High Severity Alerts</Label>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>System Status Changes</Label>
                    <Switch />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "security":
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <Card className="tech-card border-l-4 border-l-red-500/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Shield className="h-5 w-5 text-red-500" /> Security & Access</CardTitle>
                <CardDescription>Protect your account and sessions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between p-4 border rounded-lg bg-red-500/5 border-red-500/20">
                  <div className="flex items-center gap-4">
                    <Lock className="h-6 w-6 text-red-500" />
                    <div>
                      <Label className="text-base">Two-Factor Authentication</Label>
                      <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                    </div>
                  </div>
                  <Switch />
                </div>

                <div className="space-y-4">
                  <Label>Session Timeout</Label>
                  <Select defaultValue="30">
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 Minutes</SelectItem>
                      <SelectItem value="30">30 Minutes</SelectItem>
                      <SelectItem value="60">1 Hour</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4">
                  <Label>Login History</Label>
                  <div className="rounded-md border font-mono text-sm">
                    <div className="grid grid-cols-3 p-2 bg-muted font-medium">
                      <span>Device</span>
                      <span>Location</span>
                      <span>Time</span>
                    </div>
                    <div className="grid grid-cols-3 p-2 border-t">
                      <span>MacBook Pro</span>
                      <span>New York, US</span>
                      <span className="text-green-500">Active Now</span>
                    </div>
                    <div className="grid grid-cols-3 p-2 border-t">
                      <span>iPhone 13</span>
                      <span>New York, US</span>
                      <span className="text-muted-foreground">2h ago</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "system":
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <Card className="tech-card border-l-4 border-l-purple-500/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Server className="h-5 w-5 text-purple-500" /> System Configuration</CardTitle>
                <CardDescription>Admin-only settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="flex items-center gap-2"><Users className="h-4 w-4" /> User Management</Label>
                    <Button size="sm" variant="outline">Manage Users</Button>
                  </div>
                  <div className="p-4 rounded-lg border bg-muted/50 text-sm text-muted-foreground text-center">
                    3 Admins • 12 Analysts • 5 Viewers
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <Label className="flex items-center gap-2"><AlertTriangle className="h-4 w-4" /> SLA Settings</Label>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="space-y-2">
                      <Label className="text-xs">Critical</Label>
                      <Input defaultValue="4h" className="font-mono" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs">High</Label>
                      <Input defaultValue="8h" className="font-mono" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs">Medium</Label>
                      <Input defaultValue="24h" className="font-mono" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "language":
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <Card className="tech-card border-l-4 border-l-cyan-500/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Globe className="h-5 w-5 text-cyan-500" /> Language & Region</CardTitle>
                <CardDescription>Localization preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Language</Label>
                  <Select defaultValue="en">
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English (US)</SelectItem>
                      <SelectItem value="hi">Hindi</SelectItem>
                      <SelectItem value="ta">Tamil</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-2"><Clock className="h-4 w-4" /> Timezone</Label>
                  <Select defaultValue="utc-5">
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="utc-5">Eastern Time (US & Canada)</SelectItem>
                      <SelectItem value="utc">UTC</SelectItem>
                      <SelectItem value="ist">India Standard Time</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Date Format</Label>
                  <Select defaultValue="mdy">
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mdy">MM/DD/YYYY</SelectItem>
                      <SelectItem value="dmy">DD/MM/YYYY</SelectItem>
                      <SelectItem value="ymd">YYYY-MM-DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 min-h-[80vh] animate-in fade-in duration-500">
      {/* Sidebar Navigation */}
      <aside className="lg:w-64 flex-shrink-0 space-y-4">
        <div className="sticky top-4">
          <h2 className="text-2xl font-bold mb-6 px-2 font-mono tracking-tight">SETTINGS</h2>
          <nav className="space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${activeTab === item.id
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </button>
            ))}
          </nav>

          <div className="mt-8 pt-8 border-t space-y-3 px-2">
            <Button className="w-full gap-2" onClick={handleSave}>
              <Save className="h-4 w-4" /> Save Changes
            </Button>
            <Button variant="outline" className="w-full gap-2" onClick={handleReset}>
              <RotateCcw className="h-4 w-4" /> Reset Defaults
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0">
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            {menuItems.find(i => i.id === activeTab)?.label}
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage your {menuItems.find(i => i.id === activeTab)?.label.toLowerCase()} preferences
          </p>
        </div>
        {renderContent()}
      </main>
    </div>
  );
}
