import * as React from "react";

interface EmailTemplateProps {
  name: string;
  email: string;
  message: string;
}

export function EmailTemplate({ name, email, message }: EmailTemplateProps) {
  return (
    <div>
      <h1>New Contact Form Submission</h1>
      <div style={{ marginTop: "20px" }}>
        <p>
          <strong>Name:</strong> {name}
        </p>
        <p>
          <strong>Email:</strong> {email}
        </p>
        <p style={{ marginTop: "20px" }}>
          <strong>Message:</strong>
        </p>
        <p style={{ whiteSpace: "pre-wrap" }}>{message}</p>
      </div>
    </div>
  );
}
