import React, { useEffect, useMemo, useState, useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Linking,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  supabase,
  fetchMessages as sbFetchMessages,
  Message,
  GroupedMessages,
} from "../../supabase";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";

const parseDayLabelToDate = (label: string): Date | null => {
  try {
    const parts = label.split(",").map((s) => s.trim());
    if (parts.length < 2) return null;

    const dayNumMonth = parts[1];
    const [dayStr, monthStr] = dayNumMonth.split(" ").map((s) => s.trim());
    const dayNum = parseInt(dayStr, 10);
    if (Number.isNaN(dayNum)) return null;

    const currentYear = new Date().getFullYear();
    const dt = new Date(`${monthStr} ${dayNum}, ${currentYear} 00:00:00`);
    return isNaN(dt.getTime()) ? null : dt;
  } catch {
    return null;
  }
};

const parseTimeToMinutes = (timeStr: string): number => {
  const s = timeStr.replace(/\./g, ":").trim().toLowerCase();
  const m = s.match(/^(\d{1,2})(?::(\d{1,2}))?\s*(am|pm)?$/i);
  if (!m) return Number.MAX_SAFE_INTEGER;

  let hours = parseInt(m[1], 10);
  const minutes = m[2] ? parseInt(m[2], 10) : 0;
  const suffix = m[3];

  if (suffix === "am") {
    if (hours === 12) hours = 0;
  } else if (suffix === "pm") {
    if (hours !== 12) hours += 12;
  }

  return hours * 60 + minutes;
};

const renderTextWithLinks = (text: string) => {
  const urlRe = /\b((?:https?:\/\/|www\.)[^\s]+)/gi;
  const phoneRe = /\b(\+?\d[\d\s\-]{7,}\d)\b/g;

  const parts: (string | { type: "url" | "phone"; value: string })[] = [];
  let lastIndex = 0;

  const combinedRe = new RegExp(`${urlRe.source}|${phoneRe.source}`, "gi");
  let match;

  while ((match = combinedRe.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }

    const value = match[0];
    const isUrl = new RegExp(urlRe).test(value);
    parts.push({ type: isUrl ? "url" : "phone", value });

    lastIndex = combinedRe.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return (
    <Text style={styles.messageText}>
      {parts.map((part, idx) => {
        if (typeof part === "string") {
          return <Text key={idx}>{part}</Text>;
        }

        if (part.type === "url") {
          const href = part.value.startsWith("http")
            ? part.value
            : `https://${part.value}`;
          return (
            <Text
              key={idx}
              style={styles.linkText}
              onPress={() => Linking.openURL(href)}
            >
              {part.value}
            </Text>
          );
        }

        if (part.type === "phone") {
          const tel = part.value.replace(/[\s\-]/g, "");
          return (
            <Text
              key={idx}
              style={styles.phoneText}
              onPress={() => Linking.openURL(`tel:${tel}`)}
            >
              {part.value}
            </Text>
          );
        }
      })}
    </Text>
  );
};

const MPESAScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await sbFetchMessages();
        setMessages(data);
      } catch (err) {
        Alert.alert("Error", "Failed to fetch messages");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    if (!loading && scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: false });
    }
  }, [loading]);

  const grouped: GroupedMessages = useMemo(() => {
    return messages.reduce((acc: GroupedMessages, m) => {
      if (!acc[m.day]) acc[m.day] = [];
      acc[m.day].push(m);
      return acc;
    }, {});
  }, [messages]);

  const sortedDayKeys = useMemo(() => {
    return Object.keys(grouped).sort((a, b) => {
      const da = parseDayLabelToDate(a)?.getTime() ?? 0;
      const db = parseDayLabelToDate(b)?.getTime() ?? 0;
      return da - db;
    });
  }, [grouped]);

  const getSortedMessagesForDay = (day: string) => {
    const list = grouped[day] ?? [];
    return [...list].sort((m1, m2) => {
      const t1 = parseTimeToMinutes(m1.time);
      const t2 = parseTimeToMinutes(m2.time);
      return t1 - t2;
    });
  };

  const renderMessage = (message: Message) => (
    <View key={message.id} style={{ marginBottom: 16 }}>
      <View style={styles.messageCard}>
        <View style={styles.messageContent}>
          {renderTextWithLinks(message.content)}
        </View>
      </View>
      <Text style={styles.timeText}>{message.time}</Text>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top + 20 }]}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="chevron-back-outline" size={24} color="#FFFFFF" />
        </TouchableOpacity>

        <View style={styles.headerCenter}>
          <View style={styles.avatarContainer}>
            <Ionicons name="person" size={20} color="#E8F5FD" />
          </View>
          <Text style={styles.headerTitle}>MPESA</Text>
        </View>

        <TouchableOpacity style={styles.trashButton}>
          <Ionicons name="trash-outline" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={[styles.content, styles.centered]}>
          <Text style={styles.loadingText}>Loading messages...</Text>
        </View>
      ) : (
        <ScrollView
          ref={scrollViewRef}
          style={styles.content}
          showsVerticalScrollIndicator={false}
        >
          {sortedDayKeys.map((day) => (
            <View key={day}>
              <Text style={styles.dayHeader}>{day}</Text>
              {getSortedMessagesForDay(day).map(renderMessage)}
            </View>
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000000" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#000000",
  },
  backButton: { padding: 4 },
  headerCenter: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginLeft: 12,
  },
  avatarContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#6BBFEF",
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "400",
    marginLeft: 12,
  },
  trashButton: { padding: 4 },

  content: { flex: 1, backgroundColor: "#171717", paddingHorizontal: 16 },
  centered: { justifyContent: "center", alignItems: "center" },
  loadingText: { color: "#FFFFFF", fontSize: 16 },

  dayHeader: {
    color: "#888888",
    fontSize: 14,
    textAlign: "center",
    marginVertical: 2,
    marginBottom: 10,
  },
  messageCard: {
    backgroundColor: "#173631",
    borderRadius: 12,
    padding: 12,
    marginBottom: 0,
    alignSelf: "flex-start",
    maxWidth: "85%",
  },
  messageContent: { marginBottom: 4 },
  messageText: { color: "#FFFFFF", fontSize: 18, lineHeight: 20 },
  linkText: { color: "#927B65", fontSize: 18, lineHeight: 20 },
  phoneText: {
    color: "#927B65",
    fontSize: 18,
    lineHeight: 20,
    textDecorationLine: "underline",
  },
  timeText: {
    color: "#888888",
    fontSize: 12,
    alignSelf: "flex-end",
    marginTop: 0,
    bottom: 22,
  },
});

export default MPESAScreen;
