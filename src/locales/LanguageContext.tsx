import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Language = "no" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  no: {
    "Back to Menu": "Tilbake til meny",
    "Save": "Lagre",
    "Profile": "Profil",
    "Nickname": "Kallenavn",
    "License Type": "Førerkorttype",
    "Select license type": "Velg førerkorttype",
    "moped": "Moped",
    "motorcycle": "Motorsykkel",
    "car": "Bil",
    "car+trailer": "Bil + tilhenger",
    "boat": "Båt",
    "Leaderboards": "Toppliste",
    "Name": "Navn",
    "Score": "Poeng",
    "Save message": "Profil lagret!",
    "Submit": "Send inn",
    "Next": "Neste",
    "Practice Quiz": "Øvequiz",
    "Level": "Nivå",
    "Quiz": "Quiz",
    "Correct": "Riktig",
    "Wrong": "Feil",
    "Loading": "Laster…",
    "Home": "Hjem",
    "Levels": "Nivåer",
    "Logout": "Logg ut",
    "Settings": "Innstillinger",
    "Language": "Språk",
    "Norwegian": "Norsk",
    "English": "Engelsk",
    "Select Language": "Velg språk",
    "Profile saved!": "Profil lagret!",
    "No questions available.": "Ingen spørsmål tilgjengelig.",
    "Submit Answer": "Send svar",
    "Back to Menu Button": "Tilbake til meny",
    "Play": "Spill",
    "Next Question": "Neste spørsmål",
    "Your Score": "Din poengsum",
    "Correct Answers": "Riktige svar",
    "Total Questions": "Totalt antall spørsmål"
  },
  en: {
    "Back to Menu": "Back to Menu",
    "Save": "Save",
    "Profile": "Profile",
    "Nickname": "Nickname",
    "License Type": "License Type",
    "Select license type": "Select license type",
    "moped": "Moped",
    "motorcycle": "Motorcycle",
    "car": "Car",
    "car+trailer": "Car + Trailer",
    "boat": "Boat",
    "Leaderboards": "Leaderboards",
    "Name": "Name",
    "Score": "Score",
    "Save message": "Profile saved!",
    "Submit": "Submit",
    "Next": "Next",
    "Practice Quiz": "Practice Quiz",
    "Level": "Level",
    "Quiz": "Quiz",
    "Correct": "Correct",
    "Wrong": "Wrong",
    "Loading": "Loading…",
    "Home": "Home",
    "Levels": "Levels",
    "Logout": "Logout",
    "Settings": "Settings",
    "Language": "Language",
    "Norwegian": "Norwegian",
    "English": "English",
    "Select Language": "Select Language",
    "Profile saved!": "Profile saved!",
    "No questions available.": "No questions available.",
    "Submit Answer": "Submit Answer",
    "Back to Menu Button": "Back to Menu",
    "Play": "Play",
    "Next Question": "Next Question",
    "Your Score": "Your Score",
    "Correct Answers": "Correct Answers",
    "Total Questions": "Total Questions"
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("no");

  useEffect(() => {
    const stored = localStorage.getItem("language");
    if (stored === "en" || stored === "no") {
      setLanguageState(stored);
    }
  }, []);

  function setLanguage(lang: Language) {
    setLanguageState(lang);
    localStorage.setItem("language", lang);
  }

  function t(key: string): string {
    return translations[language][key] ?? key;
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
