/** Uganda numbers often start with 0. WhatsApp needs the country code. */
export function whatsappHref(phone: string) {
  let digits = phone.replace(/\D/g, "");
  if (digits.startsWith("0")) digits = `256${digits.slice(1)}`;
  return `https://wa.me/${digits}`;
}
