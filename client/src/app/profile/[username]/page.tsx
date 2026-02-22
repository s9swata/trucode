"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { fetchUserProfile, type UserProfile } from "@/lib/api";

export default function ProfilePage() {
  const params = useParams();
  const username = params?.username as string;
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!username) return;

    async function loadProfile() {
      try {
        const data = await fetchUserProfile(username);
        setProfile(data);
      } catch (err) {
        console.error("Failed to fetch profile:", err);
        setError("User not found");
      } finally {
        setLoading(false);
      }
    }
    loadProfile();
  }, [username]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-muted-foreground">Loading profile...</p>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-red-500">{error || "User not found"}</p>
      </div>
    );
  }

  const { user, stats } = profile;

  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <h1 className="text-3xl font-semibold">{user.username}</h1>
        <p className="text-muted-foreground">{user.full_name}</p>
        <p className="text-sm text-muted-foreground">{user.email}</p>
        <p className="text-sm text-muted-foreground">
          Member since {new Date(user.createdAt).toLocaleDateString()}
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <p className="text-sm font-medium text-muted-foreground">
              Total Submissions
            </p>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{stats.totalSubmissions}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <p className="text-sm font-medium text-muted-foreground">
              Accepted
            </p>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-600">
              {stats.acceptedSubmissions}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <p className="text-sm font-medium text-muted-foreground">
              Acceptance Rate
            </p>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{stats.acceptanceRate}%</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <p className="text-sm font-medium text-muted-foreground">Aura</p>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <p className="text-2xl font-bold">{stats.aura}</p>
              <Badge variant="secondary" className="rounded-full">
                points
              </Badge>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
