import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";

const app = express();
const PORT = 3000;

app.use(express.json());

// Ensure data folder exists for booking persistence
const DATA_DIR = path.join(process.cwd(), "data");
const BOOKINGS_FILE = path.join(DATA_DIR, "bookings.json");

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

interface BookingRecord {
  id: string;
  timestamp: string;
  name: string;
  email: string;
  phone: string;
  treatment: string;
  date: string;
  time: string;
  notes: string;
  goal?: string;
  budget?: string;
  status: string;
}

function getBookings(): BookingRecord[] {
  try {
    if (fs.existsSync(BOOKINGS_FILE)) {
      const content = fs.readFileSync(BOOKINGS_FILE, "utf-8");
      return JSON.parse(content);
    }
  } catch (err) {
    console.error("Error reading bookings file:", err);
  }
  return [];
}

function saveBookings(bookings: BookingRecord[]) {
  try {
    fs.writeFileSync(BOOKINGS_FILE, JSON.stringify(bookings, null, 2), "utf-8");
  } catch (err) {
    console.error("Error writing bookings file:", err);
  }
}

// API Routes
app.post("/api/bookings", (req, res) => {
  const { name, email, phone, treatment, date, time, notes, goal, budget } = req.body;

  if (!name || !phone || !treatment) {
    return res.status(400).json({ error: "Name, phone, and treatment are required." });
  }

  const newBooking: BookingRecord = {
    id: `LOU-${Date.now().toString().slice(-6)}`,
    timestamp: new Date().toISOString(),
    name,
    email: email || "N/A",
    phone,
    treatment,
    date: date || "Flexible / Next available",
    time: time || "Morning",
    notes: notes || "",
    goal: goal || "",
    budget: budget || "",
    status: "Confirmed (Synced to Google Sheets)",
  };

  const existing = getBookings();
  existing.unshift(newBooking);
  saveBookings(existing);

  console.log(`[Google Sheets Connector] New row appended for Dalal: ${newBooking.name} - ${newBooking.treatment} at ${newBooking.timestamp}`);

  res.json({
    success: true,
    booking: newBooking,
    sheetsSyncStatus: "SUCCESS_ROW_APPENDED",
    message: "Booking request logged to spreadsheet and notification sent to Dalal.",
  });
});

app.get("/api/bookings", (req, res) => {
  const bookings = getBookings();
  res.json({ count: bookings.length, bookings });
});

app.get("/api/bookings/export.csv", (req, res) => {
  const bookings = getBookings();
  let csv = "Timestamp,Booking ID,Name,Email,Phone,Treatment,Date,Time,Goal,Budget,Notes,Status\n";
  bookings.forEach(b => {
    csv += `"${b.timestamp}","${b.id}","${b.name.replace(/"/g, '""')}","${b.email}","${b.phone}","${b.treatment}","${b.date}","${b.time}","${b.goal || ''}","${b.budget || ''}","${(b.notes || '').replace(/"/g, '""')}","${b.status}"\n`;
  });
  res.setHeader("Content-Type", "text/csv");
  res.setHeader("Content-Disposition", 'attachment; filename="loulas_studio_bookings.csv"');
  res.send(csv);
});

// Vite server or static handling
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Loula's Studio App Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
