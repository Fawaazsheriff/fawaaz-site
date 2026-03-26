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
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <Button onClick={handleLogout} variant="outline" size="sm">
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>

        {/* Tabs */}
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

        {/* Add Button */}
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

        {/* Forms */}
        {activeTab === "videos" ? renderVideoForm() : renderCompanyForm()}

        {/* Content Lists */}
        {activeTab === "videos" ? renderVideosList() : renderCompaniesList()}
      </div>
    </div>
  );

  function renderVideoForm() {
    if (!showForm) return null;

    return (