import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "@/firebase/firebase";
import { userInfoSchema, UserInfo } from "./schema";
import PersonalInfoSection from "./PersonalInfoSection";
import BasicInfoSection from "./BasicInfoSection";

const UserInformation = () => {
  const [file, setFile] = useState<File | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<UserInfo>({
    resolver: zodResolver(userInfoSchema),
    defaultValues: {
      fullName: "",
      email: "",
      description: "",
      phone: "",
      position: "",
      location: "",
      website: "",
      avatarUrl: "",
    },
  });

  const avatarUrl = watch("avatarUrl");

  useEffect(() => {
    const fetchUserData = async () => {
      const userRef = doc(db, "users", "profile");
      const docSnap = await getDoc(userRef);
      if (docSnap.exists()) {
        reset(docSnap.data() as UserInfo);
      }
    };
    fetchUserData();
  }, [reset]);

  const handleUpload = async (): Promise<string | null> => {
    if (file) {
      const storageRef = ref(storage, `avatars/${file.name}`);
      await uploadBytes(storageRef, file);
      return await getDownloadURL(storageRef);
    }
    return null;
  };

  const onSubmit = async (data: UserInfo) => {
    if (file) {
      const url = await handleUpload();
      if (url) {
        data.avatarUrl = url;
        setValue("avatarUrl", url);
      }
    }
    await setDoc(doc(db, "users", "profile"), data);
    alert("Profile saved successfully!");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <PersonalInfoSection
        register={register}
        errors={errors}
        avatarUrl={avatarUrl}
        onFileChange={setFile}
      />
      <BasicInfoSection register={register} />
      <button
        type="submit"
        className="mt-1 bg-blue-600 hover:bg-blue-700 text-black font-medium py-2 px-6 rounded-lg "
      >
        Save Profile
      </button>
    </form>
  );
};

export default UserInformation;
