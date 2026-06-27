const ESKIZ_TOKEN = '24d8f0afe88087e441f3d9187b53d9a0b96d48ea0fbac237ee2c918af071be5a';

export async function sendSmsCode(phone, code) {
  // Development rejimida: real SMS yuborish o'rniga konsolda ko'rsatamiz
  // (CORS muammosi tufayli localhost dan to'g'ridan-to'g'ri API ga so'rov yubora olmaymiz)
  const isDev = import.meta.env.DEV;

  if (isDev) {
    // Konsolda kodni ko'rsatamiz (F12 -> Console)
    console.log(
      `%c📱 SMS KOD [${phone}]: ${code}`,
      'font-size: 24px; font-weight: bold; color: #2563eb; background: #eff6ff; padding: 8px 16px; border-radius: 8px;'
    );
    return { success: true };
  }

  // Production (real server) da API ga yuboramiz
  const cleanPhone = phone.replace(/[^0-9]/g, '');

  const formData = new FormData();
  formData.append('mobile_phone', cleanPhone);
  formData.append('message', `NurStudy: Tasdiqlash kodi - ${code}`);
  formData.append('from', '4546');

  try {
    const response = await fetch('https://notify.eskiz.uz/api/message/sms/send', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${ESKIZ_TOKEN}`,
      },
      body: formData,
    });

    if (!response.ok) throw new Error('SMS yuborishda xatolik yuz berdi');
    return { success: true };
  } catch (error) {
    console.error('SMS Error:', error);
    return { success: false, error: error.message };
  }
}
