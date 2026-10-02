export type ReportContent = {
  id: string;
  IDtarget: string;
  reporter: string;
  target: string;
  reason: string;
  created_at: string;
  status: "pending" | "approved";
  target_type: "account" | "post" | "orther";
};

export type ReportContentProps = {
  reports: ReportContent[];
};

export type ReportRequestDTO = {
  targetType?: string | null;
  targetId?: string | null;
  reason: string;
};
