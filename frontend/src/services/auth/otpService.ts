const delay = (ms = 900) => new Promise((resolve) => setTimeout(resolve, ms));

export const DUMMY_OTP = '123456';

export async function sendOtp(_target: string) {
  await delay(700);
  return {
    success: true,
    expiresIn: 30,
  };
}

export async function verifyOtp(code: string) {
  await delay(900);

  if (code !== DUMMY_OTP) {
    throw new Error('Incorrect verification code.');
  }

  return true;
}
