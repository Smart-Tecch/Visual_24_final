/** Uganda numbers often start with 0. WhatsApp needs the country code. */
export function whatsappHref(phone: string) {
  let digits = phone.replace(/\D/g, "");
  if (digits.startsWith("0")) digits = `256${digits.slice(1)}`;
  return `https://wa.me/${digits}`;
}

export function courseNotifyHref(courseTitle: string) {
  const text = encodeURIComponent(
    `Hello Visual 24, please tell me when ${courseTitle} starts.`,
  );
  return `${whatsappHref("0741653226")}?text=${text}`;
}
