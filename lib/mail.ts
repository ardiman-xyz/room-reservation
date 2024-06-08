import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`;

  const { data, error } = await resend.emails.send({
    from: "simruang@umkendari.ac.id",
    to: email,
    subject: "Conform your email",
    html: `<p>Click <a href="${confirmLink}" target="_blank">here</a> to confirm email</p>`,
  });

  if (error) {
    return { error: error.message };
  }
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `http://localhost:3000/auth/new-password?token=${token}`;

  const { data, error } = await resend.emails.send({
    from: "simruang@umkendari.ac.id",
    to: email,
    subject: "Reset your password",
    html: `<p>Click <a href="${resetLink}" target="_blank">here</a> to reset password</p>`,
  });

  if (error) {
    return { error: error.message };
  }
};
