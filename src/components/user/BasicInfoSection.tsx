import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UseFormRegister } from "react-hook-form";
import { UserInfo } from "./schema";

type Props = {
  register: UseFormRegister<UserInfo>;
};

const fields = ["phone", "position", "location", "website"];

const BasicInfoSection = ({ register }: Props) => (
  <section>
    <h2 className="text-lg font-semibold text-white mb-1">Basic Information</h2>
    <p className="text-sm text-gray-400 mb-4">
      Additional contact and work information.
    </p>
    <Card className="bg-[#191E29] border-none text-white">
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 py-6">
        {fields.map((field) => (
          <div key={field}>
            <Label htmlFor={field}>
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </Label>
            <Input
              id={field}
              {...register(field as keyof UserInfo)}
              className="mt-2 bg-[#1F2635]"
            />
          </div>
        ))}
      </CardContent>
    </Card>
  </section>
);

export default BasicInfoSection;
