import { SUPPORTED_LANGUAGES } from '../constants'
import { type FromLanguage, type Language } from '../types'

const API_URL = import.meta.env.VITE_APP_API_URL || ''

export async function translate ({
  fromLanguage,
  toLanguage,
  text
}: {
  fromLanguage: FromLanguage
  toLanguage: Language
  text: string
}): Promise<{ translated_text: string, total_tokens: number } | null> {
  if (fromLanguage === toLanguage) return { translated_text: text, total_tokens: 0 }

  try {
    const fromCode = fromLanguage === 'auto' ? 'auto' : SUPPORTED_LANGUAGES[fromLanguage]
    const toCode = SUPPORTED_LANGUAGES[toLanguage]

    // Construimos el cuerpo de la solicitud en formato JSON
    const body = {
      fromLanguage: fromCode,
      toLanguage: toCode,
      text
    }

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${API_KEY}`, // Descomentar si es necesario para autenticar
      },
      body: JSON.stringify(body)
    })

    if (!response.ok) {
      const errorData = await response.json(); // Errors details
      throw new Error(`Error: ${errorData.message || 'Error en la respuesta del servidor'}`);
    }

    const data = await response.json();
  return { translated_text: data.translated_text, total_tokens: data.total_tokens }
  } catch (error) {
    console.error('Error translating text:', error);
    return null;
  }
}
