"use client";

import { useEffect, useCallback } from "react";
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { syncUser } from "@/lib/api";

export default function AuthHeader() {
  const { user, isLoaded } = useUser();

  const handleSyncUser = useCallback(async () => {
    if (!user || !isLoaded) return;

    try {
      await syncUser(
        user.id,
        user.emailAddresses[0]?.emailAddress || "",
        user.username || user.firstName || "user",
        user.fullName || user.firstName || "User"
      );
    } catch (error) {
      console.error("Failed to sync user:", error);
    }
  }, [user, isLoaded]);

  useEffect(() => {
    if (user && isLoaded) {
      handleSyncUser();
    }
  }, [user, isLoaded, handleSyncUser]);

  return (
    <>
      <SignedOut>
        <SignInButton mode="modal">
          <button className="text-sm font-medium text-primary hover:underline">
            Sign In
          </button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        {user && (
          <Link
            href={`/profile/${user.username || user.firstName || "user"}`}
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Profile
          </Link>
        )}
        <UserButton afterSignOutUrl="/" />
      </SignedIn>
    </>
  );
}
