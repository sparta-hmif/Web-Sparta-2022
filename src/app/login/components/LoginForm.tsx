"use client";

import TextFields from "@/components/TextFields";
import Button from "@/components/Button";
import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const LoginForm = ({ session }: any) => {
  const [nim, setNim] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();

      // Perform login authentication logic here
      const res = await signIn("credentials", {
        redirect: false,
        nim,
        password,
        callbackUrl: "/",
      });

      console.log("res", res)

      // print error if error
      if (res?.error) {
        console.log("error : ", res.error);
      } else {
        router.refresh();
      }
    } catch (error) {
      console.log("error : ", error);
    }
  };

  return (
    <form className="flex flex-col gap-5 items-center w-full lg:w-5/12" onSubmit={handleSubmit}>
      <TextFields
        placeholder="NIM"
        value={nim}
        onChange={(e) => setNim(e.target.value)}
      />
      <TextFields
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="w-8/12">
        <Button
          text="Login"
          isPrimary={true}
          type="submit"
        />
      </div>
    </form>
  );
};

export default LoginForm;
