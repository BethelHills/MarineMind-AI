import {
  ClipboardList,
  File,
  FileArchive,
  FileCheck2,
  FileImage,
  FileText,
  type LucideIcon,
} from "lucide-react";

export function documentStatusStyle(status: string) {
  const styles: Record<string, string> = {
    Approved: "bg-emerald-500/15 text-emerald-700 border-emerald-200",
    Review: "bg-amber-500/15 text-amber-700 border-amber-200",
    "AI Generated": "bg-violet-500/15 text-violet-700 border-violet-200",
    Archived: "bg-slate-500/10 text-slate-700 border-slate-200",
  };
  return styles[status] ?? "bg-slate-500/10 text-slate-700 border-slate-200";
}

export function documentFileIcon(fileType: string): LucideIcon {
  if (fileType === "PDF") return FileText;
  if (fileType === "DOCX") return ClipboardList;
  if (fileType === "XLSX") return FileCheck2;
  if (fileType === "ZIP") return FileArchive;
  if (fileType === "PNG" || fileType === "JPG") return FileImage;
  return File;
}
