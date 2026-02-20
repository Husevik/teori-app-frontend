import { Navigate } from "react-router-dom";

// This file is replaced by unified StudentQuiz with route param
// Redirect to /level/1 to use unified quiz

export default function Level1() {
  return <Navigate to="/level/1" replace />;
}
