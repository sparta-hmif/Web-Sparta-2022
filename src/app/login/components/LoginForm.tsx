"use client";

import TextFields from "@/components/TextFields";
import Button from "@/components/Button";
import { useState } from "react";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {};

  return (
    <form className="flex flex-col gap-5 items-center w-full lg:w-5/12">
      <TextFields
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
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
          onClick={handleSubmit}
        />
      </div>
    </form>
  );
};

export default LoginForm;
