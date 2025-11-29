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
import { useNavigate, useSearchParams } from "react-router-dom";
import { Folder, Search, Eye, Clock, CheckCircle, AlertCircle, ArrowRight, AlertTriangle, ShieldAlert, Info, Filter, Star } from "lucide-react";
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
    analyst: "Jane Smith",
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
    analyst: "Mike Ross",
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
    analyst: "Harvey Specter",
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
    analyst: "Louis Litt",
    userName: "Grace Hopper",
    userEmail: "grace.h@company.com",
    type: "Unauthorized Access",
  },
];

export default function Cases() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  const [severityFilter, setSeverityFilter] = useState<string[]>([]);
  const [pinnedCases, setPinnedCases] = useState<string[]>([]);

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

  const getStatusBadge = (status: Case["status"]) => {
    const commonClasses = "w-[100px] justify-center";
    switch (status) {
      case "Solved": return <Badge variant="outline" className={`text-green-500 border-green-500 flex items-center gap-1 ${commonClasses}`}><CheckCircle className="w-3 h-3" /> Solved</Badge>;
      case "Active": return <Badge variant="outline" className={`text-blue-500 border-blue-500 flex items-center gap-1 ${commonClasses}`}><Clock className="w-3 h-3" /> Active</Badge>;
      case "Pending": return <Badge variant="outline" className={`text-yellow-500 border-yellow-500 flex items-center gap-1 ${commonClasses}`}><AlertCircle className="w-3 h-3" /> Pending</Badge>;
    }
  };

  const getSeverityBadge = (severity: Case["severity"]) => {
    const commonClasses = "w-[100px] justify-center";
    switch (severity) {
      case "Critical": return <Badge variant="destructive" className={`flex items-center gap-1 ${commonClasses}`}><ShieldAlert className="w-3 h-3" /> Critical</Badge>;
      case "High": return <Badge className={`bg-orange-500 hover:bg-orange-600 flex items-center gap-1 ${commonClasses}`}><AlertTriangle className="w-3 h-3" /> High</Badge>;
      case "Medium": return <Badge className={`bg-yellow-500 hover:bg-yellow-600 flex items-center gap-1 ${commonClasses}`}><AlertCircle className="w-3 h-3" /> Medium</Badge>;
      case "Low": return <Badge className={`bg-blue-500 hover:bg-blue-600 flex items-center gap-1 ${commonClasses}`}><Info className="w-3 h-3" /> Low</Badge>;
    }
  };

  const filteredCases = MOCK_CASES.filter((c) => {
    const matchesSearch =
      c.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.analyst.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.userName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter.length === 0 || statusFilter.includes(c.status);
    const matchesSeverity = severityFilter.length === 0 || severityFilter.includes(c.severity);

    return matchesSearch && matchesStatus && matchesSeverity;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground tracking-tight">All Cases</h2>
          <p className="text-muted-foreground mt-1">Manage and track security incidents.</p>
        </div>
        <div className="p-2 bg-primary/10 rounded-full">
          <Folder className="h-6 w-6 text-primary" />
        </div>
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
                <TableRow className="bg-muted/50">
                  <TableHead className="text-center font-bold">Pin</TableHead>
                  <TableHead className="font-bold">Case ID</TableHead>
                  <TableHead className="font-bold">Server ID</TableHead>
                  <TableHead className="font-bold">Type</TableHead>
                  <TableHead className="text-center font-bold">Status</TableHead>
                  <TableHead className="text-center font-bold">Severity</TableHead>
                  <TableHead className="font-bold">Deadline</TableHead>
                  <TableHead className="font-bold">Analyst</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCases.map((c) => (
                  <TableRow
                    key={c.id}
                    className="cursor-pointer hover:bg-muted/50 transition-colors"
                    onClick={() => navigate(`/cases/${c.id}`)}
                  >
                    <TableCell className="text-center" onClick={(e) => e.stopPropagation()}>
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={(e) => togglePin(c.id, e)}>
                        <Star className={`h-4 w-4 ${pinnedCases.includes(c.id) ? "fill-yellow-500 text-yellow-500" : "text-muted-foreground"}`} />
                      </Button>
                    </TableCell>
                    <TableCell className="font-medium text-primary font-mono tracking-tight">{c.id}</TableCell>
                    <TableCell>{c.serverId}</TableCell>
                    <TableCell>{c.type}</TableCell>
                    <TableCell className="text-center">
                      <div className="flex justify-center">
                        {getStatusBadge(c.status)}
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex justify-center">
                        {getSeverityBadge(c.severity)}
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-xs">{c.deadline}</TableCell>
                    <TableCell>{c.analyst}</TableCell>
                    <TableCell className="text-right">
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
    </div>
  );
}
