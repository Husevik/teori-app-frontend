import React, { useEffect, useState } from 'react';
import './Profile.css';

const LICENSE_TYPES = ['moped', 'motorcycle', 'car', 'car+trailer', 'boat'] as const;

type LicenseType = typeof LICENSE_TYPES[number];

interface ProfileData {
  nickname: string;
  licenseType: LicenseType;
}

const STORAGE_KEY = 'student_profile';

const Profile: React.FC = () => {
  const [nickname, setNickname] = useState<string>('');
  const [licenseType, setLicenseType] = useState<LicenseType>('car');
  const [saved, setSaved] = useState<boolean>(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const data: ProfileData = JSON.parse(stored);
        if (data.nickname) setNickname(data.nickname);
        if (data.licenseType && LICENSE_TYPES.includes(data.licenseType)) {
          setLicenseType(data.licenseType);
        }
      } catch {
        // ignore parse errors
      }
    }
  }, []);

  const handleSave = () => {
    const data: ProfileData = { nickname, licenseType };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="profile-container">
      <h1>Profile</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSave();
        }}
        className="profile-form"
      >
        <label htmlFor="nickname">Nickname</label>
        <input
          id="nickname"
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          maxLength={30}
          required
        />

        <label htmlFor="licenseType">License Type</label>
        <select
          id="licenseType"
          value={licenseType}
          onChange={(e) => setLicenseType(e.target.value as LicenseType)}
          required
        >
          {LICENSE_TYPES.map((type) => (
            <option key={type} value={type}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </option>
          ))}
        </select>

        <button type="submit" className="menu-card profile-save-button">
          Save
        </button>
        {saved && <p className="save-confirmation">Profile saved!</p>}
      </form>
    </div>
  );
};

export default Profile;
