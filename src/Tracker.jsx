import { useState, useEffect } from "react";

const days = Array.from({ length: 14 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() + i);
  return date.toISOString().split("T")[0];
});

const LOCAL_STORAGE_KEY = "tracker_entries";

const Tracker = () => {
  const [entries, setEntries] = useState(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    return saved
      ? JSON.parse(saved)
      : days.map((date) => ({
          date,
          morning: false,
          supplements: false,
          task: "",
          job: false,
          gratitude: ""
        }));
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(entries));
  }, [entries]);

  const updateEntry = (index, field, value) => {
    const updated = [...entries];
    updated[index][field] = value;
    setEntries(updated);
  };

  const downloadCSV = () => {
    const headers = ["Date", "Morning Movement", "Supplements Taken", "Task Completed", "Job/Skill", "Gratitude/Journal"];
    const rows = entries.map(entry => [
      entry.date,
      entry.morning ? "Yes" : "No",
      entry.supplements ? "Yes" : "No",
      entry.task,
      entry.job ? "Yes" : "No",
      entry.gratitude
    ]);

    const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "tracker_export.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const resetTracker = () => {
    const resetEntries = days.map((date) => ({
      date,
      morning: false,
      supplements: false,
      task: "",
      job: false,
      gratitude: ""
    }));
    setEntries(resetEntries);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      {entries.map((entry, i) => (
        <div
          key={entry.date}
          style={{
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "15px",
            marginBottom: "10px"
          }}
        >
          <h3>{entry.date}</h3>
          <label>
            <input
              type="checkbox"
              checked={entry.morning}
              onChange={(e) => updateEntry(i, "morning", e.target.checked)}
            />
            {" "}Morning Movement
          </label>
          <br />
          <label>
            <input
              type="checkbox"
              checked={entry.supplements}
              onChange={(e) => updateEntry(i, "supplements", e.target.checked)}
            />
            {" "}Supplements Taken
          </label>
          <br />
          <input
            type="text"
            placeholder="1 Task Completed (what was it?)"
            value={entry.task}
            onChange={(e) => updateEntry(i, "task", e.target.value)}
            style={{ width: "100%", marginTop: "5px" }}
          />
          <br />
          <label>
            <input
              type="checkbox"
              checked={entry.job}
              onChange={(e) => updateEntry(i, "job", e.target.checked)}
            />
            {" "}Applied to Job / Learned Skill
          </label>
          <br />
          <textarea
            placeholder="Gratitude / Journal Entry"
            value={entry.gratitude}
            onChange={(e) => updateEntry(i, "gratitude", e.target.value)}
            rows={2}
            style={{ width: "100%", marginTop: "5px" }}
          />
        </div>
      ))}
      <button
        onClick={() => console.log(entries)}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          fontWeight: "bold",
          cursor: "pointer",
          marginRight: "10px"
        }}
      >
        Save
      </button>
      <button
        onClick={downloadCSV}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          fontWeight: "bold",
          cursor: "pointer",
          marginRight: "10px"
        }}
      >
        Download CSV
      </button>
      <button
        onClick={resetTracker}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          fontWeight: "bold",
          cursor: "pointer"
        }}
      >
        Reset Tracker
      </button>
    </div>
  );
};

export default Tracker;
