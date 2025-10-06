import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FarmerButton } from "@/components/ui/farmer-button";
import { FarmerInput } from "@/components/ui/farmer-input";
import { useLanguage } from "@/contexts/LanguageContext";

export default function NewUser() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [contact, setContact] = useState(""); // mobile or email
  const [aadhaar, setAadhaar] = useState(""); // only for farmer
  const [role, setRole] = useState("ROLE_FARMER");
  const [error, setError] = useState("");

  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!username || !password || !contact || (role === "ROLE_FARMER" && !aadhaar)) {
      return setError("Please fill all required fields.");
    }
    if (role === "ROLE_STUDENT" && !contact.endsWith("@gmail.com")) {
      return setError("Student email must end with @gmail.com");
    }

    try {
      const res = await fetch("http://localhost:8081/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, contact, aadhaar, role }),
      });
      const data = await res.json();
      if (data.success) {
        navigate("/login");
      } else {
        setError(data.message || "Registration failed");
      }
    } catch (err:any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen p-4 flex items-center justify-center">
      <Card className="w-full max-w-md border-2">
        <CardHeader className="text-center">
          <CardTitle>{t("newUser.title") || "Create New User"}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <FarmerInput
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <FarmerInput
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div>
            <label className="block mb-1">Role</label>
            <select
              className="w-full p-2 border rounded"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="ROLE_FARMER">Farmer</option>
              <option value="ROLE_STUDENT">Student</option>
            </select>
          </div>
          {role === "ROLE_FARMER" ? (
            <>
              <FarmerInput
                label="Mobile"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
              />
              <FarmerInput
                label="Aadhaar"
                value={aadhaar}
                onChange={(e) => setAadhaar(e.target.value)}
              />
            </>
          ) : (
            <FarmerInput
              label="Email"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
            />
          )}
          {error && <p className="text-red-600">{error}</p>}
          <FarmerButton className="w-full" onClick={handleSubmit}>Create</FarmerButton>
        </CardContent>
      </Card>
    </div>
  );
}
