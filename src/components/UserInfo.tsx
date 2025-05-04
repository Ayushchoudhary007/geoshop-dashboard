import { doc, getDoc, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "@/firebase/firebase";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { UploadCloud } from "lucide-react";

const UserPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    description: "",
    phone: "",
    position: "",
    location: "",
    website: "",
    avatarUrl: "",
  });

  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const userRef = doc(db, "users", "profile");
      const docSnap = await getDoc(userRef);
      if (docSnap.exists()) {
        setFormData(docSnap.data() as any);
      }
    };
    fetchUserData();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleUpload = async () => {
    if (file) {
      const storageRef = ref(storage, `avatars/${file.name}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      setFormData((prev) => ({ ...prev, avatarUrl: url }));
    }
  };

  const handleSave = async () => {
    if (file) await handleUpload();
    await setDoc(doc(db, "users", "profile"), formData);
    alert("Profile saved successfully!");
  };

  return (
    <div className="space-y-8">
      {/* Personal Info */}
      <section>
        <h2 className="text-lg font-semibold text-white mb-1">
          Personal Information
        </h2>
        <p className="text-sm text-gray-400 mb-4">
          Lorem ipsum dolor sit amet consectetur adipiscing.
        </p>
        <Card className="bg-[#191E29] border-none text-white">
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 py-6">
            <div>
              <Label htmlFor="fullName">Full name</Label>
              <Input
                id="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="mt-2 bg-[#1F2635]"
              />
            </div>
            <div>
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-2 bg-[#1F2635]"
              />
            </div>
            {/* Avatar Upload */}
            <div className="col-span-2 flex items-center gap-6">
              {formData.avatarUrl ? (
                <img
                  src={formData.avatarUrl}
                  alt="avatar"
                  className="w-16 h-16 rounded-full"
                />
              ) : (
                <div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center text-lg font-semibold">
                  JC
                </div>
              )}
              <div>
                <Label htmlFor="photo">Photo</Label>
                <div className="flex items-center gap-2 mt-2 text-sm text-gray-400">
                  <UploadCloud className="w-4 h-4" />
                  <span>Click to upload or drag and drop</span>
                </div>
                <Input
                  type="file"
                  accept="image/*"
                  className="mt-2"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                />
              </div>
            </div>
            {/* Short description */}
            <div className="md:col-span-2">
              <Label htmlFor="description">Short description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={handleChange}
                className="mt-2 bg-[#1F2635]"
              />
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Basic Info */}
      <section>
        <h2 className="text-lg font-semibold text-white mb-1">
          Basic Information
        </h2>
        <p className="text-sm text-gray-400 mb-4">
          Lorem ipsum dolor sit amet consectetur adipiscing.
        </p>
        <Card className="bg-[#191E29] border-none text-white">
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 py-6">
            {["phone", "position", "location", "website"].map((field) => (
              <div key={field}>
                <Label htmlFor={field}>
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </Label>
                <Input
                  id={field}
                  value={(formData as any)[field]}
                  onChange={handleChange}
                  className="mt-2 bg-[#1F2635]"
                />
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <button
        onClick={handleSave}
        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg"
      >
        Save Profile
      </button>
    </div>
  );
};

export default UserPage;
