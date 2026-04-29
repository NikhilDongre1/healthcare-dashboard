import { useCallback, useEffect, useState } from "react";
import { useUIStore } from "@/store/uiStore";

type PermissionState = "default" | "granted" | "denied";

interface TriggerOptions {
  title: string;
  body: string;
  tag?: string;
  inApp?: boolean;
  type?: "info" | "success" | "warning" | "error";
}

export function useNotification() {
  const addNotification = useUIStore((s) => s.addNotification);
  const [permission, setPermission] = useState<PermissionState>(
    typeof Notification !== "undefined"
      ? (Notification.permission as PermissionState)
      : "default",
  );
  const [swReady, setSwReady] = useState(false);

  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;

    navigator.serviceWorker
      .register("/sw.js", { scope: "/" })
      .then((reg) => {
        console.info("[SW] Registered:", reg.scope);
        setSwReady(true);
      })
      .catch((err) => {
        console.warn("[SW] Registration failed:", err);
      });
  }, []);

  const requestPermission = useCallback(async (): Promise<PermissionState> => {
    if (!("Notification" in window)) return "denied";
    if (Notification.permission === "granted") {
      setPermission("granted");
      return "granted";
    }
    const result = await Notification.requestPermission();
    setPermission(result as PermissionState);
    return result as PermissionState;
  }, []);

  const trigger = useCallback(
    async (opts: TriggerOptions) => {
      const { title, body, tag, inApp = true, type = "info" } = opts;

      if (inApp) {
        addNotification({
          title,
          message: body,
          timestamp: new Date().toISOString(),
          type,
        });
      }

      if (Notification.permission !== "granted") return;

      try {
        if (swReady && navigator.serviceWorker.controller) {
          navigator.serviceWorker.controller.postMessage({
            type: "SHOW_NOTIFICATION",
            payload: { title, body, tag },
          });
        } else {
          new Notification(title, {
            body,
            icon: "/favicon.ico",
            tag,
          });
        }
      } catch (err) {
        console.warn("[Notification] Failed to show:", err);
      }
    },
    [swReady, addNotification],
  );

  return { permission, swReady, requestPermission, trigger };
}
