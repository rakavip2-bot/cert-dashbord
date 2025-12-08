import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Folder, Search, Eye, Clock, CheckCircle, AlertCircle, ArrowRight, AlertTriangle, ShieldAlert, Info, Filter, Star, UserPlus } from "lucide-react";
import { toast } from "sonner";

export interface Case {
  id: string;
  serverId: string;
  status: "Pending" | "Active" | "Solved";
  severity: "Critical" | "High" | "Medium" | "Low";
  deadline: string;
  analyst: string;
  userName: string;
  userEmail: string;
  type: string;
}

export const MOCK_CASES: Case[] = [
  {
    id: "CASE-101",
    serverId: "SRV-Alpha",
    status: "Solved",
    severity: "High",
    deadline: "2024-03-10",
    analyst: "John Doe",
    userName: "Alice Johnson",
    userEmail: "alice.j@company.com",
    type: "Phishing",
  },
  {
    id: "CASE-105",
    serverId: "SRV-Beta",
    status: "Active",
    severity: "Critical",
    deadline: "2024-03-12",
    analyst: "",
    userName: "Bob Williams",
    userEmail: "bob.w@company.com",
    type: "Malware",
  },
  {
    id: "CASE-112",
    serverId: "SRV-Gamma",
    status: "Pending",
    severity: "Medium",
    deadline: "2024-03-15",
    analyst: "",
    userName: "Charlie Brown",
    userEmail: "charlie.b@company.com",
    type: "Suspicious Login",
  },
  {
    id: "CASE-120",
    serverId: "SRV-Delta",
    status: "Active",
    severity: "High",
    deadline: "2024-03-14",
    analyst: "Rachel Green",
    userName: "David Miller",
    userEmail: "david.m@company.com",
    type: "Data Leakage",
  },
  {
    id: "CASE-125",
    serverId: "SRV-Alpha",
    status: "Pending",
    severity: "Critical",
    deadline: "2024-03-16",
    analyst: "",
    userName: "Eve Wilson",
    userEmail: "eve.w@company.com",
    type: "Ransomware",
  },
  {
    id: "CASE-128",
    serverId: "SRV-Beta",
    status: "Solved",
    severity: "Medium",
    deadline: "2024-03-18",
    analyst: "Donna Paulsen",
    userName: "Frank Castle",
    userEmail: "frank.c@company.com",
    type: "Policy Violation",
  },
  {
    id: "CASE-130",
    serverId: "SRV-Gamma",
    status: "Active",
    severity: "Low",
    deadline: "2024-03-20",
    analyst: "",
    userName: "Grace Hopper",
    userEmail: "grace.h@company.com",
    type: "Unauthorized Access",
  },
];

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

export default function Cases() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  const [severityFilter, setSeverityFilter] = useState<string[]>([]);
  const [assignmentFilter, setAssignmentFilter] = useState<string[]>([]);
  const [pinnedCases, setPinnedCases] = useState<string[]>([]);
  const [cases, setCases] = useState<Case[]>(MOCK_CASES);
  const [assignDialogOpen, setAssignDialogOpen] = useState(false);
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>(null);

  useEffect(() => {
    const pinned = JSON.parse(localStorage.getItem('pinnedCases') || '[]');
    setPinnedCases(pinned);
  }, []);

  const togglePin = (caseId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const pinned = JSON.parse(localStorage.getItem('pinnedCases') || '[]');
    let newPinned;
    if (pinned.includes(caseId)) {
      newPinned = pinned.filter((id: string) => id !== caseId);
      toast.success("Case unpinned");
    } else {
      newPinned = [...pinned, caseId];
      toast.success("Case pinned");
    }
    setPinnedCases(newPinned);
    localStorage.setItem('pinnedCases', JSON.stringify(newPinned));
  };

  const openAssignDialog = (caseId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedCaseId(caseId);
    setAssignDialogOpen(true);
  };

  const assignAnalyst = (analystName: string) => {
    if (selectedCaseId) {
      setCases(prevCases =>
        prevCases.map(c =>
          c.id === selectedCaseId ? { ...c, analyst: analystName } : c
        )
      );
      toast.success(`Assigned ${analystName} to ${selectedCaseId}`);
      setAssignDialogOpen(false);
      setSelectedCaseId(null);
    }
  };

  const getStatusBadge = (status: Case["status"]) => {
    const commonClasses = "w-[100px] justify-center font-semibold";
    switch (status) {
      case "Solved": return <Badge className={`bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/25 flex items-center gap-1 ${commonClasses}`}><CheckCircle className="w-3 h-3" /> Solved</Badge>;
      case "Active": return <Badge className={`bg-blue-500/15 text-blue-700 dark:text-blue-400 border-blue-500/30 hover:bg-blue-500/25 flex items-center gap-1 ${commonClasses}`}><Clock className="w-3 h-3" /> Active</Badge>;
      case "Pending": return <Badge className={`bg-amber-500/15 text-amber-700 dark:text-amber-400 border-amber-500/30 hover:bg-amber-500/25 flex items-center gap-1 ${commonClasses}`}><AlertCircle className="w-3 h-3" /> Pending</Badge>;
    }
  };

  const getSeverityBadge = (severity: Case["severity"]) => {
    const commonClasses = "w-[100px] justify-center font-semibold border";
    switch (severity) {
      case "Critical": return <Badge className={`bg-red-500/15 text-red-700 dark:text-red-400 border-red-500/30 hover:bg-red-500/25 flex items-center gap-1 ${commonClasses}`}><ShieldAlert className="w-3 h-3" /> Critical</Badge>;
      case "High": return <Badge className={`bg-orange-500/15 text-orange-700 dark:text-orange-400 border-orange-500/30 hover:bg-orange-500/25 flex items-center gap-1 ${commonClasses}`}><AlertTriangle className="w-3 h-3" /> High</Badge>;
      case "Medium": return <Badge className={`bg-yellow-500/15 text-yellow-700 dark:text-yellow-400 border-yellow-500/30 hover:bg-yellow-500/25 flex items-center gap-1 ${commonClasses}`}><AlertCircle className="w-3 h-3" /> Medium</Badge>;
      case "Low": return <Badge className={`bg-blue-500/15 text-blue-700 dark:text-blue-400 border-blue-500/30 hover:bg-blue-500/25 flex items-center gap-1 ${commonClasses}`}><Info className="w-3 h-3" /> Low</Badge>;
    }
  };

  const filteredCases = cases.filter((c) => {
    const matchesSearch =
      c.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.analyst.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.userName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter.length === 0 || statusFilter.includes(c.status);
    const matchesSeverity = severityFilter.length === 0 || severityFilter.includes(c.severity);

    // Check assignment filter
    const matchesAssignment = assignmentFilter.length === 0 ||
      (assignmentFilter.includes("Assigned") && c.analyst && c.analyst.trim() !== "") ||
      (assignmentFilter.includes("Unassigned") && (!c.analyst || c.analyst.trim() === ""));

    return matchesSearch && matchesStatus && matchesSeverity && matchesAssignment;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground tracking-tight">All Cases</h2>
          <p className="text-muted-foreground mt-1">Manage and track security incidents.</p>
        </div>
        <Button className="rounded-md">
          Auto Assign
        </Button>
      </div>

      {/* Search & Filter Bar */}
      <Card className="tech-card border-l-4 border-l-primary/50">
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by Case ID, Server ID, or Assigned Analyst..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Filter className="h-4 w-4" />
                  Filter
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {["Pending", "Active", "Solved"].map((status) => (
                  <DropdownMenuCheckboxItem
                    key={status}
                    checked={statusFilter.includes(status)}
                    onCheckedChange={(checked) => {
                      setStatusFilter(prev =>
                        checked ? [...prev, status] : prev.filter(s => s !== status)
                      );
                    }}
                  >
                    {status}
                  </DropdownMenuCheckboxItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuLabel>Filter by Severity</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {["Critical", "High", "Medium", "Low"].map((severity) => (
                  <DropdownMenuCheckboxItem
                    key={severity}
                    checked={severityFilter.includes(severity)}
                    onCheckedChange={(checked) => {
                      setSeverityFilter(prev =>
                        checked ? [...prev, severity] : prev.filter(s => s !== severity)
                      );
                    }}
                  >
                    {severity}
                  </DropdownMenuCheckboxItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuLabel>Filter by Assignment</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {["Assigned", "Unassigned"].map((assignment) => (
                  <DropdownMenuCheckboxItem
                    key={assignment}
                    checked={assignmentFilter.includes(assignment)}
                    onCheckedChange={(checked) => {
                      setAssignmentFilter(prev =>
                        checked ? [...prev, assignment] : prev.filter(a => a !== assignment)
                      );
                    }}
                  >
                    {assignment}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardContent>
      </Card>

      {/* Cases Table */}
      <Card className="tech-card border-l-4 border-l-primary/50">
        <CardHeader>
          <CardTitle>Cases List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border border-primary/20">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50 border-b-2 border-primary/20">
                  <TableHead className="text-center font-bold text-xs uppercase tracking-wider h-12 px-4 w-20">Pin</TableHead>
                  <TableHead className="text-center font-bold text-xs uppercase tracking-wider h-12 px-4 w-32">Case ID</TableHead>
                  <TableHead className="text-center font-bold text-xs uppercase tracking-wider h-12 px-4 w-40">Type</TableHead>
                  <TableHead className="text-center font-bold text-xs uppercase tracking-wider h-12 px-4 w-32">Status</TableHead>
                  <TableHead className="text-center font-bold text-xs uppercase tracking-wider h-12 px-4 w-32">Severity</TableHead>
                  <TableHead className="text-center font-bold text-xs uppercase tracking-wider h-12 px-4 w-40">Analyst</TableHead>
                  <TableHead className="text-center font-bold text-xs uppercase tracking-wider h-12 px-4 w-24">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCases.map((c) => (
                  <TableRow
                    key={c.id}
                    className="cursor-pointer hover:bg-primary/5 transition-colors border-b border-border/50"
                    onClick={() => navigate(`/cases/${c.id}`)}
                  >
                    <TableCell className="text-center align-middle h-16 px-4" onClick={(e) => e.stopPropagation()}>
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={(e) => togglePin(c.id, e)}>
                        <Star className={`h-4 w-4 ${pinnedCases.includes(c.id) ? "fill-yellow-500 text-yellow-500" : "text-muted-foreground"}`} />
                      </Button>
                    </TableCell>
                    <TableCell className="text-center font-bold text-primary font-mono tracking-tight align-middle h-16 px-4">{c.id}</TableCell>
                    <TableCell className="text-center font-medium text-sm align-middle h-16 px-4">{c.type}</TableCell>
                    <TableCell className="text-center align-middle h-16 px-4">
                      {getStatusBadge(c.status)}
                    </TableCell>
                    <TableCell className="text-center align-middle h-16 px-4">
                      {getSeverityBadge(c.severity)}
                    </TableCell>
                    <TableCell className="text-center text-sm align-middle h-16 px-4">
                      {c.analyst && c.analyst.trim() !== "" ? (
                        <div className="flex flex-col items-center gap-1">
                          <span className="font-medium">{c.analyst}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 text-xs text-muted-foreground hover:text-primary"
                            onClick={(e) => openAssignDialog(c.id, e)}
                          >
                            Change Analyst
                          </Button>
                        </div>
                      ) : (
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 text-xs gap-1"
                          onClick={(e) => openAssignDialog(c.id, e)}
                        >
                          <UserPlus className="h-3 w-3" />
                          Assign Analyst
                        </Button>
                      )}
                    </TableCell>
                    <TableCell className="text-center align-middle h-16 px-4">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <ArrowRight className="h-4 w-4 text-muted-foreground" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Assign Analyst Dialog */}
      <Dialog open={assignDialogOpen} onOpenChange={setAssignDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Assign Analyst</DialogTitle>
            <DialogDescription>
              Select an analyst to assign to {selectedCaseId}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2 py-4">
            {AVAILABLE_ANALYSTS.map((analyst) => (
              <div
                key={analyst}
                className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-sm font-semibold text-primary">
                      {analyst.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <span className="font-medium">{analyst}</span>
                </div>
                <Button
                  size="sm"
                  onClick={() => assignAnalyst(analyst)}
                  className="gap-1"
                >
                  <UserPlus className="h-3 w-3" />
                  Assign
                </Button>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
