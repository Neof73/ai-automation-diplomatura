# Clase 23 — IA multimodal: imágenes, PDFs y voz en tus flujos

**Bloque 5: Sistemas avanzados · Semana 23 de 25**
**Duración:** 2 horas · **Tipo:** Práctica · **Nivel:** Avanzado

---

## Objetivo de la clase

Que cada participante comprenda qué significa "multimodal" en el contexto de automatización con IA, y construya flujos capaces de procesar tres tipos de entrada distintos al texto: imágenes (para análisis visual de productos), PDFs (para extracción de datos de documentos) y audio (para transcripción de mensajes de voz). Al terminar, el agente de Lumina tiene que poder recibir una foto de un producto dañado, extraer datos de una factura en PDF y transcribir un mensaje de voz de WhatsApp — todo dentro del mismo pipeline.

---

## Agenda

| Tiempo | Bloque | Descripción |
|---|---|---|
| 0:00 – 0:10 | Apertura | El mundo no es solo texto: por qué la multimodalidad cambia todo |
| 0:10 – 0:40 | Bloque 1 | Teoría: modelos multimodales, visión por computadora y ASR |
| 0:40 – 1:05 | Bloque 2 | Procesamiento de imágenes con GPT-4o Vision |
| 1:05 – 1:25 | Bloque 3 | Extracción de datos de PDFs |
| 1:25 – 1:45 | Bloque 4 | Transcripción de audio con Whisper |
| 1:45 – 1:55 | Ejercicio | Integrar una capacidad multimodal al flujo propio |
| 1:55 – 2:00 | Tarea | Configuración para la semana |

---

## Apertura (0:00 – 0:10)

### El mundo que llega al negocio no es solo texto

Los canales de comunicación modernos envían todo tipo de contenido:

- Un cliente de WhatsApp Business **graba un mensaje de voz** en lugar de escribir
- Un cliente enojado **saca una foto del producto dañado** y la adjunta al email
- Un proveedor **manda una factura en PDF** que hay que procesar para registrar el gasto
- Un cliente sube una **foto de la etiqueta del producto** preguntando si es el original
- El equipo **graba reuniones** y necesita un resumen automático después

Hasta ahora, todos estos casos requerían intervención humana: alguien escuchaba el audio, alguien describía la foto, alguien copiaba los datos de la factura a mano. Los modelos multimodales pueden hacer todo eso automáticamente.

### Qué significa "multimodal"

Un modelo **unimodal** solo procesa un tipo de dato — texto o imagen o audio.

Un modelo **multimodal** puede procesar varios tipos de dato en la misma llamada: texto + imagen, texto + audio, o incluso los tres juntos.

GPT-4o es multimodal: puede recibir en el mismo mensaje texto, imágenes y audio, y responder con texto. Claude 3.5 Sonnet también. Esta capacidad abre posibilidades que eran imposibles hace dos años.

---

## Bloque 1 — Teoría: cómo funcionan los modelos multimodales (0:10 – 0:40)

### Visión por computadora: de píxeles a significado

Cuando un modelo de IA "ve" una imagen, no la ve como nosotros. El proceso tiene varias etapas:

```
[Imagen JPG/PNG]
      ↓
[Codificación: la imagen se convierte a tokens visuales]
  (cada parche de N×N píxeles → un token)
      ↓
[El modelo procesa los tokens visuales junto con
 los tokens de texto del prompt]
      ↓
[Respuesta en texto: descripción, análisis, datos extraídos]
```

Lo que puede hacer GPT-4o Vision con una imagen:
- **Describir** qué ve: "La imagen muestra una remera con una mancha marrón en el hombro izquierdo"
- **Clasificar** el contenido: "El producto está dañado / no dañado"
- **Extraer datos**: "El número de tracking visible en la caja es AR12345678"
- **Comparar**: "El producto en la imagen no coincide con la descripción del pedido"
- **Detectar anomalías**: "El embalaje muestra signos de haber sido abierto antes de entregar"

**Lo que NO puede hacer de forma confiable:**
- Leer texto muy pequeño o con mala resolución
- Contar objetos con alta precisión si hay muchos
- Distinguir colores exactos (puede confundir tonos similares)
- Ver detalles en imágenes con baja calidad o mal iluminadas

Conocer los límites es tan importante como conocer las capacidades — para no diseñar flujos que dependan de algo que el modelo hace mal.

---

### Cómo se mandan imágenes a la API de OpenAI

La API de OpenAI acepta imágenes de dos formas:

**Forma 1 — URL pública:**
```json
{
  "role": "user",
  "content": [
    {
      "type": "text",
      "text": "¿Qué daño tiene este producto?"
    },
    {
      "type": "image_url",
      "image_url": {
        "url": "https://bucket.s3.amazonaws.com/foto-producto.jpg",
        "detail": "high"
      }
    }
  ]
}
```

**Forma 2 — Base64 (imagen como texto codificado):**
```json
{
  "role": "user",
  "content": [
    {
      "type": "text",
      "text": "¿Qué daño tiene este producto?"
    },
    {
      "type": "image_url",
      "image_url": {
        "url": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQ...",
        "detail": "high"
      }
    }
  ]
}
```

El parámetro `detail`:
- `"low"`: imagen comprimida, menos tokens, menos detalle. Ideal para clasificación rápida.
- `"high"`: imagen en alta resolución, más tokens, más detalle. Para extracción de texto o análisis fino.
- `"auto"`: el modelo decide según el tamaño de la imagen.

**Costo de las imágenes:** una imagen en modo `high` consume entre 765 y 1.105 tokens según su resolución. Importante tenerlo en cuenta para flujos de alto volumen.

---

### Extracción de texto de PDFs: tres enfoques distintos

Un PDF puede ser de tres tipos, y cada tipo requiere un enfoque diferente:

| Tipo de PDF | Descripción | Mejor enfoque |
|---|---|---|
| **PDF de texto** | Generado digitalmente (ej: factura de sistema) | Extraer texto directamente — rápido y preciso |
| **PDF escaneado** | Foto de un documento físico | OCR (reconocimiento óptico de caracteres) |
| **PDF mixto** | Tiene texto digital e imágenes | Combinación de ambos enfoques |

**Enfoque 1 — Extracción directa de texto (para PDFs digitales):**

En n8n, el nodo **Extract from File** puede leer el texto de un PDF digital sin necesidad de IA. El texto extraído se manda después al modelo para su análisis o estructuración.

Ventajas: muy rápido, sin costo de tokens de imagen, alta precisión.

**Enfoque 2 — Visión para PDFs escaneados:**

Convertir cada página del PDF en una imagen JPEG y mandarlas a GPT-4o Vision. El modelo lee el texto como si estuviera mirando el documento.

Ventajas: funciona para cualquier PDF, incluso los escaneados.
Desventajas: más caro (cada imagen consume tokens), más lento.

**Enfoque 3 — Combinado con Textract o similar:**

Para PDFs de alto volumen, servicios especializados como AWS Textract o Google Document AI extraen texto e imágenes y los clasifican automáticamente. El costo por página es de $0.001-$0.015.

Para el programa usamos los Enfoques 1 y 2 con herramientas que ya conocemos.

---

### Reconocimiento de voz: Whisper y la transcripción automática

**Whisper** es el modelo de reconocimiento de voz de OpenAI. Sus características principales:

| Característica | Detalle |
|---|---|
| **Idiomas soportados** | 99 idiomas, incluyendo español con excelente precisión |
| **Formatos de audio** | MP3, MP4, MPEG, MPGA, M4A, WAV, WEBM |
| **Tamaño máximo** | 25 MB por archivo |
| **Costo** | $0.006 por minuto de audio |
| **Precisión en español** | Excelente — similar a un transcriptor humano en condiciones buenas |
| **Con ruido de fondo** | Funciona, pero baja la precisión |

**Capacidades adicionales de Whisper:**
- **Timestamps**: puede indicar en qué segundo del audio se dice cada frase
- **Detección de idioma**: detecta automáticamente en qué idioma se habla
- **Traducción**: puede transcribir directamente al inglés desde otro idioma

**Lo que no puede hacer:**
- Identificar quién habla (diarización — hay que usar otras herramientas)
- Funcionar bien con audio de muy mala calidad (menos de 8kHz)
- Transcribir con precisión cuando hablan varias personas al mismo tiempo

---

## Bloque 2 — Procesamiento de imágenes con GPT-4o Vision (0:40 – 1:05)

### El caso de Lumina: foto de producto dañado por email

Un cliente adjunta una foto al email reclamando que el producto llegó dañado. El flujo tiene que:
1. Detectar que el email tiene un adjunto de imagen
2. Descargar la imagen
3. Analizarla con GPT-4o Vision
4. Clasificar automáticamente la severidad del daño
5. Generar la respuesta apropiada y registrar el caso con descripción del daño

### Construcción del flujo en n8n

**Nodo 1 — Gmail Trigger**
Configurar para detectar emails con adjuntos:
- En la configuración del trigger, activar "Download Attachments"
- Esto hace que n8n descargue los archuntos y los exponga como binarios

**Nodo 2 — IF: ¿tiene imagen adjunta?**
```
{{ $json.attachments && $json.attachments.length > 0 &&
   $json.attachments[0].mimeType.startsWith('image/') }}
```

**Nodo 3 — Convertir imagen a Base64**

En el nodo Code:
```javascript
// Convertir el binario de la imagen a Base64 para mandarlo a la API
const attachment = $input.item.binary.attachment_0;
const base64 = attachment.data; // n8n ya lo tiene en base64

return [{
  json: {
    imagen_base64: `data:${attachment.mimeType};base64,${base64}`,
    nombre_archivo: attachment.fileName,
    tipo_mime: attachment.mimeType
  }
}];
```

**Nodo 4 — HTTP Request a OpenAI Vision**

El docente muestra cómo hacer la llamada a la API de OpenAI con una imagen, usando el nodo HTTP Request en lugar del nodo OpenAI estándar (porque el nodo estándar aún no soporta visión de forma completa en n8n):

- Method: POST
- URL: `https://api.openai.com/v1/chat/completions`
- Headers: `Authorization: Bearer {{ $env.OPENAI_API_KEY }}`
- Body (JSON):

```json
{
  "model": "gpt-4o",
  "max_tokens": 500,
  "messages": [
    {
      "role": "system",
      "content": "Sos un inspector de calidad de productos para Lumina, una tienda de indumentaria online. Analizás fotos de productos enviadas por clientes que reportan daños o problemas. Respondé SIEMPRE en formato JSON."
    },
    {
      "role": "user",
      "content": [
        {
          "type": "text",
          "text": "Analizá esta imagen de un producto enviado por un cliente que reclama que llegó dañado. Respondé con este JSON exacto:\n{\n  \"tiene_daño_visible\": true/false,\n  \"descripcion_daño\": \"descripción detallada del daño visible, o null si no hay\",\n  \"severidad\": \"leve | moderada | grave | sin_daño\",\n  \"parte_afectada\": \"dónde está el daño en la prenda, o null\",\n  \"es_producto_lumina\": true/false/\"no_se_puede_determinar\",\n  \"recomendacion\": \"aceptar_reclamo | solicitar_mas_fotos | derivar_a_humano\"\n}"
        },
        {
          "type": "image_url",
          "image_url": {
            "url": "={{ $json.imagen_base64 }}",
            "detail": "high"
          }
        }
      ]
    }
  ]
}
```

**Nodo 5 — Set: parsear la respuesta**

```javascript
const respuestaTexto = $input.item.json.choices[0].message.content;
// Limpiar el markdown si la API lo incluye
const jsonLimpio = respuestaTexto
  .replace(/```json\n?/g, '')
  .replace(/```\n?/g, '')
  .trim();
const analisis = JSON.parse(jsonLimpio);

return [{
  json: {
    ...analisis,
    // Campos adicionales para el registro
    email_cliente: $('ExtraerCampos').item.json.email_cliente,
    mensaje_original: $('ExtraerCampos').item.json.mensaje
  }
}];
```

### Prueba en vivo

El docente envía dos emails de prueba:
1. Con foto de una remera sin daño → el agente responde que no detecta daño visible
2. Con foto de una remera con una costura rota → el agente describe el daño, lo clasifica como "moderada" y recomienda aceptar el reclamo

---

## Bloque 3 — Extracción de datos de PDFs (1:05 – 1:25)

### El caso de Lumina: factura en PDF de proveedores

Lumina recibe facturas de sus proveedores en PDF. Hoy alguien las lee a mano y copia los datos a la planilla de gastos. El flujo automatiza eso.

### Para PDFs digitales (texto extraíble): nodo Extract from File

El nodo **Extract from File** en n8n extrae el texto de un PDF sin IA:

1. Trigger: Gmail o carpeta de Drive
2. Extraer el adjunto PDF como binario
3. Nodo **Extract from File**: operación "PDF"
4. El resultado es el texto completo del PDF

Luego, ese texto va al modelo de IA para estructurarlo:

**System Prompt para estructurar factura:**
```
Sos un extractor de datos de facturas. Recibís el texto de una factura
y devolvés ÚNICAMENTE un JSON con los datos estructurados.

JSON requerido:
{
  "numero_factura": "string",
  "fecha_emision": "YYYY-MM-DD",
  "proveedor": "string",
  "cuit_proveedor": "string",
  "items": [
    {
      "descripcion": "string",
      "cantidad": número,
      "precio_unitario": número,
      "subtotal": número
    }
  ],
  "subtotal": número,
  "iva": número,
  "total": número,
  "moneda": "ARS | USD | EUR"
}

Si un campo no está en la factura, poner null.
Todos los montos deben ser números, sin símbolos de moneda ni puntos de miles.
```

**User Message:**
```
{{ $json.text }}
```

### Para PDFs escaneados: convertir a imagen y usar Vision

En n8n no hay un nodo nativo para convertir PDF a imagen. Se puede usar una de estas opciones:

**Opción A — API externa (recomendada para producción):**
Usar la API de PDF.co o ConvertAPI para convertir el PDF a imágenes JPEG y recibirlas como URLs.

**Opción B — Script Python auxiliar:**

```python
# scripts/pdf_to_images.py
# Se ejecuta localmente o en un servidor
import pdf2image
import base64

def pdf_to_base64_images(pdf_path):
    """Convierte cada página de un PDF a base64 para mandar a Vision."""
    imagenes = pdf2image.convert_from_path(pdf_path, dpi=200)
    resultado = []
    for i, img in enumerate(imagenes):
        import io
        buffer = io.BytesIO()
        img.save(buffer, format='JPEG', quality=85)
        base64_img = base64.b64encode(buffer.getvalue()).decode('utf-8')
        resultado.append({
            'pagina': i + 1,
            'base64': f'data:image/jpeg;base64,{base64_img}'
        })
    return resultado
```

El docente muestra este script en VS Code, lo explica línea por línea y lo guarda en `scripts/pdf_to_images.py`. Explica que es Python pero no hay que entender Python para usarlo — se puede ejecutar desde n8n con el nodo **Execute Command** o desde un servidor.

---

## Bloque 4 — Transcripción de audio con Whisper (1:25 – 1:45)

### El caso de Lumina: mensaje de voz por WhatsApp Business

Un cliente manda un mensaje de voz por WhatsApp Business reportando un problema con su pedido. El flujo tiene que transcribirlo y procesarlo como si fuera texto.

### Conectar WhatsApp Business y recibir audios

WhatsApp Business API (a través de Meta Business Platform o proveedores como Twilio, 360dialog, WATI) envía los mensajes a un webhook de n8n. Los mensajes de audio llegan como un ID de media.

El flujo para recuperar el audio:

**Paso 1 — Webhook de n8n:** recibe el evento de WhatsApp
**Paso 2 — IF: ¿es un mensaje de audio?**

```javascript
$json.messages[0].type === 'audio'
```

**Paso 3 — HTTP Request: descargar el audio de WhatsApp**

WhatsApp manda un `media_id`, no el archivo directamente. Hay que llamar a la API de WhatsApp para obtener la URL y luego descargarla:

```
GET https://graph.facebook.com/v18.0/{{ $json.messages[0].audio.id }}
Headers: Authorization: Bearer {{ $env.WHATSAPP_TOKEN }}
```

La respuesta incluye la URL del archivo de audio. Se descarga con otro HTTP Request.

**Paso 4 — HTTP Request: enviar audio a Whisper**

La API de Whisper recibe el archivo de audio y devuelve la transcripción:

- Method: POST
- URL: `https://api.openai.com/v1/audio/transcriptions`
- Headers:
  - `Authorization: Bearer {{ $env.OPENAI_API_KEY }}`
  - Content-Type: `multipart/form-data`
- Body:
  - `file`: el archivo de audio descargado (binario)
  - `model`: `whisper-1`
  - `language`: `es` (para forzar transcripción en español)
  - `response_format`: `json`

La respuesta de Whisper:
```json
{
  "text": "Hola, les llamo porque el paquete que recibí estaba completamente roto, la caja estaba aplastada y la remera tiene manchas. Quiero hacer el reclamo correspondiente.",
  "language": "spanish",
  "duration": 8.4
}
```

**Paso 5 — Continuar con el flujo normal**

El texto transcripto por Whisper entra al mismo flujo de procesamiento que los emails: clasificación con IA, agente, respuesta. La diferencia es que la respuesta se manda de vuelta a WhatsApp en lugar de por email.

**Nodo de respuesta a WhatsApp:**
```
POST https://graph.facebook.com/v18.0/{{ $env.WA_PHONE_ID }}/messages
{
  "messaging_product": "whatsapp",
  "to": "{{ $json.from_number }}",
  "type": "text",
  "text": { "body": "{{ $json.respuesta_agente }}" }
}
```

### Prueba en vivo

El docente graba un mensaje de voz en su teléfono ("Hola, quería saber cuándo llega mi pedido, lo hice la semana pasada"), lo manda a un número de WhatsApp Business de prueba y muestra en tiempo real cómo:
1. El webhook de n8n lo recibe
2. El audio se descarga
3. Whisper lo transcribe
4. El agente lo procesa como si fuera texto
5. La respuesta llega al WhatsApp del docente en menos de 15 segundos

---

## Ejercicio práctico (1:45 – 1:55)

> Cada participante elige UNA capacidad multimodal e integra al flujo propio.

### Opción A — Procesamiento de imágenes (más común)

Identificar un caso donde los clientes mandan fotos: producto dañado, comprobante de pago, referencia de diseño, foto del problema.

Construir el flujo:
1. Detectar el adjunto de imagen en el email
2. Convertirlo a base64
3. Mandarlo a GPT-4o Vision con un prompt específico para el caso del negocio
4. Parsear el resultado y usarlo en el flujo (clasificación, respuesta, registro)

### Opción B — Extracción de PDFs

Identificar un PDF recurrente en el negocio: facturas, contratos, informes, presupuestos.

Construir el flujo:
1. Recibir el PDF por email o Drive
2. Extraer el texto con el nodo Extract from File
3. Mandarlo al modelo con el prompt de estructuración
4. Guardar el JSON resultante en Sheets o Airtable

### Opción C — Transcripción de audio (si tienen WhatsApp Business)

Configurar el webhook de WhatsApp en n8n y construir el flujo de transcripción.

---

## Cierre (1:55 – 2:00)

> Pensemos en lo que construimos esta semana: el agente ahora puede leer una foto, extraer datos de una factura y escuchar un mensaje de voz. Eso no existía en un sistema no-code hace dos años. La convergencia de modelos multimodales con plataformas de automatización visual abrió un nivel de posibilidades que antes requería equipos de ingeniería especializados. La próxima clase vamos a hablar de cómo hacer que todo esto funcione de forma segura en producción real.

---

## Tarea de la semana

1. **Implementar la capacidad multimodal elegida** en el flujo del negocio propio.
2. **Probar con al menos 5 archivos reales**: imágenes, PDFs o audios del negocio propio.
3. **Documentar en VS Code** (`multimodal/evaluacion.md`):
   - Tipo de archivo procesado
   - Precisión del análisis: ¿el modelo interpretó correctamente? (sí / no / parcialmente)
   - Casos donde falló y por qué
   - Ajustes al prompt que mejoraron la precisión
4. **Calcular el costo por archivo**: tokens consumidos × precio por token. ¿Es viable económicamente para el volumen del negocio?

---

## Recursos y herramientas

| Herramienta | Para qué | Cómo acceder |
|---|---|---|
| OpenAI GPT-4o Vision | Análisis de imágenes | platform.openai.com/docs/guides/vision |
| OpenAI Whisper API | Transcripción de audio | platform.openai.com/docs/guides/speech-to-text |
| n8n Extract from File | Extracción de texto de PDFs | Nodo nativo en n8n |
| PDF.co API | Convertir PDF escaneado a imagen | pdf.co |
| Twilio / WATI | Integrar WhatsApp Business | twilio.com / wati.io |
| VS Code | Editar scripts de conversión | code.visualstudio.com |
| Python pdf2image | Convertir PDF a imagen localmente | pip install pdf2image |

---

## Glosario de la clase

| Término | Definición |
|---|---|
| **Multimodal** | Capaz de procesar múltiples tipos de dato: texto, imagen, audio, video |
| **Vision** | Capacidad de un modelo de IA para analizar e interpretar imágenes |
| **Base64** | Codificación que convierte datos binarios (imágenes) en texto ASCII |
| **OCR** | Optical Character Recognition: extraer texto de imágenes de documentos |
| **Whisper** | Modelo de reconocimiento de voz de OpenAI, soporta 99 idiomas |
| **ASR** | Automatic Speech Recognition: transcripción automática de voz a texto |
| **Webhook** | URL que recibe notificaciones de eventos en tiempo real |
| **media_id** | Identificador de un archivo multimedia en la API de WhatsApp Business |
| **Diarización** | Identificar quién habla en un audio con múltiples personas |
| **Token visual** | Unidad de procesamiento de imágenes en modelos multimodales (equivalente al token de texto) |

---

*AI Automation — Diplomatura No-Code · Bloque 5: Sistemas avanzados · Clase 23 de 25*
