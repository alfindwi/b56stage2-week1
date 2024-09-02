import { useState } from "react";

interface RegisterForm {
  fullName: string;
  email: string;
  password: string;
}

export function Counter() {
  // let counter: number = 0;
  const [counter, setCounter] = useState<number>(0);
  const [form, setForm] = useState<RegisterForm>({
    email: "",
    fullName: "",
    password: "",
  });

  function add() {
    setCounter(counter + 1);
  }

  function less() {
    setCounter(counter - 1);
  }

  function fillForm() {
    if (!form.email) {
      return setForm({
        email: "test@gmail.com",
        fullName: "testing",
        password: "xxxx",
      });
    }

    setForm({
      email: "",
      fullName: "",
      password: "",
    });
  }

  return (
    <>
      <h1>{counter}</h1>
      <button onClick={add}>+</button>
      <button onClick={less}>-</button>
      <h1>{form.fullName}</h1>
      <h1>{form.email}</h1>
      <h1>{form.password}</h1>
      <button onClick={fillForm}>Fill Form</button>
    </>
  );
}