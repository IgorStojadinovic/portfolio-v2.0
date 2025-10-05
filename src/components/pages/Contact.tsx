import { useState } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast, Bounce } from "react-toastify";

interface FormData {
  name: string;
  email: string;
  message: string;
}

export default function Contact() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      setSuccess(true);
      toast.success("Message sent successfully!");
      reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative h-screen w-full p-24">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute right-0 bottom-0 -z-10 h-2/3 w-2/3 rounded-xs border border-stone-500 object-cover opacity-20"
      >
        <source src="/blast-furnace.mp4" type="video/mp4" />
      </video>
      <h2 className="mb-8 text-3xl font-bold uppercase">Get in Touch</h2>
      <div className="space-y-6">
        <p className="upp text-lg">
          I&apos;m always open to new opportunities and collaborations. Feel
          free to reach out!
        </p>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <a
              href="mailto:igorstojadinovic.vs@gmail.com"
              className="transition-colors hover:text-stone-400"
            >
              igorstojadinovic.vs@gmail.com
            </a>
          </div>
          <div className="flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
              />
            </svg>
            <a
              href="https://github.com/IgorStojadinovic"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-stone-400"
            >
              github.com/IgorStojadinovic
            </a>
          </div>
          <div className="flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <a
              href="https://www.linkedin.com/in/igor-s-83002b240/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-stone-400"
            >
              linkedin.com/in/igor-s-83002b240/
            </a>
          </div>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="z-20 mt-24 flex w-1/2 flex-col gap-6"
        >
          {error && (
            <div className="rounded-xs border border-red-500 bg-red-100 p-2 text-red-700">
              {error}
            </div>
          )}

          <div className="relative">
            <input
              type="text"
              placeholder="Name"
              className={`rounded-xs border-b ${
                errors.name ? "border-red-500" : "border-stone-500"
              } w-full p-2 pb-2 focus:border-orange-400 focus:outline-none focus:placeholder:text-orange-400`}
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <span className="text-xs text-red-500">
                {errors.name.message}
              </span>
            )}
          </div>
          <div className="relative">
            <input
              type="email"
              placeholder="Email"
              className={`rounded-xs border-b ${
                errors.email ? "border-red-500" : "border-stone-500"
              } w-full p-2 pb-2 focus:border-orange-400 focus:outline-none focus:placeholder:text-orange-400`}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && (
              <span className="text-xs text-red-500">
                {errors.email.message}
              </span>
            )}
          </div>
          <div className="relative">
            <textarea
              placeholder="Message"
              rows={5}
              className={`resize-none rounded-xs border ${
                errors.message ? "border-red-500" : "border-stone-500"
              } w-full p-2 focus:border-orange-400 focus:outline-none focus:placeholder:text-orange-400`}
              {...register("message", { required: "Message is required" })}
            />
            {errors.message && (
              <span className="text-xs text-red-500">
                {errors.message.message}
              </span>
            )}
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className={`cursor-pointer rounded-xs border border-stone-500 bg-stone-900 p-2 text-stone-100 uppercase transition-colors ${
              isLoading ? "cursor-not-allowed opacity-50" : "hover:bg-amber-600"
            } ${success ? "bg-green-500" : "bg-stone-900"}`}
          >
            {isLoading ? "Sending..." : "Send"}
          </button>
        </form>
      </div>
      <ToastContainer
        position="bottom-right"
        theme="dark"
        pauseOnHover={false}
        autoClose={1500}
        hideProgressBar={true}
        transition={Bounce}
      />
    </div>
  );
}
