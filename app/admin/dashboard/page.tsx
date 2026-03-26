"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2, Edit, Plus, LogOut, Video as VideoIcon, Building2 } from "lucide-react";

interface Video {
  _id: string;
  title: string;
  date: string;
  tag: string;
  imageUrl: string;
  youtubeId?: string;
  description?: string;
  featured: boolean;
}

interface Company {
  _id: string;
  slug: string;
  tag: string;
  title: string;
  subtitle: string;
  excerpt: string;
  imageUrl: string;
  body: string[];
  websiteUrl?: string;
  partneringSince?: string;
}

type TabType = "videos" | "companies";

export default function AdminDashboard() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabType>("videos");
  const [videos, setVideos] = useState<Video[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: "",
    date: "",
    tag: "20VC",
    imageUrl: "",
    youtubeId: "",
    description: "",
    featured: false,
  });

  const [companyFormData, setCompanyFormData] = useState({
    slug: "",
    tag: "",
    title: "",
    subtitle: "",
    excerpt: "",
    imageUrl: "",
    body: [""],
    websiteUrl: "",
    partneringSince: "",
  });

  const getPreviewImage = () => {
    if (formData.imageUrl) return formData.imageUrl;
    if (formData.youtubeId) {
      const patterns = [
        /(?:youtube\.com\/watch\?v=)([^&\n?#]+)/,
        /(?:youtu\.be\/)([^&\n?#]+)/,
        /(?:youtube\.com\/embed\/)([^&\n?#]+)/,
      ];
      
      let videoId = formData.youtubeId.trim();
      for (const pattern of patterns) {
        const match = videoId.match(pattern);
        if (match) {
          videoId = match[1];
          break;
        }
      }
      
      return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
    }
    return null;
  };

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (authenticated) {
      if (activeTab === "videos") {
        fetchVideos();
      } else {
        fetchCompanies();
      }
    }
  }, [activeTab, authenticated]);

  const checkAuth = async () => {
    try {
      const res = await fetch("/api/auth/verify");
      if (res.ok) {
        setAuthenticated(true);
        fetchVideos();
        fetchCompanies();
      } else {
        router.push("/admin/login");
      }
    } catch {
      router.push("/admin/login");
    } finally {
      setLoading(false);
    }
  };

  const fetchVideos = async () => {
    try {
      const res = await fetch("/api/videos");
      const data = await res.json();
      setVideos(data.videos || []);
    } catch (error) {
      console.error("Failed to fetch videos:", error);
    }
  };

  const fetchCompanies = async () => {
    try {
      const res = await fetch("/api/companies");
      const data = await res.json();
      setCompanies(data.companies || []);
    } catch (error) {
      console.error("Failed to fetch companies:", error);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const url = editingId ? `/api/videos/${editingId}` : "/api/videos";
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setShowForm(false);
        setEditingId(null);
        resetForm();
        fetchVideos();
      }
    } catch (error) {
      console.error("Failed to save video:", error);
    }
  };

  const handleCompanySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const url = editingId ? `/api/companies/${editingId}` : "/api/companies";
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(companyFormData),
      });

      const data = await res.json();

      if (res.ok) {
        setShowForm(false);
        setEditingId(null);
        resetCompanyForm();
        fetchCompanies();
      } else {
        alert(data.error || "Failed to save company");
      }
    } catch (error) {
      console.error("Failed to save company:", error);
    }
  };

  const handleEdit = (video: Video) => {
    setFormData({
      title: video.title,
      date: video.date,
      tag: video.tag,
      imageUrl: video.imageUrl,
      youtubeId: video.youtubeId || "",
      description: video.description || "",
      featured: video.featured,
    });
    setEditingId(video._id);
    setShowForm(true);
  };

  const handleEditCompany = (company: Company) => {
    setCompanyFormData({
      slug: company.slug,
      tag: company.tag,
      title: company.title,
      subtitle: company.subtitle,
      excerpt: company.excerpt,
      imageUrl: company.imageUrl,
      body: company.body,
      websiteUrl: company.websiteUrl || "",
      partneringSince: company.partneringSince || "",
    });
    setEditingId(company._id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this video?")) return;

    try {
      const res = await fetch(`/api/videos/${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchVideos();
      }
    } catch (error) {
      console.error("Failed to delete video:", error);
    }
  };

  const handleDeleteCompany = async (id: string) => {
    if (!confirm("Are you sure you want to delete this company?")) return;

    try {
      const res = await fetch(`/api/companies/${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchCompanies();
      }
    } catch (error) {
      console.error("Failed to delete company:", error);
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      date: "",
      tag: "20VC",
      imageUrl: "",
      youtubeId: "",
      description: "",
      featured: false,
    });
  };

  const resetCompanyForm = () => {
    setCompanyFormData({
      slug: "",
      tag: "",
      title: "",
      subtitle: "",
      excerpt: "",
      imageUrl: "",
      body: [""],
      websiteUrl: "",
      partneringSince: "",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!authenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <Button onClick={handleLogout} variant="outline" size="sm">
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>

        <div className="flex gap-2 mb-6 border-b border-gray-200">
          <button
            onClick={() => {
              setActiveTab("videos");
              setShowForm(false);
              setEditingId(null);
            }}
            className={`px-6 py-3 font-medium text-sm flex items-center gap-2 border-b-2 transition-colors ${
              activeTab === "videos"
                ? "border-black text-black"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            <VideoIcon className="w-4 h-4" />
            Videos
          </button>
          <button
            onClick={() => {
              setActiveTab("companies");
              setShowForm(false);
              setEditingId(null);
            }}
            className={`px-6 py-3 font-medium text-sm flex items-center gap-2 border-b-2 transition-colors ${
              activeTab === "companies"
                ? "border-black text-black"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            <Building2 className="w-4 h-4" />
            Companies
          </button>
        </div>

        <div className="mb-6">
          <Button
            onClick={() => {
              setShowForm(!showForm);
              setEditingId(null);
              if (activeTab === "videos") {
                resetForm();
              } else {
                resetCompanyForm();
              }
            }}
          >
            <Plus className="w-4 h-4 mr-2" />
            {showForm ? "Cancel" : `Add New ${activeTab === "videos" ? "Video" : "Company"}`}
          </Button>
        </div>

        {activeTab === "videos" && showForm && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>{editingId ? "Edit Video" : "Add New Video"}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Title</label>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Date</label>
                    <Input
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      placeholder="Mar 5, 2026"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Tag</label>
                    <Input
                      value={formData.tag}
                      onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Image URL (optional)</label>
                  <Input
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    placeholder="Leave empty to use YouTube thumbnail"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    If empty and YouTube ID provided, will auto-use YouTube thumbnail
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">YouTube URL or ID</label>
                  <Input
                    value={formData.youtubeId}
                    onChange={(e) => setFormData({ ...formData, youtubeId: e.target.value })}
                    placeholder="https://youtube.com/watch?v=... or dQw4w9WgXcQ"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Paste full YouTube URL or just the video ID
                  </p>
                </div>

                {getPreviewImage() && (
                  <div>
                    <label className="block text-sm font-medium mb-2">Preview</label>
                    <div className="w-full max-w-md aspect-video bg-gray-100 rounded overflow-hidden">
                      <img
                        src={getPreviewImage()!}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium mb-2">Description (optional)</label>
                  <textarea
                    className="w-full border rounded-md p-2 min-h-[100px]"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  />
                  <label htmlFor="featured" className="text-sm font-medium">
                    Featured Video
                  </label>
                </div>

                <div className="flex gap-2">
                  <Button type="submit">
                    {editingId ? "Update Video" : "Create Video"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setShowForm(false);
                      setEditingId(null);
                      resetForm();
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {activeTab === "companies" && showForm && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>{editingId ? "Edit Company" : "Add New Company"}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCompanySubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Title</label>
                    <Input
                      value={companyFormData.title}
                      onChange={(e) => setCompanyFormData({ ...companyFormData, title: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Slug (URL)</label>
                    <Input
                      value={companyFormData.slug}
                      onChange={(e) => setCompanyFormData({ ...companyFormData, slug: e.target.value })}
                      placeholder="company-name"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Tag</label>
                  <Input
                    value={companyFormData.tag}
                    onChange={(e) => setCompanyFormData({ ...companyFormData, tag: e.target.value })}
                    placeholder="FINTECH, SEMICONDUCTOR, etc."
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Subtitle</label>
                  <Input
                    value={companyFormData.subtitle}
                    onChange={(e) => setCompanyFormData({ ...companyFormData, subtitle: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Excerpt</label>
                  <Input
                    value={companyFormData.excerpt}
                    onChange={(e) => setCompanyFormData({ ...companyFormData, excerpt: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Image URL</label>
                  <Input
                    value={companyFormData.imageUrl}
                    onChange={(e) => setCompanyFormData({ ...companyFormData, imageUrl: e.target.value })}
                    placeholder="https://..."
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Body Paragraphs</label>
                  {companyFormData.body.map((paragraph, idx) => (
                    <div key={idx} className="mb-2 flex gap-2">
                      <textarea
                        className="flex-1 border rounded-md p-2 min-h-[80px]"
                        value={paragraph}
                        onChange={(e) => {
                          const newBody = [...companyFormData.body];
                          newBody[idx] = e.target.value;
                          setCompanyFormData({ ...companyFormData, body: newBody });
                        }}
                        placeholder={`Paragraph ${idx + 1}`}
                      />
                      {companyFormData.body.length > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="icon-sm"
                          onClick={() => {
                            const newBody = companyFormData.body.filter((_, i) => i !== idx);
                            setCompanyFormData({ ...companyFormData, body: newBody });
                          }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setCompanyFormData({ ...companyFormData, body: [...companyFormData.body, ""] });
                    }}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Paragraph
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Website URL (optional)</label>
                    <Input
                      value={companyFormData.websiteUrl}
                      onChange={(e) => setCompanyFormData({ ...companyFormData, websiteUrl: e.target.value })}
                      placeholder="https://company.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Partnering Since (optional)</label>
                    <Input
                      value={companyFormData.partneringSince}
                      onChange={(e) => setCompanyFormData({ ...companyFormData, partneringSince: e.target.value })}
                      placeholder="2024"
                    />
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button type="submit">
                    {editingId ? "Update Company" : "Create Company"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setShowForm(false);
                      setEditingId(null);
                      resetCompanyForm();
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {activeTab === "videos" && (
          <div className="grid gap-4">
            {videos.map((video) => (
              <Card key={video._id}>
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <div className="w-32 h-20 bg-gray-200 rounded overflow-hidden shrink-0">
                      <img
                        src={video.imageUrl}
                        alt={video.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-mono text-gray-500">{video.tag}</span>
                            <span className="text-xs text-gray-400">{video.date}</span>
                            {video.featured && (
                              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">
                                Featured
                              </span>
                            )}
                          </div>
                          <h3 className="font-semibold text-lg mb-1">{video.title}</h3>
                          {video.youtubeId && (
                            <p className="text-sm text-gray-500">YouTube: {video.youtubeId}</p>
                          )}
                        </div>

                        <div className="flex gap-2">
                          <Button
                            size="icon-sm"
                            variant="outline"
                            onClick={() => handleEdit(video)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            size="icon-sm"
                            variant="destructive"
                            onClick={() => handleDelete(video._id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {videos.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                No videos yet. Add your first video!
              </div>
            )}
          </div>
        )}

        {activeTab === "companies" && (
          <div className="grid gap-4">
            {companies.map((company) => (
              <Card key={company._id}>
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <div className="w-32 h-20 bg-gray-200 rounded overflow-hidden shrink-0">
                      <img
                        src={company.imageUrl}
                        alt={company.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-mono text-gray-500">{company.tag}</span>
                            <span className="text-xs text-gray-400">/{company.slug}</span>
                          </div>
                          <h3 className="font-semibold text-lg mb-1">{company.title}</h3>
                          <p className="text-sm text-gray-600">{company.subtitle}</p>
                        </div>

                        <div className="flex gap-2">
                          <Button
                            size="icon-sm"
                            variant="outline"
                            onClick={() => handleEditCompany(company)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            size="icon-sm"
                            variant="destructive"
                            onClick={() => handleDeleteCompany(company._id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {companies.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                No companies yet. Add your first company!
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
