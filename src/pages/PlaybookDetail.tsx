import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, X, Edit, Play, ArrowLeft, Clock, AlertCircle, XCircle, Trash2, RotateCcw, FileText, StopCircle, CheckSquare, MessageSquare, History, LayoutList, Send } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "sonner";

interface PlaybookDetailData {
  id: string;
  title: string;
  status: "Not Used" | "In-progress" | "Applied" | "Rejected";
  steps: string[];
  commands: string[];
}

const PLAYBOOK_DETAILS: Record<string, PlaybookDetailData> = {
  "PB-2024-001": {
    id: "PB-2024-001",
    title: "Phishing Response Protocol",
    status: "Applied",
    steps: [
      "Isolate the affected user account immediately.",
      "Scan the user's workstation for malware artifacts.",
      "Analyze the email headers to identify the sender source.",
      "Block the sender domain and IP address on the firewall.",
      "Reset user credentials and enforce MFA."
    ],
    commands: [
      "Disable-ADAccount -Identity 'username'",
      "Get-MessageTrace -SenderAddress 'attacker@bad.com'",
      "New-NetFirewallRule -DisplayName 'Block Bad IP' -Direction Inbound -RemoteAddress '192.168.1.100' -Action Block"
    ]
  },
  "PB-2024-002": {
    id: "PB-2024-002",
    title: "Malware Containment Steps",
    status: "In-progress",
    steps: [
      "Disconnect the infected host from the network.",
      "Capture memory dump for forensic analysis.",
      "Identify the malware process and terminate it.",
      "Search for persistence mechanisms (Registry, Scheduled Tasks).",
      "Run a full system antivirus scan."
    ],
    commands: [
      "netsh interface set interface 'Ethernet' admin=disable",
      "procdump.exe -ma <pid> memory.dmp",
      "taskkill /PID <pid> /F",
      "Get-ScheduledTask | Where-Object {$_.State -eq 'Ready'}"
    ]
  },
  "PB-2024-003": {
    id: "PB-2024-003",
    title: "Suspicious Login Investigation",
    status: "Not Used",
    steps: [
      "Verify the login location and IP address.",
      "Check for multiple failed login attempts prior to success.",
      "Contact the user to confirm if the activity was legitimate.",
      "If unauthorized, reset password and revoke active sessions."
    ],
    commands: [
      "Get-AzureADAuditSignInLogs -UserPrincipalName 'user@domain.com'",
      "Revoke-AzureADUserAllRefreshToken -ObjectId <user-object-id>"
    ]
  },
  "PB-2024-004": {
    id: "PB-2024-004",
    title: "Data Leakage Mitigation",
    status: "Rejected",
    steps: [
      "Identify the sensitive data involved (PII, PHI, IP).",
      "Determine the exfiltration method (Email, USB, Cloud Upload).",
      "Block the exfiltration channel.",
      "Interview the user involved.",
      "Document the incident for legal review."
    ],
    commands: [
      "Get-DlpDetailReport -StartDate <date>",
      "Block-SharePointUserAccess -Url <site-url> -User <user-email>"
    ]
  }
};

export default function PlaybookDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [playbook, setPlaybook] = useState<PlaybookDetailData | null>(null);

  useEffect(() => {
    if (id && PLAYBOOK_DETAILS[id]) {
      setPlaybook(PLAYBOOK_DETAILS[id]);
    }
  }, [id]);

  if (!playbook) {
    return (
      <div className="flex flex-col items-center justify-center h-[50vh] space-y-4">
        <h2 className="text-2xl font-bold text-muted-foreground">Playbook not found</h2>
        <Button onClick={() => navigate("/playbooks")}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Playbooks
        </Button>
      </div>
    );
  }

  const handleStatusChange = (newStatus: PlaybookDetailData["status"], message: string) => {
    setPlaybook({ ...playbook, status: newStatus });
    toast.success(message);
  };

  const handleDelete = () => {
    toast.success("Playbook deleted successfully");
    navigate("/playbooks");
  };

  const handleAction = (action: string) => {
    toast.info(`${action} action triggered`);
  };

  const getStatusBadge = (status: PlaybookDetailData["status"]) => {
    const commonClasses = "px-3 py-1";
    switch (status) {
      case "Applied":
        return <Badge className={`bg-green-500/15 text-green-500 hover:bg-green-500/25 border-green-500/20 ${commonClasses}`}><CheckCircle className="w-3 h-3 mr-1" /> Applied</Badge>;
      case "In-progress":
        return <Badge className={`bg-blue-500/15 text-blue-500 hover:bg-blue-500/25 border-blue-500/20 ${commonClasses}`}><Clock className="w-3 h-3 mr-1" /> In-progress</Badge>;
      case "Not Used":
        return <Badge variant="secondary" className={commonClasses}><AlertCircle className="w-3 h-3 mr-1" /> Not Used</Badge>;
      case "Rejected":
        return <Badge variant="destructive" className={commonClasses}><XCircle className="w-3 h-3 mr-1" /> Rejected</Badge>;
    }
  };

  const renderActions = () => {
    switch (playbook.status) {
      case "Not Used":
        return (
          <>
            <Button
              variant="default"
              className="gap-2"
              onClick={() => handleStatusChange("In-progress", "Playbook accepted. Status changed to In-progress.")}
            >
              <CheckCircle className="h-4 w-4" />
              Accept
            </Button>
            <Button
              variant="destructive"
              className="gap-2"
              onClick={() => handleStatusChange("Rejected", "Playbook rejected.")}
            >
              <X className="h-4 w-4" />
              Reject
            </Button>
            <Button variant="secondary" className="gap-2" onClick={() => handleAction("Edit")}>
              <Edit className="h-4 w-4" />
              Edit
            </Button>
            <Button variant="outline" className="gap-2" onClick={() => handleAction("Apply to Case")}>
              <Play className="h-4 w-4" />
              Apply to Case
            </Button>
            <Button variant="ghost" className="gap-2 text-destructive hover:text-destructive" onClick={handleDelete}>
              <Trash2 className="h-4 w-4" />
              Delete
            </Button>
          </>
        );
      case "In-progress":
        return (
          <>
            <Button
              className="gap-2 bg-green-600 hover:bg-green-700"
              onClick={() => handleStatusChange("Applied", "Playbook marked as Applied.")}
            >
              <CheckSquare className="h-4 w-4" />
              Mark as Applied
            </Button>
            <Button variant="outline" className="gap-2" onClick={() => handleAction("Edit")}>
              <Edit className="h-4 w-4" />
              Edit
            </Button>
            <Button variant="secondary" className="gap-2" onClick={() => handleAction("Add Notes")}>
              <MessageSquare className="h-4 w-4" />
              Add Notes
            </Button>
            <Button
              variant="ghost"
              className="gap-2 text-orange-500 hover:text-orange-600"
              onClick={() => handleStatusChange("Not Used", "Stopped using playbook. Reverted to Not Used.")}
            >
              <StopCircle className="h-4 w-4" />
              Stop Using
            </Button>
          </>
        );
      case "Applied":
        return (
          <>
            <Button variant="default" className="gap-2" onClick={() => handleAction("Generate Report")}>
              <FileText className="h-4 w-4" />
              Generate Report
            </Button>
            <Button variant="outline" className="gap-2" onClick={() => handleAction("View Report History")}>
              <History className="h-4 w-4" />
              View Report History
            </Button>
            <Button variant="ghost" className="gap-2" onClick={() => handleAction("View Timeline")}>
              <LayoutList className="h-4 w-4" />
              View Timeline
            </Button>
          </>
        );
      case "Rejected":
        return (
          <>
            <Button variant="default" className="gap-2" onClick={() => handleAction("Regenerate")}>
              <RotateCcw className="h-4 w-4" />
              Ask AI to Regenerate
            </Button>
            <Button variant="outline" className="gap-2" onClick={() => handleAction("Provide Feedback")}>
              <MessageSquare className="h-4 w-4" />
              Provide Feedback
            </Button>
            <Button variant="ghost" className="gap-2 text-destructive hover:text-destructive" onClick={handleDelete}>
              <Trash2 className="h-4 w-4" />
              Delete
            </Button>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate("/playbooks")}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-foreground">{playbook.title}</h2>
            <p className="text-muted-foreground text-sm mt-1">{playbook.id}</p>
          </div>
          {getStatusBadge(playbook.status)}
        </div>
      </div>

      {/* AI Steps */}
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            AI-Generated Resolution Steps
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {playbook.steps.map((step, index) => (
              <div key={index} className="flex gap-3 items-start p-3 rounded-lg bg-muted/30 border border-border/50">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold mt-0.5">
                  {index + 1}
                </div>
                <p className="text-foreground/90 leading-relaxed">{step}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Suggested Commands */}
      <Card>
        <CardHeader>
          <CardTitle>Suggested Commands</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {playbook.commands.map((cmd, index) => (
              <div key={index} className="bg-slate-950 text-slate-50 font-mono text-sm p-4 rounded-md border border-slate-800 shadow-inner flex items-center justify-between group">
                <code>{cmd}</code>
                <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 h-6 text-xs text-slate-400 hover:text-slate-100" onClick={() => {
                  navigator.clipboard.writeText(cmd);
                  toast.success("Command copied to clipboard");
                }}>
                  Copy
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <Card>
        <CardHeader>
          <CardTitle>Playbook Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            {renderActions()}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
