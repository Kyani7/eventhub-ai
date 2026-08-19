import { useState, useRef, useEffect } from "react";
import { Html5Qrcode } from "html5-qrcode";
import {
  ScanLine,
  CheckCircle2,
  Camera,
  CameraOff,
  Search,
  UserCheck,
  AlertTriangle,
} from "lucide-react";

type Attendee = {
  id: string;
  name: string;
  email: string;
  event: string;
  checkedIn: boolean;
};

const seedAttendees: Attendee[] = [
  { id: "GA-014", name: "Kyani Dan Rai", email: "kyani@iic.edu.np", event: "AI & Robotics Summit", checkedIn: true },
  { id: "GA-015", name: "Anisha Rai", email: "anisha@iic.edu.np", event: "AI & Robotics Summit", checkedIn: true },
  { id: "GA-016", name: "Bibek Thapa", email: "bibek@iic.edu.np", event: "AI & Robotics Summit", checkedIn: false },
  { id: "GA-017", name: "Sristi Gurung", email: "sristi@iic.edu.np", event: "AI & Robotics Summit", checkedIn: false },
  { id: "GA-018", name: "Dawa Sherpa", email: "dawa@iic.edu.np", event: "AI & Robotics Summit", checkedIn: false },
];

const SCANNER_ELEMENT_ID = "qr-reader-region";

export default function Scanner() {
  const [attendees, setAttendees] = useState(seedAttendees);
  const [query, setQuery] = useState("");
  const [lastAction, setLastAction] = useState<Attendee | null>(null);

  const [cameraOn, setCameraOn] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const lastDecodedRef = useRef<{ text: string; time: number } | null>(null);

  const checkedInCount = attendees.filter((a) => a.checkedIn).length;

  const match = attendees.find(
    (a) =>
      a.id.toLowerCase() === query.trim().toLowerCase() ||
      a.email.toLowerCase() === query.trim().toLowerCase()
  );

  function checkInById(ticketId: string) {
    setAttendees((prev) => {
      const found = prev.find((a) => a.id === ticketId);
      if (!found || found.checkedIn) return prev;
      setLastAction({ ...found, checkedIn: true });
      return prev.map((a) =>
        a.id === ticketId ? { ...a, checkedIn: true } : a
      );
    });
  }

  function handleManualCheckIn() {
    if (!match || match.checkedIn) return;
    checkInById(match.id);
    setQuery("");
  }

  function handleDecodedText(decodedText: string) {
    const now = Date.now();
    if (
      lastDecodedRef.current &&
      lastDecodedRef.current.text === decodedText &&
      now - lastDecodedRef.current.time < 3000
    ) {
      return;
    }
    lastDecodedRef.current = { text: decodedText, time: now };

    const parts = decodedText.split("|");
    const ticketId = parts.length === 3 ? parts[2] : decodedText;
    checkInById(ticketId.trim());
  }

  async function startCamera() {
    setCameraError(null);
    try {
      const scanner = new Html5Qrcode(SCANNER_ELEMENT_ID);
      scannerRef.current = scanner;
      await scanner.start(
        { facingMode: "environment" },
        { fps: 10, qrbox: { width: 220, height: 220 } },
        (decodedText: string) => handleDecodedText(decodedText),
        () => {
          // per-frame decode failures are expected while no code is in view; ignore
        }
      );
      setCameraOn(true);
    } catch (err) {
      setCameraError(
        "Couldn't access the camera. Check browser permissions, or use manual entry below."
      );
      setCameraOn(false);
    }
  }

  async function stopCamera() {
    const scanner = scannerRef.current;
    if (scanner) {
      try {
        await scanner.stop();
        scanner.clear();
      } catch {
        // scanner may already be stopped
      }
      scannerRef.current = null;
    }
    setCameraOn(false);
  }

  useEffect(() => {
    return () => {
      scannerRef.current?.stop().catch(() => {});
    };
  }, []);

  return (
    <div>
      <h1 className="font-display text-[24px] font-bold text-ink sm:text-[28px]">
        Attendance scanner
      </h1>
      <p className="mt-1 text-[14px] text-ink-soft">
        AI &amp; Robotics Summit — {checkedInCount} of {attendees.length} checked in.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1.1fr]">
        <div className="rounded-3xl border border-ink bg-ink p-6 text-paper">
          <div className="relative aspect-square overflow-hidden rounded-2xl bg-paper/5">
            <div
              id={SCANNER_ELEMENT_ID}
              className={cameraOn ? "h-full w-full [&_video]:h-full [&_video]:w-full [&_video]:object-cover" : "hidden"}
            />

            {!cameraOn && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                <div className="absolute inset-8 rounded-2xl border-2 border-dashed border-paper/25" />
                <ScanLine size={40} className="text-paper/40" strokeWidth={1.25} />
                <span className="absolute left-8 top-8 h-6 w-6 border-l-2 border-t-2 border-accent" />
                <span className="absolute right-8 top-8 h-6 w-6 border-r-2 border-t-2 border-accent" />
                <span className="absolute bottom-8 left-8 h-6 w-6 border-b-2 border-l-2 border-accent" />
                <span className="absolute bottom-8 right-8 h-6 w-6 border-b-2 border-r-2 border-accent" />
              </div>
            )}
          </div>

          <button
            onClick={cameraOn ? stopCamera : startCamera}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-paper/[0.1] px-4 py-3 text-[13px] font-semibold text-paper transition-colors hover:bg-paper/[0.15]"
          >
            {cameraOn ? (
              <>
                <CameraOff size={15} strokeWidth={2.25} />
                Stop camera
              </>
            ) : (
              <>
                <Camera size={15} strokeWidth={2.25} />
                Start camera
              </>
            )}
          </button>

          {cameraError && (
            <div className="mt-3 flex items-start gap-2 rounded-xl bg-paper/[0.07] px-4 py-3 text-[12.5px] text-paper/70">
              <AlertTriangle size={14} className="mt-0.5 shrink-0" strokeWidth={2} />
              {cameraError}
            </div>
          )}
          {!cameraError && (
            <p className="mt-3 text-[11.5px] text-paper/50">
              Scans tickets encoded as EVENTHUB|event|ticketId. Point the
              camera at a real QR from the registration flow to test it.
            </p>
          )}
        </div>

        <div>
          <div className="rounded-3xl border border-mist bg-paper p-6">
            <p className="text-[13px] font-semibold text-ink">Manual check-in</p>
            <p className="mt-1 text-[12.5px] text-ink-soft">
              Enter a ticket ID or email — try{" "}
              <code className="rounded bg-cloud px-1.5 py-0.5 text-[11.5px]">
                GA-016
              </code>
            </p>

            <div className="mt-4 flex items-center gap-2 rounded-2xl border border-mist bg-cloud/40 px-4 py-3">
              <Search size={15} className="text-ink-soft" strokeWidth={2} />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleManualCheckIn()}
                placeholder="Ticket ID or email"
                className="w-full bg-transparent text-[14px] text-ink outline-none placeholder:text-ink-soft/60"
              />
            </div>

            {query && (
              <div className="mt-3 rounded-2xl border border-mist p-4">
                {match ? (
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-[13.5px] font-medium text-ink">
                        {match.name}
                      </p>
                      <p className="text-[12px] text-ink-soft">
                        {match.id} · {match.email}
                      </p>
                    </div>
                    {match.checkedIn ? (
                      <span className="flex items-center gap-1.5 rounded-full bg-accent-soft px-3 py-1.5 text-[12px] font-medium text-accent">
                        <CheckCircle2 size={13} strokeWidth={2.5} />
                        Already in
                      </span>
                    ) : (
                      <button
                        onClick={handleManualCheckIn}
                        className="flex items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-[12.5px] font-semibold text-paper"
                      >
                        <UserCheck size={13} strokeWidth={2.5} />
                        Check in
                      </button>
                    )}
                  </div>
                ) : (
                  <p className="text-[13px] text-ink-soft">
                    No attendee matches "{query}".
                  </p>
                )}
              </div>
            )}
          </div>

          {lastAction && (
            <div className="mt-4 flex items-center gap-3 rounded-2xl border border-accent/30 bg-accent-soft px-4 py-3.5">
              <CheckCircle2 size={18} className="text-accent" strokeWidth={2.25} />
              <p className="text-[13.5px] font-medium text-ink">
                {lastAction.name} checked in successfully.
              </p>
            </div>
          )}

          <div className="mt-4 rounded-3xl border border-mist bg-paper p-6">
            <p className="text-[13px] font-semibold text-ink">Attendee list</p>
            <div className="mt-3 divide-y divide-mist">
              {attendees.map((a) => (
                <div
                  key={a.id}
                  className="flex items-center justify-between py-2.5"
                >
                  <div>
                    <p className="text-[13px] font-medium text-ink">{a.name}</p>
                    <p className="text-[11.5px] text-ink-soft">{a.id}</p>
                  </div>
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium ${
                      a.checkedIn
                        ? "bg-accent-soft text-accent"
                        : "bg-cloud text-ink-soft"
                    }`}
                  >
                    {a.checkedIn && <CheckCircle2 size={11} strokeWidth={2.5} />}
                    {a.checkedIn ? "Checked in" : "Not yet"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}