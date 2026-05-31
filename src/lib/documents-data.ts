export type DocumentItem = {
  id: string;
  title: string;
  equipment: string;
  category: string;
  fileType: string;
  size: string;
  owner: string;
  status: string;
  uploaded: string;
  description: string;
};

export const initialDocuments: DocumentItem[] = [
  {
    id: "DOC-1001",
    title: "Main Engine Manual.pdf",
    equipment: "Main Engine Alpha",
    category: "Manual",
    fileType: "PDF",
    size: "4.8 MB",
    owner: "Bethel Hillary",
    status: "Approved",
    uploaded: "May 31, 2026",
    description: "Technical manual for main engine operation, inspection, and maintenance procedures.",
  },
  {
    id: "DOC-1002",
    title: "Cooling Pump Inspection Report.docx",
    equipment: "Cooling Pump Delta",
    category: "Inspection Report",
    fileType: "DOCX",
    size: "1.2 MB",
    owner: "Team Alpha",
    status: "Review",
    uploaded: "May 30, 2026",
    description:
      "Inspection report covering vibration readings, bearing checks, and pump alignment observations.",
  },
  {
    id: "DOC-1003",
    title: "Fuel Purifier Certificate.pdf",
    equipment: "Fuel Purifier Gamma",
    category: "Certificate",
    fileType: "PDF",
    size: "860 KB",
    owner: "Marine Ops",
    status: "Approved",
    uploaded: "May 28, 2026",
    description: "Service certification and operational approval for fuel purifier maintenance records.",
  },
  {
    id: "DOC-1004",
    title: "Generator Load Test.xlsx",
    equipment: "Aux Generator Beta",
    category: "Test Record",
    fileType: "XLSX",
    size: "540 KB",
    owner: "Power Team",
    status: "Approved",
    uploaded: "May 27, 2026",
    description: "Load test values, voltage stability records, and generator performance table.",
  },
  {
    id: "DOC-1005",
    title: "Bilge Pump Fault Images.zip",
    equipment: "Bilge Water Pump",
    category: "Images",
    fileType: "ZIP",
    size: "8.4 MB",
    owner: "Safety Team",
    status: "Review",
    uploaded: "May 26, 2026",
    description:
      "Field images from bilge pump inspection showing strainer condition and discharge line checks.",
  },
  {
    id: "DOC-1006",
    title: "Monthly Maintenance Summary.pdf",
    equipment: "All Equipment",
    category: "Maintenance Report",
    fileType: "PDF",
    size: "2.1 MB",
    owner: "MarineMind AI",
    status: "AI Generated",
    uploaded: "May 25, 2026",
    description:
      "AI-generated summary of monthly maintenance activities, alerts, and equipment health status.",
  },
];

export const documentCategoryOptions = [
  "All",
  "Manual",
  "Inspection Report",
  "Certificate",
  "Test Record",
  "Images",
  "Maintenance Report",
] as const;

export const documentStatusOptions = ["All", "Approved", "Review", "AI Generated", "Archived"] as const;

export const documentFileTypeOptions = ["All", "PDF", "DOCX", "XLSX", "ZIP", "PNG", "JPG"] as const;

export const documentEquipmentOptions = [
  "Main Engine Alpha",
  "Cooling Pump Delta",
  "Fuel Purifier Gamma",
  "Aux Generator Beta",
  "Bilge Water Pump",
  "All Equipment",
];

export const documentActionChecklist = [
  "Preview document",
  "Attach to equipment record",
  "Use for AI maintenance context",
  "Export document summary",
];

export const documentCategoryHighlights = [
  { title: "Manuals", text: "Technical guides and equipment procedures", icon: "FileText" as const },
  { title: "Certificates", text: "Approved service and safety documents", icon: "FileCheck2" as const },
  { title: "Inspection Reports", text: "Field reports and maintenance findings", icon: "ClipboardList" as const },
  { title: "Images", text: "Inspection photos and visual evidence", icon: "FileImage" as const },
];

export const documentInsight =
  "Attach manuals and inspection reports to equipment records so the AI Assistant can give better maintenance guidance later.";
