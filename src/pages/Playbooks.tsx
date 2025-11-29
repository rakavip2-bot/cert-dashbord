import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BookOpen, Eye, ArrowRight, CheckCircle, Clock, AlertCircle, XCircle, PlayCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export interface Playbook {
  id: string;
  caseId: string;
  title: string;
  summary: string;
  status: "Not Used" | "In-progress" | "Applied" | "Rejected";
  date: string;
}

export const MOCK_PLAYBOOKS: Playbook[] = [
  {
    id: "PB-2024-001",
    caseId: "CASE-101",
    title: "Phishing Response Protocol",
    summary: "Steps to isolate and remediate phishing attacks.",
    status: "Applied",
    date: "2024-03-10",
  },
  {
    id: "PB-2024-002",
    caseId: "CASE-105",
    title: "Malware Containment Steps",
    summary: "Procedures for containing malware spread.",
    status: "In-progress",
    date: "2024-03-12",
  },
  {
    id: "PB-2024-003",
    caseId: "CASE-112",
    title: "Suspicious Login Investigation",
    summary: "Guide for investigating anomalous logins.",
    status: "Not Used",
    date: "2024-03-14",
  },
  {
    id: "PB-2024-004",
    caseId: "CASE-120",
    title: "Data Leakage Mitigation",
    summary: "Actions to stop and assess data exfiltration.",
    status: "Rejected",
    date: "2024-03-15",
  },
  {
    id: "PB-2024-005",
    caseId: "CASE-125",
    title: "Ransomware First Response",
    summary: "Immediate actions for ransomware detection.",
    status: "Not Used",
    date: "2024-03-16",
  },
  {
    id: "PB-2024-006",
    caseId: "CASE-128",
    title: "DDoS Mitigation Strategy",
    summary: "Steps to mitigate active DDoS attacks.",
    status: "In-progress",
    date: "2024-03-17",
  },
  {
    id: "PB-2024-007",
    caseId: "CASE-130",
    title: "Insider Threat Investigation",
    summary: "Protocol for handling internal security risks.",
    status: "Applied",
    date: "2024-03-18",
  },
  {
    id: "PB-2024-008",
    caseId: "CASE-135",
    title: "Cloud Storage Misconfiguration",
    summary: "Remediation for exposed cloud buckets.",
    status: "Not Used",
    date: "2024-03-19",
  },
  {
    id: "PB-2024-009",
    caseId: "CASE-140",
    title: "Unauthorized Access Attempt",
    summary: "Analyzing and blocking unauthorized access.",
    status: "Rejected",
    date: "2024-03-20",
  },
  {
    id: "PB-2024-010",
    caseId: "CASE-142",
    title: "SQL Injection Response",
    summary: "Handling web application attacks.",
    status: "In-progress",
    date: "2024-03-21",
  },
  {
    id: "PB-2024-011",
    caseId: "CASE-145",
    title: "Zero-Day Vulnerability Patching",
    summary: "Emergency patching for critical vulnerabilities.",
    status: "Not Used",
    date: "2024-03-22",
  },
  {
    id: "PB-2024-012",
    caseId: "CASE-150",
    title: "Social Engineering Analysis",
    summary: "Investigating social engineering attempts.",
    status: "Applied",
    date: "2024-03-23",
  },
];

export default function Playbooks() {
  const navigate = useNavigate();

  const getStatusBadge = (status: Playbook["status"]) => {
    const commonClasses = "w-28 justify-center py-1";
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

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground tracking-tight">AI Playbooks</h2>
          <p className="text-muted-foreground mt-1">Automated response guides for active cases.</p>
        </div>
        <div className="p-2 bg-primary/10 rounded-full">
          <BookOpen className="h-6 w-6 text-primary" />
        </div>
      </div>

      <Card className="border-border/50 shadow-sm">
        <CardHeader>
          <CardTitle>All Playbooks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="text-center font-bold">Playbook ID</TableHead>
                  <TableHead className="text-center font-bold">Title</TableHead>
                  <TableHead className="text-center font-bold">Case ID</TableHead>
                  <TableHead className="text-center font-bold">Summary</TableHead>
                  <TableHead className="text-center font-bold">Date</TableHead>
                  <TableHead className="text-center font-bold">Status</TableHead>
                  <TableHead className="text-center font-bold">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {MOCK_PLAYBOOKS.map((playbook) => (
                  <TableRow key={playbook.id} className="group hover:bg-muted/5">
                    <TableCell className="font-medium text-center">{playbook.id}</TableCell>
                    <TableCell className="text-center">{playbook.title}</TableCell>
                    <TableCell className="text-center text-muted-foreground">{playbook.caseId}</TableCell>
                    <TableCell className="text-center text-muted-foreground max-w-xs truncate" title={playbook.summary}>{playbook.summary}</TableCell>
                    <TableCell className="text-center">{playbook.date}</TableCell>
                    <TableCell className="text-center">
                      <div className="flex justify-center">
                        {getStatusBadge(playbook.status)}
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex justify-center">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="gap-2 group-hover:text-primary transition-colors"
                          onClick={() => navigate(`/playbooks/${playbook.id}`)}
                        >
                          View
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
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
