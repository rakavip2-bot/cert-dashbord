
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Download, Send, Sparkles, Eye, Mail, Globe, ArrowLeft, Save, FileText } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { useNavigate, useParams } from "react-router-dom";


export default function ReportEditor() {
  const navigate = useNavigate();
  const { id } = useParams();

  // In a real app, fetch report data based on ID
  // For now, using mock data based on report ID
  const getReportData = (reportId: string | undefined) => {
    const reportMap: Record<string, { caseId: string; caseName: string; analyst: string; isAssigned: boolean; isSubmitted: boolean }> = {
      "REP-2024-001": { caseId: "CASE-101", caseName: "Phishing Attack Investigation", analyst: "John Doe", isAssigned: true, isSubmitted: true },
      "REP-2024-002": { caseId: "CASE-105", caseName: "Malware Containment", analyst: "Jane Smith", isAssigned: true, isSubmitted: false },
      "REP-2024-003": { caseId: "CASE-112", caseName: "Suspicious Activity Report", analyst: "Not Assigned", isAssigned: false, isSubmitted: false },
      "REP-2024-004": { caseId: "CASE-120", caseName: "Data Leakage Assessment", analyst: "Rachel Green", isAssigned: true, isSubmitted: true },
      "REP-2024-005": { caseId: "CASE-125", caseName: "Ransomware Incident Report", analyst: "Not Assigned", isAssigned: false, isSubmitted: false },
    };
    return reportMap[reportId || ""] || { caseId: "CASE-101", caseName: "Phishing Attack Investigation", analyst: "John Doe", isAssigned: true, isSubmitted: true };
  };

  const reportData = getReportData(id);
  const isReportSubmitted = reportData.isSubmitted;
  const isAssigned = reportData.isAssigned;

  const handleSendEmail = () => {
    toast.success("Report sent to user successfully!");
  };

  const handleDownloadPDF = () => {
    toast.success("Downloading Report PDF...");
  };

  const handleSaveDraft = () => {
    toast.success("Draft saved successfully.");
  };

  const handlePreview = () => {
    toast.info("Opening PDF preview...");
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate("/reports")}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1">
          <h2 className="text-3xl font-bold text-foreground tracking-tight">Report</h2>
        </div>
      </div>

      {/* Case and Analyst Information */}
      <Card className="border-l-4 border-l-primary/50">
        <CardContent className="pt-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-semibold text-muted-foreground mb-1">Case Name</h4>
              <p className="text-lg font-medium">{reportData.caseName} - {reportData.caseId}</p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-muted-foreground mb-1">Analyst</h4>
              <p className="text-lg font-medium">{reportData.analyst}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-6">
        {/* Timeline */}
        <Card className="border-l-4 border-l-primary/50">
          <CardHeader>
            <CardTitle>Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative pl-6">
              {/* Vertical Line */}
              <div className="absolute left-2 top-0 bottom-0 w-0.5 bg-border"></div>

              <div className="space-y-6">
                <div className="relative">
                  <div className="absolute -left-[26px] w-3 h-3 rounded-full bg-blue-500 border-4 border-background"></div>
                  <div>
                    <p className="text-sm font-semibold">Case Registered</p>
                    <p className="text-xs text-muted-foreground mt-1">March 10, 2024 at 09:42 AM</p>
                  </div>
                </div>

                {isAssigned ? (
                  <>
                    <div className="relative">
                      <div className="absolute -left-[26px] w-3 h-3 rounded-full bg-orange-500 border-4 border-background"></div>
                      <div>
                        <p className="text-sm font-semibold">Case Assigned to Analyst</p>
                        <p className="text-xs text-muted-foreground mt-1">March 10, 2024 at 10:00 AM - Assigned to {reportData.analyst}</p>
                      </div>
                    </div>

                    {isReportSubmitted ? (
                      <div className="relative">
                        <div className="absolute -left-[26px] w-3 h-3 rounded-full bg-green-500 border-4 border-background"></div>
                        <div>
                          <p className="text-sm font-semibold">Report Submitted to User</p>
                          <p className="text-xs text-muted-foreground mt-1">March 10, 2024 at 02:30 PM</p>
                        </div>
                      </div>
                    ) : (
                      <div className="relative">
                        <div className="absolute -left-[26px] w-3 h-3 rounded-full bg-gray-400 border-4 border-background"></div>
                        <div>
                          <p className="text-sm font-semibold text-muted-foreground">Report Not Yet Submitted</p>
                          <p className="text-xs text-muted-foreground mt-1">Pending submission</p>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="relative">
                    <div className="absolute -left-[26px] w-3 h-3 rounded-full bg-gray-400 border-4 border-background"></div>
                    <div>
                      <p className="text-sm font-semibold text-muted-foreground">Case Not Yet Assigned</p>
                      <p className="text-xs text-muted-foreground mt-1">Waiting for analyst assignment</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Analyst Final Report or Not Submitted Message */}
        {isReportSubmitted ? (
          <Card className="border-border/50 shadow-sm">
            <CardHeader>
              <CardTitle>Analyst Final Report</CardTitle>
              <CardDescription>Final report submitted to the user.</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Enter your final resolution..."
                className="min-h-[400px] font-mono text-sm resize-y"
                readOnly
                defaultValue={`REPORT SUMMARY
--------------------------------------------------
  Case ID: CASE - 12345
Issue: Phishing Attempt

RESOLUTION DETAILS
--------------------------------------------------
  We have investigated the reported email and confirmed it was a phishing attempt.

Actions Taken:
- The sender domain has been blocked.
- No sensitive data was compromised.
- Workstation scanned and cleared.

TECHNICAL FINDINGS
--------------------------------------------------
  Origin IP: 192.168.x.x(Blocked)
Payload: Credential Harvester

NEXT STEPS FOR USER
--------------------------------------------------
  1. Please reset your password immediately.
2. Be cautious of similar emails in the future.
3. Complete the assigned security training module.

  Regards,
  Security Operations Center`}
              />
              <div className="flex justify-end mt-4">
                <Button
                  variant="outline"
                  className="gap-2"
                  onClick={handleDownloadPDF}
                >
                  <Download className="h-4 w-4" />
                  Download Report as PDF
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="border-border/50 shadow-sm">
            <CardContent className="pt-6">
              <div className="text-center py-12">
                <div className="h-20 w-20 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
                  <FileText className="h-10 w-10 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Report Not Submitted</h3>
                <p className="text-muted-foreground">
                  The analyst has not yet submitted the final report for this case.
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

    </div>
  );
}
