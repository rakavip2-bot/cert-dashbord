import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { MOCK_CASES } from "./Cases";
import {
  CheckCircle,
  Clock,
  Play,
  FileText,
  Send,
  Star,
  AlertTriangle,
  User,
  Mail,
  Phone,
  History,
  Paperclip,
  File,
  Image as ImageIcon,
  Video,
  Bot,
  Shield,
  ChevronDown,
  UserPlus
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Mock Data for the Case Detail
const CASE_DATA = {
  id: "CASE-101",
  type: "Phishing Attack",
  dateCreated: "Mar 10, 2024 - 09:42 AM",
  severity: "High",
  status: "Active",
  user: {
    name: "Alice Johnson",
    email: "alice.j@company.com",
    contact: "+1 (555) 123-4567",
    department: "Finance",
    history: [
      { id: "CASE-098", title: "Suspicious Login", date: "Feb 15, 2024", status: "Solved", match: 85 },
      { id: "CASE-045", title: "Password Reset", date: "Jan 10, 2024", status: "Solved", match: 45 },
    ]
  },
  problem: {
    description: "User reported receiving a suspicious email claiming to be from IT support asking for password reset. The email contained a link to a fake login page.",
    summary: "Potential credential harvesting attempt via email phishing."
  },
  evidence: [
    { type: "image", name: "email_screenshot.png", url: "/placeholder.svg" },
    { type: "pdf", name: "email_headers.pdf", url: "#" },
    { type: "video", name: "screen_recording.mp4", url: "#" },
  ],
  aiAnalysis: {
    threatType: "Credential Harvesting",
    confidence: 98,
    findings: [
      "Email domain 'support-company.com' is not registered to the organization.",
      "Link destination 'bit.ly/reset-pwd' is flagged as malicious.",
      "Sender IP originates from a known botnet."
    ],
    steps: [
      "Block sender domain in email gateway.",
      "Reset user credentials immediately.",
      "Scan user workstation for malware.",
      "Educate user on phishing indicators."
    ]
  },
  timeline: [
    { time: "Mar 10, 09:42 AM", event: "Case Created", user: "System" },
    { time: "Mar 10, 09:45 AM", event: "Evidence Uploaded", user: "Alice Johnson" },
    { time: "Mar 10, 09:50 AM", event: "AI Analysis Started", user: "System" },
    { time: "Mar 10, 09:52 AM", event: "Threat Detected: Phishing", user: "Cortex AI" },
    { time: "Mar 10, 10:00 AM", event: "Analyst Assigned", user: "John Doe" },
  ]
};

// Available analysts list
const AVAILABLE_ANALYSTS = [
  "John Doe",
  "Jane Smith",
  "Mike Ross",
  "Rachel Green",
  "Harvey Specter",
  "Donna Paulsen",
  "Louis Litt",
];

export default function CaseDetail() {
  const { id } = useParams();
  const [isPinned, setIsPinned] = useState(false);
  const [status, setStatus] = useState<"Pending" | "Active" | "Solved">("Active");
  const [notes, setNotes] = useState("");
  const [assignedAnalyst, setAssignedAnalyst] = useState("");

  useEffect(() => {
    const pinned = JSON.parse(localStorage.getItem('pinnedCases') || '[]');
    if (id && pinned.includes(id)) {
      setIsPinned(true);
    }

    // Load analyst from case data based on ID
    if (id) {
      const caseData = MOCK_CASES.find(c => c.id === id);
      if (caseData && caseData.analyst) {
        setAssignedAnalyst(caseData.analyst);
      } else {
        setAssignedAnalyst("");
      }
    }
  }, [id]);

  const togglePin = () => {
    if (!id) return;
    const pinned = JSON.parse(localStorage.getItem('pinnedCases') || '[]');
    let newPinned;
    if (pinned.includes(id)) {
      newPinned = pinned.filter((p: string) => p !== id);
      setIsPinned(false);
      toast.success("Case unpinned");
    } else {
      newPinned = [...pinned, id];
      setIsPinned(true);
      toast.success("Case pinned");
    }
    localStorage.setItem('pinnedCases', JSON.stringify(newPinned));
  };

  const handleStatusChange = (newStatus: "Pending" | "Active" | "Solved") => {
    setStatus(newStatus);
    toast.success(`Case status updated to ${newStatus}`);
  };

  const getStatusColor = (s: string) => {
    switch (s) {
      case "Solved": return "text-green-500 border-green-500";
      case "Active": return "text-blue-500 border-blue-500";
      case "Pending": return "text-yellow-500 border-yellow-500";
      default: return "text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div>
            <h2 className="text-3xl font-bold text-foreground font-mono tracking-tight">Case {id || CASE_DATA.id}</h2>
            <p className="text-muted-foreground flex items-center gap-2 mt-1">
              <Clock className="w-4 h-4" /> Created: {CASE_DATA.dateCreated}
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={togglePin}
            className="text-muted-foreground hover:text-yellow-500"
          >
            <Star className={`h-6 w-6 ${isPinned ? "fill-yellow-500 text-yellow-500" : ""}`} />
          </Button>
        </div>

        <div className="flex items-center gap-3">
          <Badge variant="outline" className="text-lg py-1 px-3 border-orange-500 text-orange-500 bg-orange-500/10">
            <AlertTriangle className="w-4 h-4 mr-2" />
            {CASE_DATA.severity} Severity
          </Badge>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className={`gap-2 border-2 ${getStatusColor(status)}`}>
                {status === "Solved" && <CheckCircle className="w-4 h-4" />}
                {status === "Active" && <Clock className="w-4 h-4" />}
                {status === "Pending" && <AlertTriangle className="w-4 h-4" />}
                {status === "Active" && (
                  <span className="relative flex h-2 w-2 mr-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                  </span>
                )}
                Status: {status}
                <ChevronDown className="w-4 h-4 ml-1 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleStatusChange("Pending")}>
                <AlertTriangle className="w-4 h-4 mr-2 text-yellow-500" /> Pending
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleStatusChange("Active")}>
                <Clock className="w-4 h-4 mr-2 text-blue-500" /> Active
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleStatusChange("Solved")}>
                <CheckCircle className="w-4 h-4 mr-2 text-green-500" /> Solved
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Main Info */}
        <div className="lg:col-span-2 space-y-6">

          {/* Case Overview & Problem */}
          <Card className="border-l-4 border-l-primary shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Case Overview & Problem
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-sm text-muted-foreground">Case Type</h4>
                  <p className="text-lg font-medium">{CASE_DATA.type}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-muted-foreground">Assigned Analyst</h4>
                  <p className="text-lg font-medium">
                    {assignedAnalyst && assignedAnalyst.trim() !== "" ? (
                      assignedAnalyst
                    ) : (
                      <span className="text-muted-foreground italic">Not Assigned</span>
                    )}
                  </p>
                </div>
              </div>
              <Separator />
              <div>
                <h4 className="font-semibold text-sm text-muted-foreground mb-2">Problem Summary</h4>
                <p className="text-base font-medium">{CASE_DATA.problem.summary}</p>
              </div>
              <div>
                <h4 className="font-semibold text-sm text-muted-foreground mb-2">Detailed Description</h4>
                <p className="text-muted-foreground leading-relaxed">
                  {CASE_DATA.problem.description}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Uploaded Evidence */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Paperclip className="h-5 w-5 text-primary" />
                Uploaded Evidence
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {CASE_DATA.evidence.map((item, index) => (
                  <div key={index} className="group relative border rounded-lg p-2 hover:bg-muted/50 transition-colors cursor-pointer">
                    <div className="aspect-video bg-muted rounded-md flex items-center justify-center mb-2 overflow-hidden">
                      {item.type === "image" && <ImageIcon className="w-8 h-8 text-muted-foreground" />}
                      {item.type === "pdf" && <File className="w-8 h-8 text-muted-foreground" />}
                      {item.type === "video" && <Video className="w-8 h-8 text-muted-foreground" />}
                    </div>
                    <p className="text-sm font-medium truncate" title={item.name}>{item.name}</p>
                    <p className="text-xs text-muted-foreground uppercase">{item.type}</p>
                  </div>
                ))}
                <div className="border-2 border-dashed rounded-lg p-4 flex flex-col items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors cursor-pointer h-full min-h-[120px]">
                  <Paperclip className="w-6 h-6 mb-2" />
                  <span className="text-sm">Upload New</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AI Playbook */}
          <Card className="border-l-4 border-l-destructive border-primary/20 shadow-sm">
            <CardHeader className="bg-primary/5">
              <CardTitle className="flex items-center gap-2 text-primary">
                <Bot className="h-5 w-5" />
                AI Playbook & Analysis
              </CardTitle>
              <CardDescription>Automated threat analysis and recommendations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="flex items-center justify-between bg-muted/30 p-4 rounded-lg">
                <div>
                  <p className="text-sm text-muted-foreground">Detected Threat</p>
                  <p className="text-lg font-bold text-destructive flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    {CASE_DATA.aiAnalysis.threatType}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">AI Confidence</p>
                  <p className="text-lg font-bold text-primary">{CASE_DATA.aiAnalysis.confidence}%</p>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Key Findings</h4>
                <ul className="space-y-2">
                  {CASE_DATA.aiAnalysis.findings.map((finding, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <AlertTriangle className="w-4 h-4 text-warning mt-0.5 shrink-0" />
                      {finding}
                    </li>
                  ))}
                </ul>
              </div>

              <Separator />

              <div>
                <h4 className="font-semibold mb-3">Recommended Actions</h4>
                <div className="space-y-2">
                  {CASE_DATA.aiAnalysis.steps.map((step, i) => (
                    <div key={i} className="flex items-center gap-3 p-2 border rounded-md hover:bg-muted/50">
                      <div className="h-6 w-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">
                        {i + 1}
                      </div>
                      <span className="text-sm">{step}</span>
                      <Button variant="ghost" size="sm" className="ml-auto text-primary">Execute</Button>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Send Message to Analyst */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Send className="h-5 w-5 text-primary" />
                Send Message to Analyst
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Type your message to the analyst here..."
                className="min-h-[150px] resize-y"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
              <div className="flex justify-end mt-4">
                <Button
                  onClick={() => {
                    if (notes.trim()) {
                      toast.success("Message sent to analyst successfully");
                      setNotes("");
                    } else {
                      toast.error("Please enter a message");
                    }
                  }}
                  className="gap-2"
                >
                  <Send className="h-4 w-4" />
                  Send Message
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-6">

          {/* User Information */}
          <Card className="border-l-4 border-l-blue-500 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                User Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                  {CASE_DATA.user.name.charAt(0)}
                </div>
                <div>
                  <p className="font-bold">{CASE_DATA.user.name}</p>
                  <p className="text-sm text-muted-foreground">{CASE_DATA.user.department}</p>
                </div>
              </div>
              <Separator />
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <a href={`mailto:${CASE_DATA.user.email}`} className="hover:underline">{CASE_DATA.user.email}</a>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <span>{CASE_DATA.user.contact}</span>
                </div>
              </div>

              <div className="pt-2">
                <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                  <History className="w-4 h-4" /> Previous Cases
                </h4>
                <div className="space-y-2">
                  {CASE_DATA.user.history.map((h) => (
                    <div key={h.id} className="text-sm border p-2 rounded bg-muted/30">
                      <div className="flex justify-between mb-1">
                        <span className="font-medium">{h.id}</span>
                        <Badge variant="outline" className="text-[10px] h-5">{h.status}</Badge>
                      </div>
                      <p className="text-muted-foreground text-xs mb-2">{h.title} • {h.date}</p>
                      <div className="flex items-center gap-2">
                        <Progress value={h.match} className="h-1.5 flex-1" />
                        <span className="text-[10px] font-medium text-muted-foreground">{h.match}% Match</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Case Timeline */}
          <Card className="border-l-4 border-l-orange-500 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                Case Timeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative border-l-2 border-muted ml-2 space-y-6 pl-6 py-2">
                {CASE_DATA.timeline.map((event, i) => (
                  <div key={i} className="relative">
                    <div className="absolute -left-[31px] top-1 h-4 w-4 rounded-full border-2 border-background bg-primary" />
                    <div className="flex flex-col">
                      <span className="text-xs text-muted-foreground">{event.time}</span>
                      <span className="text-sm font-medium">{event.event}</span>
                      <span className="text-xs text-muted-foreground">by {event.user}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Analyst Details */}
          <Card className="border-l-4 border-l-primary shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                Analyst Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              {assignedAnalyst && assignedAnalyst.trim() !== "" ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                      {assignedAnalyst.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="font-bold text-lg">{assignedAnalyst}</p>
                      <p className="text-sm text-muted-foreground">Security Analyst</p>
                    </div>
                  </div>
                  <Separator />
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <a href={`mailto:${assignedAnalyst.toLowerCase().replace(' ', '.')}@company.com`} className="hover:underline">
                        {assignedAnalyst.toLowerCase().replace(' ', '.')}.@company.com
                      </a>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <span>+1 (555) 000-0000</span>
                    </div>
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold">Status</h4>
                    <div className="flex items-center gap-2">
                      <div className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                      </div>
                      <span className="text-sm text-muted-foreground">Active</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="h-16 w-16 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
                    <User className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <p className="text-lg font-medium text-muted-foreground mb-2">No Analyst Assigned</p>
                  <p className="text-sm text-muted-foreground">This case has not been assigned to an analyst yet.</p>
                </div>
              )}
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}
