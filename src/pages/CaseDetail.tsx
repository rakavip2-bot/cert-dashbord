import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, Clock, Play, FileText, Send, Star, AlertTriangle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

export default function CaseDetail() {
  const { id } = useParams();
  const [isPinned, setIsPinned] = useState(false);

  useEffect(() => {
    const pinned = JSON.parse(localStorage.getItem('pinnedCases') || '[]');
    if (id && pinned.includes(id)) {
      setIsPinned(true);
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

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-3xl font-bold text-foreground">Case {id || "Detail"}</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={togglePin}
            className="text-muted-foreground hover:text-yellow-500"
          >
            <Star className={`h-6 w-6 ${isPinned ? "fill-yellow-500 text-yellow-500" : ""}`} />
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-lg py-1 px-3 border-orange-500 text-orange-500 bg-orange-500/10">
            <AlertTriangle className="w-4 h-4 mr-2" />
            High Severity
          </Badge>
          <Badge variant="secondary" className="text-lg py-1 px-3">Status: In Progress</Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="md:col-span-2 space-y-6">
          {/* Case Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Case Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-sm text-muted-foreground">Case Type</h4>
                  <p className="text-lg">Phishing Attack</p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-muted-foreground">Assigned Analyst</h4>
                  <p className="text-lg">John Doe</p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-muted-foreground">Detected On</h4>
                  <p className="text-lg">Mar 10, 2024 - 09:42 AM</p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-muted-foreground">SLA Deadline</h4>
                  <p className="text-lg text-red-500 font-medium">4 Hours Remaining</p>
                </div>
              </div>
              <Separator />
              <div>
                <h4 className="font-semibold text-sm text-muted-foreground mb-2">Description</h4>
                <p className="leading-relaxed">
                  User reported receiving a suspicious email claiming to be from IT support asking for password reset.
                  Header analysis indicates external origin. Potential credential harvesting attempt.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* User Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                User Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div>
                  <p className="font-medium">Alice Johnson</p>
                  <p className="text-sm text-muted-foreground">alice.j@company.com</p>
                </div>
                <Button variant="outline" size="sm">View Profile</Button>
              </div>
            </CardContent>
          </Card>

          {/* Similar Cases */}
          <Card>
            <CardHeader>
              <CardTitle>Similar Cases</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {[
                { id: "CASE-098", title: "Suspicious Login Attempt", match: 92, status: "Solved" },
                { id: "CASE-085", title: "Multiple Failed Logins", match: 78, status: "Solved" },
                { id: "CASE-072", title: "Brute Force Attack", match: 65, status: "Pending" },
              ].map((similar) => (
                <div key={similar.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-medium hover:underline cursor-pointer text-primary">{similar.id}</span>
                      <span className="text-muted-foreground hidden sm:inline">- {similar.title}</span>
                    </div>
                    <Badge variant={similar.status === "Solved" ? "default" : "secondary"}>{similar.status}</Badge>
                  </div>
                  <div className="flex items-center gap-3">
                    <Progress value={similar.match} className="h-2" />
                    <span className={`text-sm font-bold w-12 text-right ${similar.match > 80 ? "text-green-600" : similar.match > 60 ? "text-yellow-600" : "text-muted-foreground"}`}>
                      {similar.match}%
                    </span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Actions */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full gap-2" variant="default">
                <Play className="h-4 w-4" /> Run Playbook
              </Button>
              <Button className="w-full gap-2" variant="secondary">
                <Send className="h-4 w-4" /> Message User
              </Button>
              <Button className="w-full gap-2" variant="outline">
                <Clock className="h-4 w-4" /> Extend SLA
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea placeholder="Add internal notes..." className="min-h-[150px]" />
              <Button className="w-full mt-4" size="sm">Save Note</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
