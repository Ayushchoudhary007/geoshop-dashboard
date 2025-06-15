import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import AvatarUploader from "./AvatarUploader";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { UserInfo } from "./schema";

type Props = {
  register: UseFormRegister<UserInfo>;
  errors: FieldErrors<UserInfo>;
  avatarUrl?: string;
  onFileChange: (file: File | null) => void;
};

const PersonalInfoSection = ({
  register,
  errors,
  avatarUrl,
  onFileChange,
}: Props) => (
  <section>
    <h2 className="text-lg font-semibold text-white mb-1">
      Personal Information
    </h2>
    <p className="text-sm text-gray-400 mb-4">
      Update your personal details and profile picture.
    </p>
    <Card className="bg-[#191E29] border-none text-white">
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 py-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-2">
          <div className="my-4 w-full max-w-2xl">
            <Label htmlFor="fullName">Full name</Label>
            <Input
              id="fullName"
              {...register("fullName")}
              className="mt-2 w-full bg-[#1F2635] text-white p-3 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.fullName.message}
              </p>
            )}
          </div>

          <div className="my-4 w-full max-w-2xl">
            <Label htmlFor="email">Email address</Label>
            <Input
              id="email"
              {...register("email")}
              className="mt-2 w-full bg-[#1F2635] text-white p-3 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
        </div>
        <AvatarUploader avatarUrl={avatarUrl} onFileChange={onFileChange} />
        <div className="md:col-span-2">
          <Label htmlFor="description">Short description</Label>
          <Textarea
            id="description"
            {...register("description")}
            className="mt-2 bg-[#1F2635] text-white p-3 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </CardContent>
    </Card>
  </section>
);

export default PersonalInfoSection;
