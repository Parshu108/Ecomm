"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [status, setStatus] = useState("verifying"); // verifying | success | error
  const [message, setMessage] = useState("");

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token) {
        setStatus("error");
        setMessage("Verification token is missing");
        return;
      }

      try {
        const res = await fetch("/api/users/verifyemail", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });

        const data = await res.json();

        if (!res.ok) {
          setStatus("error");
          setMessage(data.error || "Verification failed or token expired");
          return;
        }

        setStatus("success");
        setMessage("Your email address has been verified successfully!");
      } catch (err) {
        setStatus("error");
        setMessage("Something went wrong, please try again later.");
      }
    };

    verifyEmail();
  }, [token]);

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: "#000000" }}
    >
      <div className="w-full max-w-md">
        <div
          className="rounded-2xl p-8 text-center shadow-sm"
          style={{
            backgroundColor: "#001B38",
            border: "1px solid rgba(149, 215, 222, 0.15)",
          }}
        >
          {status === "verifying" && (
            <>
              <div
                className="mx-auto mb-5 h-10 w-10 animate-spin rounded-full border-4"
                style={{
                  borderColor: "rgba(149, 215, 222, 0.2)",
                  borderTopColor: "#95D7DE",
                }}
              />
              <h1
                className="text-2xl font-semibold mb-2"
                style={{ color: "#FFFFFF" }}
              >
                Verifying your email...
              </h1>
              <p className="text-sm" style={{ color: "#A0A0A0" }}>
                Please wait a moment while we process your request.
              </p>
            </>
          )}

          {status === "success" && (
            <>
              <div
                className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full"
                style={{
                  backgroundColor: "rgba(16, 185, 129, 0.15)",
                  border: "1px solid #10B981",
                }}
              >
                <svg
                  className="h-7 w-7 text-emerald-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h1
                className="text-2xl font-semibold mb-2"
                style={{ color: "#FFFFFF" }}
              >
                Email verified!
              </h1>
              <p className="text-sm mb-6" style={{ color: "#A0A0A0" }}>
                {message}
              </p>
              <Link
                href="/login"
                className="inline-block w-full rounded-lg px-4 py-2.5 text-sm font-medium transition text-center"
                style={{
                  backgroundColor: "#95D7DE",
                  color: "#000000",
                }}
              >
                Proceed to Log in
              </Link>
            </>
          )}

          {status === "error" && (
            <>
              <div
                className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full"
                style={{
                  backgroundColor: "rgba(239, 68, 68, 0.15)",
                  border: "1px solid #EF4444",
                }}
              >
                <svg
                  className="h-7 w-7 text-red-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
              <h1
                className="text-2xl font-semibold mb-2"
                style={{ color: "#FFFFFF" }}
              >
                Verification failed
              </h1>
              <p className="text-sm mb-6" style={{ color: "#A0A0A0" }}>
                {message}
              </p>
              <div className="space-y-3">
                <Link
                  href="/register"
                  className="inline-block w-full rounded-lg px-4 py-2.5 text-sm font-medium transition text-center"
                  style={{
                    backgroundColor: "#95D7DE",
                    color: "#000000",
                  }}
                >
                  Back to Sign up
                </Link>
                <Link
                  href="/login"
                  className="inline-block w-full rounded-lg px-4 py-2 text-sm font-medium transition text-center"
                  style={{ color: "#A0A0A0" }}
                >
                  Go to Log in
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense
      fallback={
        <div
          className="min-h-screen flex items-center justify-center"
          style={{ backgroundColor: "#000000" }}
        >
          <div
            className="h-10 w-10 animate-spin rounded-full border-4"
            style={{
              borderColor: "rgba(149, 215, 222, 0.2)",
              borderTopColor: "#95D7DE",
            }}
          />
        </div>
      }
    >
      <VerifyEmailContent />
    </Suspense>
  );
}
