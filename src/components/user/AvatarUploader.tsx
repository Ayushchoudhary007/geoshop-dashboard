import { UploadCloud } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Props = {
  avatarUrl?: string;
  onFileChange: (file: File | null) => void;
};

const AvatarUploader = ({ avatarUrl, onFileChange }: Props) => (
  <div className="col-span-2 flex items-center gap-6">
    {avatarUrl ? (
      <img src={avatarUrl} alt="avatar" className="w-16 h-16 rounded-full" />
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
        className="mt-2 rounded border border-gray-600"
        onChange={(e) => onFileChange(e.target.files?.[0] || null)}
      />
    </div>
  </div>
);

export default AvatarUploader;
