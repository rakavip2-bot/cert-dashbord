import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Search, ArrowRight, History, Star, X, Mic,
  FileText, BookOpen, MessageSquare, AlertTriangle
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { MOCK_CASES, Case } from "./Cases";
import { MOCK_PLAYBOOKS, Playbook } from "./Playbooks";
import { MOCK_REPORTS, Report } from "./Reports";
import { MOCK_ALERTS, Alert, MOCK_MESSAGES, Message } from "./Alerts";

type SearchResult =
  | { type: 'case', data: Case }
  | { type: 'playbook', data: Playbook }
  | { type: 'report', data: Report }
  | { type: 'alert', data: Alert }
  | { type: 'message', data: Message };

export default function SearchPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [pinnedCases, setPinnedCases] = useState<string[]>([]);
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('recentSearches');
    if (saved) setRecentSearches(JSON.parse(saved));
    const pinned = localStorage.getItem('pinnedCases');
    if (pinned) setPinnedCases(JSON.parse(pinned));
  }, []);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    const query = searchQuery.toLowerCase();
    const newResults: SearchResult[] = [];

    // Search Cases
    MOCK_CASES.forEach(c => {
      if (
        c.id.toLowerCase().includes(query) ||
        c.userName.toLowerCase().includes(query) ||
        c.userEmail.toLowerCase().includes(query) ||
        c.type.toLowerCase().includes(query)
      ) {
        newResults.push({ type: 'case', data: c });
      }
    });

    // Search Playbooks
    MOCK_PLAYBOOKS.forEach(p => {
      if (p.title.toLowerCase().includes(query) || p.summary.toLowerCase().includes(query)) {
        newResults.push({ type: 'playbook', data: p });
      }
    });

    // Search Reports
    MOCK_REPORTS.forEach(r => {
      if (r.title.toLowerCase().includes(query) || r.user.toLowerCase().includes(query)) {
        newResults.push({ type: 'report', data: r });
      }
    });

    // Search Alerts & Messages
    MOCK_ALERTS.forEach(a => {
      if (a.title.toLowerCase().includes(query) || a.message.toLowerCase().includes(query)) {
        newResults.push({ type: 'alert', data: a });
      }
    });
    MOCK_MESSAGES.forEach(m => {
      if (m.content.toLowerCase().includes(query) || m.sender.toLowerCase().includes(query)) {
        newResults.push({ type: 'message', data: m });
      }
    });

    setResults(newResults);
  }, [searchQuery]);

  const handleSearch = (term: string) => {
    setSearchQuery(term);
    if (!recentSearches.includes(term)) {
      const newRecent = [term, ...recentSearches].slice(0, 5);
      setRecentSearches(newRecent);
      localStorage.setItem('recentSearches', JSON.stringify(newRecent));
    }
  };

  const togglePinCase = (caseId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newPinned = pinnedCases.includes(caseId)
      ? pinnedCases.filter(id => id !== caseId)
      : [...pinnedCases, caseId];
    setPinnedCases(newPinned);
    localStorage.setItem('pinnedCases', JSON.stringify(newPinned));
    toast.success(pinnedCases.includes(caseId) ? "Case unpinned" : "Case pinned");
  };

  const handleVoiceSearch = () => {
    setIsListening(!isListening);
    if (!isListening) {
      toast.info("Listening... (Voice search simulation)");
      setTimeout(() => {
        setSearchQuery("Phishing");
        setIsListening(false);
      }, 2000);
    }
  };

  const Highlight = ({ text }: { text: string }) => {
    if (!searchQuery) return <>{text}</>;
    const parts = text.split(new RegExp(`(${searchQuery})`, 'gi'));
    return (
      <>
        {parts.map((part, i) =>
          part.toLowerCase() === searchQuery.toLowerCase()
            ? <mark key={i} className="bg-yellow-200 dark:bg-yellow-800 rounded-sm px-0.5 text-foreground">{part}</mark>
            : part
        )}
      </>
    );
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center animate-in fade-in duration-500 max-w-6xl mx-auto py-8 px-4">

      {/* Header Section */}
      <div className="text-center space-y-4 mb-8 w-full">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Search Dashboard</h1>
        <p className="text-muted-foreground text-lg">Find cases, playbooks, reports, and more.</p>
      </div>

      {/* Main Search Bar */}
      <div className="w-full max-w-3xl relative z-20 mb-10">
        <div className="relative flex items-center bg-background rounded-full border-2 border-primary/20 shadow-lg hover:shadow-xl hover:border-primary/40 transition-all duration-300">
          <Search className="ml-6 h-5 w-5 text-muted-foreground" />
          <Input
            className="flex-1 border-0 bg-transparent h-14 px-4 text-lg placeholder:text-muted-foreground/50 focus-visible:ring-0 focus-visible:ring-offset-0"
            placeholder="Search anything..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            autoFocus
          />
          <div className="flex items-center pr-2 gap-1">
            {searchQuery && (
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-muted"
                onClick={() => setSearchQuery("")}
              >
                <X className="h-5 w-5 text-muted-foreground" />
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              className={`rounded-full hover:bg-muted ${isListening ? 'text-red-500 bg-red-50 dark:bg-red-900/20' : 'text-primary'}`}
              onClick={handleVoiceSearch}
            >
              <Mic className={`h-5 w-5 ${isListening ? 'animate-pulse' : ''}`} />
            </Button>
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-4 gap-8">

        {/* Left Sidebar: Recent & Pinned */}
        <div className="space-y-6 lg:col-span-1">
          {/* Recent Searches */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
              <History className="h-4 w-4" /> Recent
            </h3>
            <div className="flex flex-wrap gap-2">
              {recentSearches.length > 0 ? (
                recentSearches.map((term, i) => (
                  <Badge
                    key={i}
                    variant="secondary"
                    className="px-3 py-1.5 cursor-pointer hover:bg-primary/10 hover:text-primary transition-colors font-normal"
                    onClick={() => handleSearch(term)}
                  >
                    {term}
                  </Badge>
                ))
              ) : (
                <p className="text-sm text-muted-foreground italic">No recent searches</p>
              )}
            </div>
          </div>

          <Separator className="my-4" />

          {/* Pinned Cases */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
              <Star className="h-4 w-4" /> Pinned Cases
            </h3>
            <div className="space-y-2">
              {pinnedCases.length > 0 ? (
                pinnedCases.map((id) => (
                  <div
                    key={id}
                    className="flex items-center justify-between p-2 rounded-md border bg-card hover:bg-accent/50 transition-colors cursor-pointer group"
                    onClick={() => navigate(`/cases/${id}`)}
                  >
                    <span className="font-medium text-sm">{id}</span>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={(e) => togglePinCase(id, e)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground italic">No pinned cases</p>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Search Results */}
        <div className="lg:col-span-3">
          {searchQuery ? (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Results</h3>
                <Badge variant="outline">{results.length} found</Badge>
              </div>

              {results.length > 0 ? (
                <div className="grid gap-4">
                  {results.map((result, i) => (
                    <Card key={i} className="hover:shadow-md transition-all cursor-pointer border-l-4 border-l-transparent hover:border-l-primary" onClick={() => {
                      if (result.type === 'case') navigate(`/cases/${(result.data as Case).id}`);
                    }}>
                      <CardContent className="p-4 flex items-start gap-4">
                        <div className="mt-1 p-2 rounded-lg bg-muted/50">
                          {result.type === 'case' && <FileText className="h-5 w-5 text-blue-500" />}
                          {result.type === 'playbook' && <BookOpen className="h-5 w-5 text-green-500" />}
                          {result.type === 'report' && <FileText className="h-5 w-5 text-purple-500" />}
                          {(result.type === 'alert' || result.type === 'message') && <MessageSquare className="h-5 w-5 text-orange-500" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-semibold text-base truncate pr-4">
                              <Highlight text={
                                result.type === 'case' ? (result.data as Case).id :
                                  result.type === 'playbook' ? (result.data as Playbook).title :
                                    result.type === 'report' ? (result.data as Report).title :
                                      result.type === 'alert' ? (result.data as Alert).title :
                                        (result.data as Message).sender
                              } />
                            </h4>
                            <Badge variant="secondary" className="capitalize text-xs">{result.type}</Badge>
                          </div>
                          <p className="text-muted-foreground text-sm line-clamp-2">
                            <Highlight text={
                              result.type === 'case' ? `${(result.data as Case).type} - ${(result.data as Case).userName}` :
                                result.type === 'playbook' ? (result.data as Playbook).summary :
                                  result.type === 'report' ? `Report for ${(result.data as Report).caseId}` :
                                    result.type === 'alert' ? (result.data as Alert).message :
                                      (result.data as Message).content
                            } />
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 border border-dashed rounded-xl bg-muted/10">
                  <Search className="h-10 w-10 mx-auto mb-4 text-muted-foreground/30" />
                  <p className="text-lg font-medium text-muted-foreground">No matches found</p>
                  <p className="text-sm text-muted-foreground/80">Try adjusting your search terms</p>
                </div>
              )}
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-center p-10 text-muted-foreground/50 border border-dashed rounded-xl bg-muted/5">
              <div>
                <Search className="h-12 w-12 mx-auto mb-4 opacity-20" />
                <p>Start typing to search...</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Separator({ className }: { className?: string }) {
  return <div className={`h-[1px] w-full bg-border ${className}`} />;
}
