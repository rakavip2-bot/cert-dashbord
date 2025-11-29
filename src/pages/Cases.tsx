```javascript
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
  status: "Pending" | "In Progress" | "Solved";
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
    status: "In Progress",
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
    status: "In Progress",
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
    status: "In Progress",
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
    switch (status) {
      case "Solved": return <Badge variant="outline" className="text-green-500 border-green-500 flex w-fit items-center gap-1"><CheckCircle className="w-3 h-3" /> Solved</Badge>;
      case "In Progress": return <Badge variant="outline" className="text-blue-500 border-blue-500 flex w-fit items-center gap-1"><Clock className="w-3 h-3" /> In Progress</Badge>;
      case "Pending": return <Badge variant="outline" className="text-yellow-500 border-yellow-500 flex w-fit items-center gap-1"><AlertCircle className="w-3 h-3" /> Pending</Badge>;
    }
  };

  const getSeverityBadge = (severity: Case["severity"]) => {
    switch (severity) {
      case "Critical": return <Badge variant="destructive" className="flex w-fit items-center gap-1"><ShieldAlert className="w-3 h-3" /> Critical</Badge>;
      case "High": return <Badge className="bg-orange-500 hover:bg-orange-600 flex w-fit items-center gap-1"><AlertTriangle className="w-3 h-3" /> High</Badge>;
      case "Medium": return <Badge className="bg-yellow-500 hover:bg-yellow-600 flex w-fit items-center gap-1"><AlertCircle className="w-3 h-3" /> Medium</Badge>;
      case "Low": return <Badge className="bg-blue-500 hover:bg-blue-600 flex w-fit items-center gap-1"><Info className="w-3 h-3" /> Low</Badge>;
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
          <p className="text-muted-foreground mt-1">Manage and track all security incidents.</p>
        </div>
        <div className="flex items-center gap-2">
           <Button variant="outline" className="gap-2">
            <Filter className="w-4 h-4" />
            Advanced Filters
          </Button>
          <Button className="gap-2 shadow-lg shadow-primary/20">
            <Folder className="w-4 h-4" />
            Export Cases
          </Button>
        </div>
      </div>

      <Card className="border-t-4 border-t-primary shadow-md">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Folder className="h-5 w-5 text-primary" />
              Case List
            </CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search cases..."
                  className="pl-9 w-[250px] bg-background/50"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              {/* Filter Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {["Pending", "In Progress", "Solved"].map((status) => (
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
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="text-center font-bold">Case ID</TableHead>
                  <TableHead className="text-center font-bold">Server ID</TableHead>
                  <TableHead className="text-center font-bold">Severity</TableHead>
                  <TableHead className="text-center font-bold">Status</TableHead>
                  <TableHead className="text-center font-bold">Deadline/SLA</TableHead>
                  <TableHead className="text-center font-bold">Assigned Analyst</TableHead>
                  <TableHead className="text-center font-bold">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCases.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                      No cases found matching the criteria.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredCases.map((item) => (
                    <TableRow key={item.id} className="group hover:bg-muted/5">
                      <TableCell className="font-medium text-center">{item.id}</TableCell>
                      <TableCell className="text-center text-muted-foreground">{item.serverId}</TableCell>
                      <TableCell className="text-center">
                        <div className="flex justify-center">
                          {getSeverityBadge(item.severity)}
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex justify-center">
                          {getStatusBadge(item.status)}
                        </div>
                      </TableCell>
                      <TableCell className="text-center">{item.deadline}</TableCell>
                      <TableCell className="text-center">{item.analyst}</TableCell>
                      <TableCell className="text-center">
                        <div className="flex justify-center">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="gap-2 group-hover:text-primary transition-colors"
                            onClick={() => navigate(`/ cases / ${ item.id } `)}
                          >
                            View
                            <ArrowRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
