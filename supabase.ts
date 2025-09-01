import "react-native-url-polyfill/auto";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "";
const SUPABASE_ANON_KEY =
  "";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: false,
  },
});

export type Message = {
  id: string;
  content: string;
  day: string; // e.g. "Monday, 4 August"
  time: string; // e.g. "6.00 am" or "7:05 pm"
  created_at: string; // timestamptz
};

export type GroupedMessages = Record<string, Message[]>;

export async function fetchMessages(): Promise<Message[]> {
  // Select explicitly; include created_at for stable ordering
  const { data, error } = await supabase
    .from("messages")
    .select("id, content, day, time, created_at")
    .order("created_at", { ascending: true });

  if (error) {
    console.error("[Supabase] fetchMessages error:", error);
    throw error;
  }

  return data ?? [];
}
