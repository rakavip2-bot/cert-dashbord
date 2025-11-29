
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Download, Send, Sparkles, Eye, Mail, Globe, ArrowLeft, Save } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

export default function ReportEditor() {
  const navigate = useNavigate();

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
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate("/reports")}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-foreground tracking-tight">Report Editor</h2>
            <p className="text-muted-foreground mt-1">Review AI suggestions and finalize the resolution report.</p>
          </div>
          <div className="flex gap-2">
            <Badge variant="outline" className="px-3 py-1">Case #12345</Badge>
            <Badge variant="secondary" className="px-3 py-1">Draft</Badge>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          {/* AI Suggested Resolution */}
          <Card className="border-primary/20 bg-primary/5 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-primary">
                <Sparkles className="h-5 w-5 animate-pulse" />
                AI Suggested Resolution
              </CardTitle>
              <CardDescription>Generated based on case analysis and playbook execution.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-background/50 p-4 rounded-md border border-primary/10 text-sm leading-relaxed space-y-3">
                <div>
                  <strong className="text-primary/90 block mb-1">Issue Summary</strong>
                  <p>Phishing attempt detected via email. User reported suspicious link.</p>
                </div>
                <div>
                  <strong className="text-primary/90 block mb-1">Actions Taken</strong>
                  <ul className="list-disc list-inside pl-2 text-muted-foreground">
                    <li>Analyzed email headers for origin IP.</li>
                    <li>Scanned attachment for malware signatures.</li>
                    <li>Blocked sender domain on the email gateway.</li>
                  </ul>
                </div>
                <div>
                  <strong className="text-primary/90 block mb-1">Technical Explanation</strong>
                  <p>The email contained a malicious payload targeting CVE-2024-XXXX. The sender IP 192.168.x.x is a known bad actor.</p>
                </div>
                <div>
                  <strong className="text-primary/90 block mb-1">Threat Description</strong>
                  <p>Credential harvesting campaign targeting financial data.</p>
                </div>
                <div>
                  <strong className="text-primary/90 block mb-1">Final Advice</strong>
                  <p>User should reset their password and complete security awareness training.</p>
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <Button variant="secondary" size="sm" className="text-xs">
                  Apply to Final Resolution
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Analyst Final Resolution */}
          <Card className="border-border/50 shadow-sm">
            <CardHeader>
              <CardTitle>Analyst Final Resolution</CardTitle>
              <CardDescription>Edit the final message that will be sent to the user.</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Enter your final resolution..."
                className="min-h-[400px] font-mono text-sm resize-y"
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
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          {/* Actions */}
          <Card className="border-border/50 shadow-sm sticky top-6">
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full justify-start gap-2" onClick={handlePreview}>
                <Eye className="h-4 w-4" />
                Preview PDF
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2" onClick={handleSaveDraft}>
                <Save className="h-4 w-4" />
                Save Draft
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2" onClick={handleDownloadPDF}>
                <Download className="h-4 w-4" />
                Download PDF
              </Button>
              <Separator />
              <Button className="w-full justify-start gap-2" onClick={handleSendEmail}>
                <Send className="h-4 w-4" />
                Send to User
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

