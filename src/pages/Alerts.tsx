import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Bell, AlertTriangle, CheckCircle, Clock, Filter, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export interface Alert {
  id: string;
  title: string;
  message: string;
  severity: "High" | "Medium" | "Low";
  caseId?: string;
  time: string;
  read: boolean;
  type: "System" | "AI";
}

export const MOCK_ALERTS: Alert[] = [
  {
    id: "ALT-001",
    title: "High-Risk Case Detected",
    message: "AI analysis indicates potential ransomware activity in Case #125.",
    severity: "High",
    caseId: "CASE-125",
    time: "10 mins ago",
    read: false,
    type: "AI",
  },
  {
    id: "ALT-002",
    title: "SLA Deadline Approaching",
    message: "Case #101 is approaching its 4-hour resolution deadline.",
    severity: "Medium",
    caseId: "CASE-101",
    time: "30 mins ago",
    read: false,
    type: "System",
  },
  {
    id: "ALT-003",
    title: "New Evidence Uploaded",
    message: "User uploaded 'firewall_logs.csv' to Case #112.",
    severity: "Low",
    caseId: "CASE-112",
    time: "1 hour ago",
    read: true,
    type: "System",
  },
  {
    id: "ALT-004",
    title: "Playbook Ready for Review",
    message: "AI has generated a response plan for Case #130.",
    severity: "Medium",
    caseId: "CASE-130",
    time: "2 hours ago",
    read: true,
    type: "AI",
  },
];

export default function Alerts() {
  const navigate = useNavigate();
  const [alerts, setAlerts] = useState<Alert[]>(MOCK_ALERTS);
  const [filterSeverity, setFilterSeverity] = useState<string>("all");

  const handleMarkAlertRead = (id: string) => {
    setAlerts(alerts.map(a => a.id === id ? { ...a, read: true } : a));
    toast.success("Alert marked as read");
  };

  const getSeverityBadge = (severity: Alert["severity"]) => {
    switch (severity) {
      case "High":
        return <Badge variant="destructive" className="bg-red-500/15 text-red-500 border-red-500/20 hover:bg-red-500/25">High</Badge>;
      case "Medium":
        return <Badge className="bg-orange-500/15 text-orange-500 border-orange-500/20 hover:bg-orange-500/25">Medium</Badge>;
      case "Low":
        return <Badge className="bg-blue-500/15 text-blue-500 border-blue-500/20 hover:bg-blue-500/25">Low</Badge>;
    }
  };

  const filteredAlerts = filterSeverity === "all"
    ? alerts
    : alerts.filter(a => a.severity === filterSeverity);

  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-6xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground tracking-tight">System Alerts</h2>
          <p className="text-muted-foreground mt-1">Stay informed with critical system notifications.</p>
        </div>
        <div className="relative p-2 bg-primary/10 rounded-full">
          <Bell className="h-6 w-6 text-primary" />
          {alerts.some(a => !a.read) && (
            <span className="absolute top-0 right-0 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500 border-2 border-background"></span>
            </span>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-end">
          <Select value={filterSeverity} onValueChange={setFilterSeverity}>
            <SelectTrigger className="w-[180px]">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Filter by Severity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Severities</SelectItem>
              <SelectItem value="High">High Priority</SelectItem>
              <SelectItem value="Medium">Medium Priority</SelectItem>
              <SelectItem value="Low">Low Priority</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-4">
          {filteredAlerts.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              No alerts found matching the current filter.
            </div>
          ) : (
            filteredAlerts.map((alert) => (
              <Card key={alert.id} className={`tech-card transition-all duration-200 ${!alert.read ? 'border-l-4 border-l-primary bg-primary/5' : 'opacity-80'}`}>
                <CardContent className="p-6 flex items-start gap-4">
                  <div className={`mt-1 p-2 rounded-full ${alert.severity === 'High' ? 'bg-red-500/10 text-red-500' : 'bg-primary/10 text-primary'}`}>
                    <AlertTriangle className="h-5 w-5" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-lg">{alert.title}</h3>
                        {getSeverityBadge(alert.severity)}
                        {!alert.read && <Badge variant="default" className="bg-primary text-primary-foreground text-xs">New</Badge>}
                      </div>
                      <span className="text-sm text-muted-foreground flex items-center gap-1 font-mono">
                        <Clock className="h-3 w-3" /> {alert.time}
                      </span>
                    </div>
                    <p className="text-muted-foreground">{alert.message}</p>
                    {alert.caseId && (
                      <div className="pt-2 flex gap-2">
                        <Button variant="outline" size="sm" className="gap-2" onClick={() => navigate(`/cases/${alert.caseId}`)}>
                          <ExternalLink className="h-3 w-3" />
                          Open Case
                        </Button>
                        {!alert.read && (
                          <Button variant="ghost" size="sm" className="gap-2" onClick={() => handleMarkAlertRead(alert.id)}>
                            <CheckCircle className="h-3 w-3" />
                            Mark as Read
                          </Button>
                        )}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
