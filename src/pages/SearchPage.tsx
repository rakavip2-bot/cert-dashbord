import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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
import {
  Search, ArrowRight, User, Mail, FileText, AlertTriangle,
  BookOpen, MessageSquare, History, Star, Save, X, Mic
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
  const [showSuggestions, setShowSuggestions] = useState(false);
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
      setShowSuggestions(false);
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
    setShowSuggestions(true);
  }, [searchQuery]);

  const handleSearch = (term: string) => {
    setSearchQuery(term);
    if (!recentSearches.includes(term)) {
      const newRecent = [term, ...recentSearches].slice(0, 5);
      setRecentSearches(newRecent);
      localStorage.setItem('recentSearches', JSON.stringify(newRecent));
    }
    setShowSuggestions(false);
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
            ? <mark key={i} className="bg-yellow-200 rounded-sm px-0.5">{part}</mark>
            : part
        )}
      </>
    );
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center animate-in fade-in duration-500 max-w-5xl mx-auto py-10">

      {/* Header Section */}
      <div className="text-center space-y-4 mb-10">
        <h1 className="text-4xl font-bold tracking-tight text-foreground">What are you looking for?</h1>
        <p className="text-muted-foreground text-lg">Search across cases, playbooks, reports, and messages.</p>
      </div>

      {/* Main Search Bar */}
      <div className="w-full max-w-2xl relative z-20 mb-12">
        <div className="relative group">
          <div className={`absolute -inset-0.5 bg-gradient-to-r from-primary to-blue-600 rounded-full blur opacity-20 group-hover:opacity-40 transition duration-1000 ${isListening ? 'opacity-60 animate-pulse' : ''}`}></div>
          <div className="relative flex items-center bg-background rounded-full border shadow-lg hover:shadow-xl transition-all duration-300">
            <Search className="ml-6 h-6 w-6 text-muted-foreground" />
            <Input
              className="flex-1 border-0 bg-transparent h-16 px-4 text-lg focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-muted-foreground/50"
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
                className={`rounded-full hover:bg-muted ${isListening ? 'text-red-500 bg-red-50' : 'text-primary'}`}
                onClick={handleVoiceSearch}
              >
                <Mic className={`h-5 w-5 ${isListening ? 'animate-pulse' : ''}`} />
              </Button>
            </div>
          </div>
        </div>

        {/* Suggestions Dropdown - REMOVED to prevent obscuring results */}
      </div>

      {/* Content Grid */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Left Column: Recent & Pinned */}
        <div className="space-y-6">
          {/* Recent Searches */}
          <Card className="border-none shadow-none bg-transparent">
            <CardHeader className="px-0 pt-0">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <History className="h-5 w-5 text-muted-foreground" />
                Recent Searches
              </CardTitle>
            </CardHeader>
            <CardContent className="px-0">
              <div className="flex flex-wrap gap-2">
                {recentSearches.length > 0 ? (
                  recentSearches.map((term, i) => (
                    <Badge
                      key={i}
                      variant="secondary"
                      className="px-3 py-1.5 cursor-pointer hover:bg-secondary/80 transition-colors text-sm font-normal"
                      onClick={() => handleSearch(term)}
                    >
                      {term}
                    </Badge>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">No recent searches</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Pinned Cases */}
          <Card className="border-none shadow-none bg-transparent">
            <CardHeader className="px-0">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Star className="h-5 w-5 text-muted-foreground" />
                Pinned Cases
              </CardTitle>
            </CardHeader>
            <CardContent className="px-0 space-y-3">
              {pinnedCases.length > 0 ? (
                pinnedCases.map((id) => (
                  <div key={id} className="flex items-center justify-between p-3 rounded-lg border bg-card hover:shadow-sm transition-all group">
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-2 rounded-full bg-blue-500" />
                      <span className="font-medium">{id}</span>
                    </div>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => navigate(`/cases/${id}`)}>
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="ghost" className="h-8 w-8 text-muted-foreground hover:text-destructive" onClick={(e) => togglePinCase(id, e)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">Pin cases for quick access</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Search Results */}
        <div className="lg:col-span-2">
          {searchQuery ? (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Search Results</h3>
                <Badge variant="outline">{results.length} found</Badge>
              </div>

              {results.length > 0 ? (
                results.map((result, i) => (
                  <Card key={i} className="hover:shadow-md transition-all cursor-pointer group border-l-4 border-l-transparent hover:border-l-primary" onClick={() => {
                    if (result.type === 'case') navigate(`/cases/${(result.data as Case).id}`);
                  }}>
                    <CardContent className="p-4 flex items-start gap-4">
                      <div className="mt-1 p-2 rounded-lg bg-muted group-hover:bg-primary/10 transition-colors">
                        {result.type === 'case' && <FileText className="h-5 w-5 text-blue-500" />}
                        {result.type === 'playbook' && <BookOpen className="h-5 w-5 text-green-500" />}
                        {result.type === 'report' && <FileText className="h-5 w-5 text-purple-500" />}
                        {(result.type === 'alert' || result.type === 'message') && <MessageSquare className="h-5 w-5 text-orange-500" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-semibold text-lg truncate pr-4">
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
                        <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
                          <Highlight text={
                            result.type === 'case' ? `${(result.data as Case).type} - ${(result.data as Case).userName}` :
                              result.type === 'playbook' ? (result.data as Playbook).summary :
                                result.type === 'report' ? `Report for ${(result.data as Report).caseId}` :
                                  result.type === 'alert' ? (result.data as Alert).message :
                                    (result.data as Message).content
                          } />
                        </p>

                        {/* Action Buttons */}
                        <div className="flex gap-2 transition-opacity">
                          {result.type === 'case' && (
                            <>
                              <Button size="sm" variant="outline" className="h-8 text-xs" onClick={(e) => {
                                e.stopPropagation();
                                navigate(`/cases/${(result.data as Case).id}`);
                              }}>
                                Open Case
                              </Button>
                              <Button size="sm" variant="ghost" className="h-8 w-8 p-0" onClick={(e) => togglePinCase((result.data as Case).id, e)}>
                                <Star className={`h-4 w-4 ${pinnedCases.includes((result.data as Case).id) ? "fill-yellow-500 text-yellow-500" : "text-muted-foreground"}`} />
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="text-center py-12 border-2 border-dashed rounded-xl">
                  <Search className="h-12 w-12 mx-auto mb-4 text-muted-foreground/30" />
                  <p className="text-lg font-medium text-muted-foreground">No results found</p>
                  <p className="text-sm text-muted-foreground/80">Try adjusting your search terms</p>
                </div>
              )}
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-center p-10 text-muted-foreground/50 border-2 border-dashed rounded-xl">
              <div>
                <Search className="h-16 w-16 mx-auto mb-4 opacity-20" />
                <p>Search results will appear here</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
