import { useState, useEffect } from "react";
import { Webchat } from "@botpress/webchat";
import { v4 as uuidv4 } from "uuid"; // npm install uuid

const clientId = "d9538316-4204-41fa-b5ce-8a77fe7ffd80";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  // Generate or retrieve persistent userId
  useEffect(() => {
    let storedUserId = localStorage.getItem("bp_userId");
    if (!storedUserId) {
      storedUserId = uuidv4();
      localStorage.setItem("bp_userId", storedUserId);
    }
    setUserId(storedUserId);
  }, []);

  if (!userId) return null; // wait until userId is ready

  return (
    <div style={{ position: "fixed", bottom: 20, right: 20, zIndex: 1000 }}>
      {/* Chat bubble */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        style={{
          backgroundColor: "#00a651",
          color: "#00a651",
          borderRadius: "50%",
          width: 60,
          height: 60,
          fontSize: 24,
          border: "none",
          cursor: "pointer",
        }}
        aria-label="Open chatbot"
      >
        💬
      </button>

      {/* Chat window */}
      {isOpen && (
        <div
          style={{
            width: 350,
            height: 500,
            marginTop: 10,
            boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
            borderRadius: 10,
            overflow: "hidden",
          }}
        >
          <Webchat
            clientId={clientId}
            userId={userId} // unique user identity
            configuration={{
              color: "#00a651",
              botName: "Farmers Assistant",
            }}
          />
        </div>
      )}
    </div>
  );
}
