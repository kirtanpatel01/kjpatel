import { redirect } from "next/navigation";

export default function LegacyBlogsPage() {
  redirect("/blog");
}