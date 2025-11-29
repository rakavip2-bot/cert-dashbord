import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Download, Send, Eye, CheckCircle, Clock, AlertCircle, Mail } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export interface Report {
  id: string;
  caseId: string;
  user: string;
  status: "Sent" | "Pending" | "Draft";
  sentToUser: boolean;
  date: string;
  title: string;
}

export const MOCK_REPORTS: Report[] = [
  {
    id: "REP-2024-001",
    caseId: "CASE-101",
    user: "Alice Johnson",
    status: "Sent",
    sentToUser: true,
    date: "2024-03-10",
    title: "Phishing Analysis Report",
  },
  {
    id: "REP-2024-002",
    caseId: "CASE-105",
    user: "Bob Williams",
    status: "Pending",
    sentToUser: false,
    date: "2024-03-12",
    title: "Malware Containment Report",
  },
  {
    id: "REP-2024-003",
    caseId: "CASE-112",
    user: "Charlie Brown",
    status: "Draft",
    sentToUser: false,
    date: "2024-03-15",
    title: "Suspicious Activity Report",
  },
  {
    id: "REP-2024-004",
    caseId: "CASE-120",
    user: "David Miller",
    status: "Sent",
    sentToUser: true,
    date: "2024-03-14",
    title: "Data Leakage Assessment",
  },
  {
    id: "REP-2024-005",
    caseId: "CASE-125",
    user: "Eve Wilson",
    status: "Pending",
    sentToUser: false,
    date: "2024-03-16",
    title: "Ransomware Incident Report",
  },
];

export default function Reports() {
  const navigate = useNavigate();
  const [reports, setReports] = useState<Report[]>(MOCK_REPORTS);

  const handleSendReport = (reportId: string) => {
    setReports(prev => prev.map(report =>
      report.id === reportId ? { ...report, status: "Sent", sentToUser: true } : report
    ));
    toast.success(`Report ${reportId} sent to user successfully!`);
  };

  const handleDownloadReport = (reportId: string) => {
    toast.info(`Downloading report ${reportId}...`);
  };

  const getStatusBadge = (status: Report["status"]) => {
    const commonClasses = "w-28 justify-center py-1";
    switch (status) {
      case "Sent":
        return <Badge className={`bg-green-500/15 text-green-500 hover:bg-green-500/25 border-green-500/20 ${commonClasses}`}><CheckCircle className="w-3 h-3 mr-1" /> Sent</Badge>;
      case "Pending":
        return <Badge className={`bg-yellow-500/15 text-yellow-500 hover:bg-yellow-500/25 border-yellow-500/20 ${commonClasses}`}><Clock className="w-3 h-3 mr-1" /> Pending</Badge>;
      case "Draft":
        return <Badge variant="secondary" className={commonClasses}><AlertCircle className="w-3 h-3 mr-1" /> Draft</Badge>;
    }
  };

  const ReportsTable = ({ data }: { data: Report[] }) => (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="text-center font-bold">Case ID</TableHead>
            <TableHead className="text-center font-bold">User</TableHead>
            <TableHead className="text-center font-bold">Status</TableHead>
            <TableHead className="text-center font-bold">Sent to User</TableHead>
            <TableHead className="text-center font-bold">Download PDF</TableHead>
            <TableHead className="text-center font-bold">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                No reports found.
              </TableCell>
            </TableRow>
          ) : (
            data.map((report) => (
              <TableRow key={report.id} className="group hover:bg-muted/5">
                <TableCell className="font-medium text-center">{report.caseId}</TableCell>
                <TableCell className="text-center">{report.user}</TableCell>
                <TableCell className="text-center">
                  <div className="flex justify-center">
                    {getStatusBadge(report.status)}
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex justify-center items-center gap-2">
                    {report.sentToUser ? (
                      <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">Yes</Badge>
                    ) : (
                      <Badge variant="outline" className="text-muted-foreground">No</Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-2"
                    onClick={() => handleDownloadReport(report.id)}
                  >
                    <Download className="h-4 w-4" />
                    Download
                  </Button>
                </TableCell>
                <TableCell className="text-center">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigate(`/reports/${report.id}`)}
                  >
                    Edit / View
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground tracking-tight">Reports</h2>
          <p className="text-muted-foreground mt-1">Manage and distribute case resolution reports.</p>
        </div>
        <div className="p-2 bg-primary/10 rounded-full">
          <FileText className="h-6 w-6 text-primary" />
        </div>
      </div>

      <Card className="border-border/50 shadow-sm">
        <CardHeader>
          <CardTitle>All Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-4">
              <TabsTrigger value="all">All Reports</TabsTrigger>
              <TabsTrigger value="sent">Sent</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="draft">Drafts</TabsTrigger>
            </TabsList>
            <TabsContent value="all">
              <ReportsTable data={reports} />
            </TabsContent>
            <TabsContent value="sent">
              <ReportsTable data={reports.filter(r => r.status === "Sent")} />
            </TabsContent>
            <TabsContent value="pending">
              <ReportsTable data={reports.filter(r => r.status === "Pending")} />
            </TabsContent>
            <TabsContent value="draft">
              <ReportsTable data={reports.filter(r => r.status === "Draft")} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
