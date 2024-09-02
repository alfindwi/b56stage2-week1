import { useState } from "react";

interface Form {
  username: string;
  age: number;
}

export function Form() {
  const [form, setForm] = useState<Form>({
    age: 0,
    username: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    alert(`Nama saya ${form.username}`);
    alert(`Umur saya ${form.age}`);
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          name="username"
          type="text"
          placeholder="Masukkan username..."
        />
        <input
          onChange={handleChange}
          name="age"
          type="number"
          placeholder="Masukkan umur..."
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}