import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";
import { useLanguage } from "../locales/LanguageContext";

const LICENSE_TYPES = ["moped", "motorcycle", "car", "car+trailer", "boat"];

export default function Profile() {
  const { t, language } = useLanguage();
  const [nickname, setNickname] = useState("");
  const [license, setLicense] = useState("");
  const [saved, setSaved] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedNickname = localStorage.getItem("profile_nickname") || "";
    const storedLicense = localStorage.getItem("profile_license") || "";
    setNickname(storedNickname);
    setLicense(storedLicense);
  }, []);

  function handleSave() {
    localStorage.setItem("profile_nickname", nickname.trim());
    localStorage.setItem("profile_license", license);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="student-page">
      <div className="student-container">
        <div className="card student-profile-container" style={{ position: "relative", paddingBottom: "72px" }}>
          <h2>{t("Profile")}</h2>
          <div className="student-profile-card">
            <label htmlFor="nickname">{t("Nickname")}</label>
            <input
              id="nickname"
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder={t("Nickname")}
              maxLength={30}
            />

            <label htmlFor="license">{t("License Type")}</label>
            <select
              id="license"
              value={license}
              onChange={(e) => setLicense(e.target.value)}
            >
              <option value="" disabled>
                {t("Select license type")}
              </option>
              {LICENSE_TYPES.map((type) => (
                <option key={type} value={type}>
                  {t(type)}
                </option>
              ))}
            </select>

            <button
              className="student-primary-button"
              onClick={handleSave}
              disabled={nickname.trim() === "" || license === ""}
              type="button"
            >
              {t("Save")}
            </button>

            {saved && <p className="student-save-message">{t("Profile saved!")}</p>}
          </div>

          <div style={{ position: "absolute", bottom: 20, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
            <button
              className="student-primary-button"
              type="button"
              onClick={() => navigate("/")}
            >
              {t("Back to Menu")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
