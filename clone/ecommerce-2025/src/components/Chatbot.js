import React, { useState } from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CFormTextarea,
  CButton,
  CListGroup,
  CListGroupItem
} from "@coreui/react";
import api from "../services/api";

function Chatbot() {
  const [message, setMessage] = useState("");
  const [history, setHistory] = useState([]);
  const [minimized, setMinimized] = useState(false);

  const sendMessage = async () => {
  if (!message.trim()) return;

  const userMessage = { role: "Tú", text: message };
  setHistory((prev) => [...prev, userMessage]);

  try {
    const res = await api.post("/chat", { message });
    const respuesta = res.data?.response || "Sin respuesta";
    const botMessage = { role: "Chatbot", text: respuesta };
    setHistory((prev) => [...prev, botMessage]);
  } catch (error) {
    console.error("Error al conectar con el backend:", error);
    setHistory((prev) => [
      ...prev,
      { role: "Chatbot", text: "Error al conectar con el backend." }
    ]);
  }

  setMessage("");
};

  return (
    <CCard
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        width: "350px",
        zIndex: 1050,
        boxShadow: "0 0 10px rgba(0,0,0,0.2)"
      }}
    >
      <CCardHeader style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        🧠 Chatbot Gemini
        <CButton color="link" size="sm" onClick={() => setMinimized(!minimized)}>
          {minimized ? "🔼" : "🔽"}
        </CButton>
      </CCardHeader>
      {!minimized && (
        <CCardBody>
          <CListGroup style={{ maxHeight: "200px", overflowY: "auto", marginBottom: "10px" }}>
            {history.map((msg, index) => (
              <CListGroupItem key={index}>
                <strong>{msg.role}:</strong> {msg.text}
              </CListGroupItem>
            ))}
          </CListGroup>
          <CFormTextarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Escribe tu pregunta..."
            rows={3}
          />
          <CButton color="primary" className="w-100 mt-2" onClick={sendMessage}>
            Enviar
          </CButton>
        </CCardBody>
      )}
    </CCard>
  );
}

export default Chatbot;