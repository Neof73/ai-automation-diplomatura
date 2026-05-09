# Clase 21 — Memoria persistente y RAG: el agente que aprende de tu negocio

**Bloque 5: Sistemas avanzados · Semana 21 de 25**
**Duración:** 2 horas · **Tipo:** Práctica · **Nivel:** Avanzado

---

## Objetivo de la clase

Que cada participante comprenda en profundidad cómo funciona la recuperación de información aumentada (RAG), construya una base de conocimiento persistente conectada al agente del propio negocio, y valide que el agente responde usando información real de catálogo, políticas y preguntas frecuentes — sin inventar datos ni depender de un context window limitado. Al terminar, el agente tiene que responder preguntas sobre productos, políticas y procedimientos que no existían en el sistema hasta hoy.

---

## Agenda

| Tiempo | Bloque | Descripción |
|---|---|---|
| 0:00 – 0:15 | Apertura | El límite de la memoria del agente: por qué el context window no alcanza |
| 0:15 – 0:50 | Bloque 1 | Teoría completa de RAG: embeddings, vectores y búsqueda semántica |
| 0:50 – 1:15 | Bloque 2 | Herramientas: Supabase + pgvector + n8n RAG Chain |
| 1:15 – 1:40 | Bloque 3 | La base de conocimiento de Lumina — construida en vivo |
| 1:40 – 1:55 | Ejercicio | Cada participante carga su primera base de conocimiento |
| 1:55 – 2:00 | Tarea | Configuración para la semana |

---

## Apertura (0:00 – 0:15)

### El problema que todavía no resolvimos

El agente del Bloque 4 razona bien y usa herramientas correctamente. Pero tiene un límite fundamental: solo sabe lo que le dijimos en el system prompt y lo que puede buscar en las herramientas conectadas.

¿Qué pasa cuando un cliente le pregunta al agente de Lumina algo así?

> *"¿Cuál es la diferencia entre el tejido de la Remera Slim y la Remera Urban? ¿Cuál encoge menos en el lavarropas?"*

O:

> *"Vi que tienen una política de cambios de 30 días, pero en mi caso el producto llegó dañado después de 45 días. ¿Pueden hacer una excepción?"*

O:

> *"¿Las telas que usan tienen certificación de comercio justo o algún estándar sustentable?"*

Ninguna de esas respuestas está en Google Sheets. No hay un nodo de n8n que la resuelva. La información existe — está en el catálogo de productos, en el documento de políticas, en la sección de preguntas frecuentes del sitio — pero el agente no puede acceder a esos documentos.

Eso es exactamente lo que resuelve RAG.

### El salto conceptual de hoy

> Hasta ahora, el agente sabía lo que le pusimos explícitamente en el system prompt o en las herramientas. Con RAG, el agente puede buscar en cientos de documentos del negocio y traer exactamente la información relevante para cada pregunta, en tiempo real.

---

## Bloque 1 — Teoría completa de RAG (0:15 – 0:50)

### ¿Qué significa RAG?

RAG son las siglas de **Retrieval-Augmented Generation** — Generación Aumentada por Recuperación.

La idea es sencilla en concepto: antes de pedirle a la IA que responda una pregunta, primero *buscamos* la información relevante en una base de conocimiento, y después se la *damos* a la IA como contexto para que genere la respuesta.

Sin RAG:
```
[Pregunta del usuario]
        ↓
[Modelo de IA] → responde con lo que sabe
        ↓
[Respuesta] ← puede ser desactualizada, genérica, o inventada
```

Con RAG:
```
[Pregunta del usuario]
        ↓
[Búsqueda en base de conocimiento] → fragmentos relevantes
        ↓
[Pregunta + fragmentos relevantes]
        ↓
[Modelo de IA] → responde usando la información real
        ↓
[Respuesta] ← precisa, actualizada, basada en los documentos del negocio
```

La diferencia fundamental: el modelo no inventa la información — la recibe.

---

### Embeddings: cómo la IA entiende el significado del texto

Para buscar por significado (no solo por palabras exactas), los documentos se tienen que convertir a un formato matemático. Ese formato se llama **embedding** o **vector**.

Un embedding es una lista de números (típicamente 1536 números para OpenAI ada-002) que representa el significado de un texto. Textos con significados similares tienen embeddings matemáticamente cercanos.

**Ejemplo concreto:**

| Texto | Conceptualmente similar a... |
|---|---|
| "¿Cuándo llega mi pedido?" | "¿En qué estado está mi envío?", "Quiero saber el estado de mi compra" |
| "El producto llegó dañado" | "Me llegó roto", "El paquete venía golpeado", "Tuve un problema con lo que recibí" |
| "¿Tienen talle XL?" | "¿Hay disponibilidad en talle extra large?", "¿Me queda en XL?" |

Esta similitud **no se mide por palabras en común** — se mide por cercanía matemática entre los vectores. Por eso RAG puede encontrar el fragmento relevante aunque el usuario use palabras completamente distintas a las del documento.

**Visualización simplificada:**

Imaginemos que el espacio de embeddings es un mapa en 2D (en realidad tiene 1536 dimensiones, pero el concepto es el mismo):

```
                        [cambio talla]
                           ↑
                    [devolver producto]
                    [talla incorrecta]  ←── estos están cerca
                           |
  [composición tela] ──────┼────── [cuidado del tejido]
                           |
               [fecha entrega] ── [estado pedido] ── [tracking]
                           ↓
                       [dónde está]
```

Cuando el usuario pregunta *"¿Me queda algo si lavé la remera en agua caliente?"*, su embedding va a estar cerca de *"cuidado del tejido"* y *"instrucciones de lavado"* — aunque no use ninguna de esas palabras exactas.

---

### La base de datos vectorial: dónde viven los embeddings

Una vez que convertimos los documentos a embeddings, necesitamos guardarlos en algún lugar desde donde se puedan buscar rápidamente. Para eso existen las **bases de datos vectoriales**.

A diferencia de una base de datos común (que busca por valores exactos), una base de datos vectorial busca por **similitud matemática**: dado un vector de consulta, encuentra los N vectores más cercanos en toda la colección.

**Opciones principales:**

| Herramienta | Tipo | Plan gratuito | Mejor para |
|---|---|---|---|
| **Supabase** (pgvector) | SQL con extensión vectorial | Sí, generoso | Proyectos que ya usan Supabase o PostgreSQL |
| **Pinecone** | Servicio especializado | Sí (1 índice gratuito) | Proyectos que necesitan escala y simplicidad |
| **Weaviate** | Open source | Self-hosted gratis | Proyectos con control total de infraestructura |
| **ChromaDB** | Open source, local | Gratis | Prototipado y desarrollo local |
| **Qdrant** | Open source | Self-hosted / cloud | Alta performance, producción |

Para el programa usamos **Supabase con pgvector** porque:
1. Tiene integración nativa en n8n
2. El plan gratuito es suficiente para los casos del programa
3. También sirve como base de datos regular (no solo vectorial)
4. Permite combinar búsqueda vectorial con filtros SQL estándar

---

### El pipeline completo de RAG paso a paso

**Fase 1 — Indexación (se hace una sola vez o cuando cambian los documentos)**

```
[Documentos del negocio]
   catálogo.md, políticas.md, faq.md, etc.
          ↓
[Fragmentación (chunking)]
   Dividir en trozos de 500-1000 palabras
   con superposición de 100 palabras para
   no perder contexto en los bordes
          ↓
[Generación de embeddings]
   Cada fragmento → API de OpenAI Embeddings
   → vector de 1536 números
          ↓
[Almacenamiento en Supabase]
   Guardar: texto original + vector + metadatos
   (fuente, fecha, sección, etc.)
```

**Fase 2 — Consulta (se hace cada vez que el agente necesita información)**

```
[Pregunta del usuario al agente]
          ↓
[Generar embedding de la pregunta]
   La misma API de embeddings
          ↓
[Búsqueda de similitud en Supabase]
   Comparar el vector de la pregunta
   contra todos los vectores guardados
   → top 3 a 5 fragmentos más relevantes
          ↓
[Construir el prompt aumentado]
   system prompt + fragmentos recuperados + pregunta del usuario
          ↓
[Modelo de IA genera la respuesta]
   Basándose en los fragmentos recuperados,
   no en su entrenamiento general
```

---

### Chunking: cómo dividir los documentos correctamente

El **chunking** (fragmentación) es uno de los aspectos más críticos de RAG y el que más afecta la calidad de las respuestas. Si los fragmentos son muy grandes, traen información irrelevante. Si son muy pequeños, pierden contexto.

**Estrategias de chunking:**

| Estrategia | Cómo funciona | Cuándo usarla |
|---|---|---|
| **Por caracteres** | Cortar cada N caracteres | Textos sin estructura clara |
| **Por párrafos** | Cortar en cada salto de línea doble | Artículos, políticas, FAQs |
| **Por secciones** | Cortar en cada encabezado (H1, H2) | Documentación estructurada |
| **Semántica** | Detectar cambios de tema con IA | Textos complejos y largos |
| **Recursiva** | Intentar por sección, luego párrafo, luego carácter | Uso general, es la más robusta |

**La superposición (overlap):** cuando se corta el texto en fragmentos, siempre conviene incluir 100-200 caracteres del final de un fragmento al inicio del siguiente. Esto evita que una idea que cruza el límite de dos fragmentos se pierda.

**Ejemplo de chunking para la política de cambios de Lumina:**

```
Fragmento 1 (con overlap):
"...Lumina acepta cambios y devoluciones dentro de los 30 días
corridos desde la fecha de compra. El producto debe estar en su
estado original, sin uso, con etiquetas y en su embalaje original.
Para iniciar el proceso, el cliente debe comunicarse..."

Fragmento 2:
"...Para iniciar el proceso, el cliente debe comunicarse con el equipo
de atención al cliente vía email a cambios@lumina.com o a través
del formulario en el sitio. El tiempo de procesamiento es de 5 a 7
días hábiles una vez recibido el producto..."
```

El overlap garantiza que el modelo entienda la continuidad entre fragmentos.

---

### El parámetro k: cuántos fragmentos recuperar

Cuando se hace la búsqueda vectorial, se recuperan los `k` fragmentos más cercanos al vector de consulta. Elegir bien `k` es importante:

| k bajo (1-2) | k medio (3-5) | k alto (8-10) |
|---|---|---|
| Respuestas muy focalizadas | Balance ideal para la mayoría de los casos | Mucho contexto, puede confundir al modelo |
| Puede perderse información relevante | Cubre la pregunta desde varios ángulos | Aumenta el costo (más tokens) |
| Útil para preguntas muy específicas | Recomendado para preguntas generales | Útil para síntesis de múltiples documentos |

Para el caso del programa, `k = 4` es un buen punto de partida. Se puede ajustar después de ver los resultados.

---

## Bloque 2 — Herramientas: Supabase + pgvector + n8n (0:50 – 1:15)

### Configurar Supabase para RAG

**Paso 1 — Crear la cuenta y el proyecto**
1. Ir a supabase.com → Sign up con GitHub o email
2. "New Project" → elegir nombre y contraseña de la base de datos
3. Región: South America (São Paulo) para menor latencia

**Paso 2 — Habilitar la extensión pgvector**

En el editor SQL de Supabase (menú izquierdo → "SQL Editor"):

```sql
-- Habilitar la extensión vectorial
CREATE EXTENSION IF NOT EXISTS vector;

-- Crear la tabla de documentos
CREATE TABLE documentos_lumina (
  id BIGSERIAL PRIMARY KEY,
  contenido TEXT NOT NULL,
  embedding VECTOR(1536),
  fuente VARCHAR(255),
  seccion VARCHAR(255),
  fecha_actualizacion TIMESTAMP DEFAULT NOW()
);

-- Crear el índice para búsqueda eficiente
CREATE INDEX ON documentos_lumina
USING ivfflat (embedding vector_cosine_ops)
WITH (lists = 100);
```

**Paso 3 — Crear la función de búsqueda**

```sql
-- Función que busca los k fragmentos más similares a un vector dado
CREATE OR REPLACE FUNCTION buscar_similares(
  query_embedding VECTOR(1536),
  match_count INT DEFAULT 4,
  similarity_threshold FLOAT DEFAULT 0.7
)
RETURNS TABLE (
  id BIGINT,
  contenido TEXT,
  fuente TEXT,
  seccion TEXT,
  similarity FLOAT
)
LANGUAGE SQL STABLE AS $$
  SELECT
    id,
    contenido,
    fuente,
    seccion,
    1 - (embedding <=> query_embedding) AS similarity
  FROM documentos_lumina
  WHERE 1 - (embedding <=> query_embedding) > similarity_threshold
  ORDER BY embedding <=> query_embedding
  LIMIT match_count;
$$;
```

El docente explica cada parte del SQL sin asumir conocimiento previo:
- `VECTOR(1536)`: tipo de dato especial para guardar un array de 1536 números
- `<=>`: operador de distancia coseno entre vectores (menos es más similar)
- `1 - (...)`: convierte distancia en similitud (1 = idéntico, 0 = sin relación)

**Paso 4 — Obtener las credenciales**

En Supabase → "Project Settings" → "API":
- `Project URL`: la dirección de tu proyecto
- `service_role key`: la clave de acceso (guardar en VS Code en el archivo `.env`)

---

### Configurar el nodo de embeddings en n8n

Para generar embeddings, se usa el nodo **Embeddings OpenAI** en n8n:

1. Buscar "Embeddings OpenAI" en el catálogo de nodos
2. Credencial: la API key de OpenAI (ya configurada)
3. Model: `text-embedding-ada-002` (el más eficiente para RAG — barato y muy bueno)

**Costo de los embeddings:** `text-embedding-ada-002` cuesta $0.0001 por 1000 tokens. Un catálogo de 50 páginas (~50.000 tokens) cuesta aproximadamente $0.005 — menos de un peso argentino al tipo de cambio actual. Cargar la base de conocimiento es prácticamente gratuito.

---

### El flujo de indexación en n8n

El docente construye el flujo de indexación que se ejecuta una sola vez (o cada vez que se actualiza un documento):

```
[Manual Trigger o Schedule]
          ↓
[Google Drive / HTTP Request: leer el documento]
          ↓
[Code: dividir el documento en fragmentos]
          ↓
[Embeddings OpenAI: convertir cada fragmento a vector]
          ↓
[Supabase: INSERT del fragmento + vector + metadatos]
```

**El nodo Code para chunking:**

```javascript
// Recibe el texto completo del documento
const texto = $input.item.json.content;
const fuente = $input.item.json.filename || "documento";
const seccion = $input.item.json.folder || "general";

const CHUNK_SIZE = 800; // caracteres por fragmento
const OVERLAP = 150;    // superposición entre fragmentos

const fragmentos = [];
let inicio = 0;

while (inicio < texto.length) {
  const fin = Math.min(inicio + CHUNK_SIZE, texto.length);
  
  // Intentar cortar en un salto de párrafo cercano
  let corte = fin;
  if (fin < texto.length) {
    const saltoParrafo = texto.lastIndexOf('\n\n', fin);
    const saltoPunto = texto.lastIndexOf('. ', fin);
    
    if (saltoParrafo > inicio + CHUNK_SIZE * 0.5) {
      corte = saltoParrafo + 2; // preferir salto de párrafo
    } else if (saltoPunto > inicio + CHUNK_SIZE * 0.5) {
      corte = saltoPunto + 2;   // si no, cortar en punto
    }
  }
  
  const fragmento = texto.slice(inicio, corte).trim();
  if (fragmento.length > 50) { // ignorar fragmentos muy cortos
    fragmentos.push({
      json: {
        contenido: fragmento,
        fuente: fuente,
        seccion: seccion,
        indice: fragmentos.length
      }
    });
  }
  
  // Avanzar con overlap
  inicio = Math.max(inicio + 1, corte - OVERLAP);
}

return fragmentos;
```

El docente abre este código en VS Code con el explorador de archivos visible, lo escribe en el archivo `scripts/chunker.js` y lo pega en el nodo Code de n8n. Esto ilustra el flujo de trabajo: editar en VS Code, copiar a n8n.

---

### El flujo de consulta en n8n (usado por el agente)

```
[Pregunta del agente]
          ↓
[Embeddings OpenAI: convertir pregunta a vector]
          ↓
[Supabase: llamar a función buscar_similares]
          ↓
[Set: formatear los fragmentos como contexto]
          ↓
[OpenAI: generar respuesta usando el contexto]
```

**El nodo Set para formatear el contexto:**

```javascript
// Los fragmentos recuperados se formatean para el prompt
const fragmentos = $input.all();
const contexto = fragmentos
  .map((f, i) =>
    `[Fuente: ${f.json.fuente} | Sección: ${f.json.seccion}]\n${f.json.contenido}`
  )
  .join('\n\n---\n\n');

return [{
  json: {
    contexto_recuperado: contexto,
    cantidad_fragmentos: fragmentos.length,
    fuentes: [...new Set(fragmentos.map(f => f.json.fuente))].join(', ')
  }
}];
```

**El system prompt del agente aumentado con RAG:**

```
Sos el asistente de Lumina con acceso a la base de conocimiento del negocio.

Cuando respondas preguntas sobre productos, políticas, procedimientos o preguntas
frecuentes, SIEMPRE basá tu respuesta en la información del contexto proporcionado.

Si la información no está en el contexto, decilo claramente: "No tengo información
sobre ese tema en nuestra base de conocimiento." No inventes datos.

Si la información está parcialmente en el contexto, respondé con lo que tenés
y aclará qué parte no está confirmada.

CONTEXTO DE LA BASE DE CONOCIMIENTO:
{{ $json.contexto_recuperado }}

---
```

---

## Bloque 3 — La base de conocimiento de Lumina, construida en vivo (1:15 – 1:40)

### Los documentos de Lumina para RAG

El docente tiene preparados tres documentos de Lumina que va a indexar en Supabase:

**Documento 1: `catalogo-productos.md`**
Descripción detallada de cada producto: composición de tela, talles disponibles, colores, instrucciones de cuidado, origen, guía de talles.

**Documento 2: `politicas.md`**
Política de cambios y devoluciones, plazos, condiciones, excepciones, política de privacidad, términos de compra.

**Documento 3: `preguntas-frecuentes.md`**
Las 40 preguntas más frecuentes del equipo de atención: envíos, métodos de pago, talles, stock, outlet, descuentos, programa de fidelidad.

### Construcción en vivo

**Paso 1 — Subir los documentos a Google Drive**

El docente muestra cómo organizar los documentos en VS Code:

```
📁 lumina-knowledge-base/
  📄 catalogo-productos.md
  📄 politicas.md
  📄 preguntas-frecuentes.md
  📄 metadata.json   ← describe cada documento
```

**Paso 2 — Ejecutar el flujo de indexación**

El docente ejecuta el flujo de indexación en n8n y muestra en tiempo real cómo aparecen las filas en Supabase. Después de indexar los tres documentos, la tabla tiene aproximadamente 80-120 fragmentos.

**Paso 3 — Verificar la indexación en Supabase**

En el editor SQL de Supabase:

```sql
-- Verificar cuántos fragmentos se indexaron por fuente
SELECT fuente, COUNT(*) as cantidad, AVG(LENGTH(contenido)) as largo_promedio
FROM documentos_lumina
GROUP BY fuente;

-- Hacer una búsqueda de prueba (el embedding es un ejemplo simplificado)
-- En la práctica, la búsqueda se hace desde n8n con el embedding real
SELECT contenido, fuente, similarity
FROM buscar_similares(
  '[0.01, -0.02, 0.03, ...]'::vector,  -- embedding de prueba
  4,
  0.7
);
```

**Paso 4 — Integrar la búsqueda al agente**

El docente agrega una nueva herramienta al agente del Bloque 4:

```
Herramienta: consultar_base_de_conocimiento
Descripción: Busca información en la base de conocimiento de Lumina.
Usar cuando: el cliente pregunta sobre características de productos,
políticas de la tienda, procedimientos, preguntas frecuentes, composición
de telas, guía de talles, métodos de pago, o cualquier información
sobre cómo funciona Lumina.
NO usar para: buscar el estado de un pedido específico (usar buscar_pedido).
Parámetro: pregunta (string) — la pregunta del cliente tal como la escribió.
```

### Prueba en vivo: comparación antes y después de RAG

El docente envía el mismo email antes y después de conectar RAG:

**Email:** *"Hola, quiero saber qué diferencia hay entre la Remera Slim y la Urban. Cuál es más suave al tacto y cuál resiste mejor los lavados."*

**Sin RAG:**
> Hola, lamentablemente no tengo información detallada sobre las características técnicas de esos productos. Te recomiendo consultar el sitio web de Lumina o contactar al equipo de atención. Equipo Lumina.

**Con RAG** (usando el catálogo indexado):
> Hola, buena pregunta. La Remera Slim está hecha en jersey de algodón 100% peinado (180g/m²), que es suave al tacto y se caracteriza por un acabado liso con caída. La Remera Urban usa una mezcla de algodón 85% y elastano 15% (220g/m²), que ofrece mayor elasticidad y recupera mejor la forma después del lavado.
>
> Para la durabilidad: la Urban, por el elastano, tiende a mantener mejor la forma con lavados frecuentes. La Slim es más delicada y recomendamos lavarla a 30°C. Ambas admiten secado a la sombra.
>
> Equipo Lumina.

La diferencia es radical — la segunda respuesta usa información real del catálogo que el agente encontró en la base de conocimiento.

---

## Ejercicio práctico (1:40 – 1:55)

> Cada participante crea su primera base de conocimiento y la indexa en Supabase.

### Paso 1 — Preparar los documentos en VS Code (5 min)

Crear la carpeta `knowledge-base/` en el proyecto de VS Code. Dentro, crear al menos un documento `.md` con información real del negocio. Puede ser:

- La descripción de los productos o servicios
- Las preguntas más frecuentes que llegan por email
- La política de atención o devoluciones
- El catálogo de precios actualizado

**Tip de VS Code:** usar la extensión **"Markdown Preview Enhanced"** para previsualizar el documento mientras se escribe. Asegurarse de que la estructura es clara: usar encabezados (`##`) para separar secciones, ya que el chunker los puede usar como puntos de corte naturales.

---

### Paso 2 — Configurar Supabase (5 min)

1. Crear cuenta en supabase.com si no se tiene
2. Crear un nuevo proyecto
3. Ejecutar el SQL de creación de tabla y función (copiar el de la clase)
4. Guardar el `Project URL` y la `service_role key` en un archivo `.env` en VS Code:

```bash
# .env — NUNCA subir este archivo a GitHub
SUPABASE_URL=https://tu-proyecto.supabase.co
SUPABASE_KEY=tu-service-role-key
OPENAI_API_KEY=sk-...
```

**Tip de VS Code:** instalar la extensión **"DotENV"** para que el archivo `.env` tenga coloreado de sintaxis. Agregar `.env` al archivo `.gitignore` del proyecto para que nunca se suba a GitHub con las claves.

---

### Paso 3 — Ejecutar el flujo de indexación (5 min)

1. Importar el flujo de indexación que mostró el docente (disponible para descarga)
2. Configurar las credenciales de Supabase en n8n
3. Conectar el documento de VS Code (subir a Google Drive o usar un nodo HTTP Request que lea el archivo)
4. Ejecutar el flujo
5. Verificar en Supabase que los fragmentos aparecen en la tabla

---

## Cierre (1:55 – 2:00)

El docente muestra el contador de fragmentos indexados del grupo:

> Cada uno de los negocios de esta sala acaba de darle a su agente acceso a información que antes solo existía en documentos sueltos que nadie podía consultar rápido. Eso es lo que hace RAG — no es magia, es indexación inteligente. El agente no "aprendió" nada en el sentido de entrenamiento; simplemente ahora puede buscar en los documentos del negocio antes de responder. Esa distinción importa: si el documento tiene un error, el agente va a repetir ese error. La calidad de RAG depende de la calidad de los documentos.

---

## Tarea de la semana

### Expandir y refinar la base de conocimiento

1. **Indexar al menos 3 documentos distintos** del negocio. Buscar:
   - El documento de preguntas frecuentes (si existe)
   - La descripción de todos los productos o servicios
   - La política de atención al cliente o procedimientos

2. **Probar con 10 preguntas reales** que llegaron por email las últimas semanas. Para cada una:
   - ¿El agente con RAG la respondió correctamente?
   - ¿Qué fragmento recuperó para responder?
   - ¿La respuesta era precisa o contenía errores?

3. **Refinar los documentos** según los resultados:
   - Si el agente no encontró información → agregarla al documento
   - Si encontró información incorrecta → corregirla en el documento fuente y re-indexar
   - Si el fragmento era demasiado corto o demasiado largo → ajustar el CHUNK_SIZE en el nodo Code

4. **Registrar en VS Code** (`knowledge-base/eval-resultados.md`): las 10 preguntas, la respuesta generada y si fue correcta o no.

### El ciclo de mejora continua de RAG

```
Agregar/corregir documento → Re-indexar → Probar → Evaluar → Repetir
```

RAG mejora con los documentos. Un sistema RAG mediocre con buenos documentos supera a un sistema RAG perfecto con documentos pobres.

---

## Recursos y herramientas

| Herramienta | Para qué | Cómo acceder |
|---|---|---|
| Supabase | Base de datos vectorial + pgvector | supabase.com — plan gratuito |
| OpenAI Embeddings API | Convertir texto a vectores | platform.openai.com (text-embedding-ada-002) |
| n8n RAG Chain | Integración nativa de RAG en n8n | cloud.n8n.io |
| VS Code + DotENV ext. | Manejar credenciales de forma segura | marketplace.visualstudio.com |
| pgvector docs | Documentación de la extensión vectorial | github.com/pgvector/pgvector |

---

## Glosario de la clase

| Término | Definición |
|---|---|
| **RAG** | Retrieval-Augmented Generation: buscar información relevante antes de generarla |
| **Embedding** | Representación numérica (vector) del significado de un texto |
| **Vector** | Array de números que representa un texto en un espacio matemático multidimensional |
| **Base de datos vectorial** | Base de datos optimizada para búsquedas de similitud entre vectores |
| **Chunking** | División de documentos largos en fragmentos manejables para indexar |
| **Overlap** | Superposición de texto entre fragmentos consecutivos para preservar el contexto |
| **k (en RAG)** | Cantidad de fragmentos relevantes a recuperar para cada consulta |
| **Similitud coseno** | Medida matemática de similitud entre dos vectores (0 a 1) |
| **Threshold** | Umbral mínimo de similitud para considerar un fragmento relevante |
| **Re-indexación** | Volver a convertir y guardar los documentos cuando se actualizan |

---

*AI Automation — Diplomatura No-Code · Bloque 5: Sistemas avanzados · Clase 21 de 25*
