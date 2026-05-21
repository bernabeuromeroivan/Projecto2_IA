# Plan de Trabajo - Enquesta d'Aula (IA4)

## Objetivo General

Crear una aplicación web funcional para recopilar valoraciones de aula (1-5), comentarios opcionales y grupo, con un panel analítico que muestre resúmenes y gráficas en tiempo real. Todo en local, sin persistencia en BD.

**Duración orientativa:** ~2 horas  
**Stack:** HTML5 + CSS + JavaScript (vanilla, sin frameworks)

---

## Ejercicio 1: Estructura y Datos de Prueba (~20 min)

### Objetivo

Crear página con dos zonas (formulario + panel) y datos de prueba iniciales.

### Tareas

- [ ] Crear `index.html` con estructura 2 columnas
- [ ] Crear `styles.css` con layout responsivo
- [ ] Crear `app.js` con array `respostes` de 3-5 ejemplos
- [ ] Verificar que formulario y panel se ven correctamente

### Verificación

- ✅ Se ve formulario vacío (esquerra)
- ✅ Se ve panel vacío (dreta)
- ✅ Array `respostes` tiene objetos con: `{id, grup, puntuacio, comentari, data}`

### Datos de Prueba

```javascript
const respostes = [
  {
    id: 1,
    grup: "DAW1A",
    puntuacio: 5,
    comentari: "Classe interessant",
    data: "...",
  },
  {
    id: 2,
    grup: "DAW1B",
    puntuacio: 4,
    comentari: "Bé, massa teoria",
    data: "...",
  },
  { id: 3, grup: "DAW1A", puntuacio: 3, comentari: "Normal", data: "..." },
  { id: 4, grup: "ASIX1", puntuacio: 5, comentari: "Excelent", data: "..." },
  { id: 5, grup: "DAW1B", puntuacio: 2, comentari: "Massa ràpid", data: "..." },
];
```

---

## Ejercicio 2: Formulario y Guardar (~30 min)

### Objetivo

Implementar formulario funcional que valida y agrega nuevas respuestas.

### Tareas

- [ ] Crear `<select>` grupo: DAW1A, DAW1B, ASIX1
- [ ] Crear puntuación 1-5 (radio buttons)
- [ ] Crear textarea comentario (opcional, máx 200 carácteres)
- [ ] Crear botón "Guardar"
- [ ] Validar: grupo obligatorio, puntuación obligatoria, comentario ≤ 200 chars
- [ ] Al guardar: crear objeto, push a array, limpiar form, refrescar panel

### Verificación

- ✅ No se puede guardar sin grupo
- ✅ No se puede guardar sin puntuación
- ✅ Comentario rechaza >200 caracteres
- ✅ Después de guardar, panel actualiza
- ✅ Formulario se limpia después de guardar

### Estructura del Objeto

```javascript
{
  id: proximoId++,
  grup: 'DAW1A',
  puntuacio: 4,
  comentari: 'Comentario opcional',
  data: new Date().toISOString()
}
```

---

## Ejercicio 3: KPIs y Filtro (~35 min)

### Objetivo

Mostrar estadísticas clave y permitir filtrar por grupo.

### Tareas

- [ ] Crear `<select>` filtro: Tots, DAW1A, DAW1B, ASIX1
- [ ] Calcular **Total de respostes** del filtro
- [ ] Calcular **Puntuació mitjana** (1 decimal) del filtro
- [ ] Calcular **% de notes 4-5 (positives)** del filtro
- [ ] Mostrar KPIs en cards visuales
- [ ] Actualizar KPIs al cambiar filtro
- [ ] Manejar caso con 0 respostes (mostrar "-" o 0)

### Verificación

- ✅ Filtro "Tots" muestra todos los datos
- ✅ Filtro "DAW1A" muestra solo DAW1A
- ✅ KPIs se recalculan al cambiar filtro
- ✅ Con 0 respostes no hay error
- ✅ Media con 1 decimal (ej: 3.8)
- ✅ % positivas es número entero (ej: 60%)

### Fórmulas

```javascript
Total = respostes.length
Media = (sum(puntuaciones) / total).toFixed(1)
% Positivas = Math.round((count(4-5) / total) * 100)
```

---

## Ejercicio 4: Gráfica de Barras (~25 min)

### Objetivo

Mostrar distribución de puntuaciones (1-5) con gráfica visual.

### Tareas

- [ ] Crear `<canvas>` para gráfica
- [ ] Contar respostes por puntuación (1, 2, 3, 4, 5)
- [ ] Dibujar barras verticales con canvas API (sin librerías)
- [ ] Mostrar número de respostes en cada barra
- [ ] Etiquetar eje X: 1, 2, 3, 4, 5
- [ ] Actualizar gráfica al cambiar filtro
- [ ] Manejar caso con 0 datos

### Verificación

- ✅ Barras corresponden con recuento real
- ✅ Altura de barras proporcional al número
- ✅ Etiquetas visibles (1-5)
- ✅ Se actualiza con filtro
- ✅ Responsive (se adapta al ancho)

### Lógica

```javascript
const distribucion = [0, 0, 0, 0, 0];
datos.forEach((r) => distribucion[r.puntuacio - 1]++);
// Distribucion[0] = cantidad de notas 1
// Distribucion[4] = cantidad de notas 5
```

---

## Ejercicio 5: Llistat de Respostes (~10 min)

### Objetivo

Mostrar tabla con todas las respuestas del filtro activo.

### Tareas

- [ ] Crear tabla con columnas: Grup, Puntuació, Comentari, Data
- [ ] Mostrar solo respostes del filtro actual
- [ ] Ordenar por fecha descendente (más recientes primero)
- [ ] Código de color por puntuación (verde 4-5, amarillo 3, rojo 1-2)
- [ ] Actualizar tabla al cambiar filtro
- [ ] Formatear fecha: "21/05/2026 15:30"

### Verificación

- ✅ Tabla muestra datos filtrados
- ✅ Ordenados más recientes primero
- ✅ Colores coherentes con puntuación
- ✅ Se actualiza con filtro
- ✅ Comentarios vacíos muestran "-"

### Formato de Fila

```
| DAW1A | 4/5 (verde) | "Muy bien" | 21/05/2026 15:30 |
| DAW1B | 3/5 (amari) | "Normal"   | 20/05/2026 14:15 |
```

---

## Ejercicio 6: Revisión y Testing (~10 min)

### Objetivo

Revisar código con IA y validar funcionamiento completo.

### Tareas

- [ ] Pedir a Copilot/Claude que revise el código
- [ ] Revisar puntos clave:
  - ✅ Validación 1-5 correcta
  - ✅ Filtro Todos/grupo funciona
  - ✅ KPIs coherentes con datos
  - ✅ Gráfica corresponde con tabla
  - ✅ Sin errores en consola
- [ ] Probar manualmente:
  1. Cargar página → ves 5 respostes iniciales
  2. Cambiar filtro a "DAW1A" → solo 2 respostes, KPIs actualizados
  3. Guardar nueva respuesta
  4. Verificar que se agregó en tabla
  5. Verificar que KPIs se actualizaron
  6. Verificar que gráfica cambió

### Pruebas Manuales

```
1. Test filtro:
   - Todos: 5 total, media ~3.8, 60% positivas
   - DAW1A: 2 total, media 4, 100% positivas
   - DAW1B: 2 total, media 3, 50% positivas
   - ASIX1: 1 total, media 5, 100% positivas

2. Test guardar:
   - Llenar formulario
   - Click Guardar
   - Verificar en tabla (primera fila)
   - Verificar cambio en KPIs
   - Verificar cambio en gráfica

3. Test validación:
   - No grupo: error alert
   - No puntuación: error alert
   - Comentario >200: error alert
```

---

## Estructura de Archivos Final

```
Projecto2_IA/
├── index.html          # Estructura HTML pura
├── styles.css          # Estilos responsivos
├── app.js              # Lógica JavaScript
├── PLAN_TRABAJO.md     # Este archivo
└── README.md           # (Opcional) Instrucciones de uso
```

---

## Checklist de Completitud IA4

Antes de pasar a IA3:

- [ ] **Archivo 1:** index.html importa styles.css y app.js
- [ ] **Archivo 2:** styles.css contiene todo el CSS
- [ ] **Archivo 3:** app.js contiene toda lógica
- [ ] **Funcionamiento:** Abre en navegador sin errores
- [ ] **Formulario:** Valida y guarda respuestas
- [ ] **Filtro:** Tots y por grupo funcionan
- [ ] **KPIs:** Total, media, % positivas correctos
- [ ] **Gráfica:** Barras visibles y coherentes
- [ ] **Tabla:** Ordenada, coloreada, actualizada
- [ ] **Responsivo:** Se ve bien en móvil y desktop
- [ ] **Sin errores:** Consola limpia (F12)

---

## Notas Técnicas

### Validación

```javascript
- Grupo: required (select)
- Puntuación: required (radio)
- Comentario: maxlength=200, validar length antes de guardar
```

### Colores Puntuación

```css
- 4-5: Verde (#d4edda / #155724)
- 3: Amarillo (#fff3cd / #856404)
- 1-2: Rojo (#f8d7da / #721c24)
```

### Formato Fecha

```javascript
new Date().toLocaleDateString("ca-ES"); // 21/05/2026
new Date().toLocaleTimeString("ca-ES"); // 15:30:45
```

### Canvas Setup

```javascript
canvas.width = canvas.offsetWidth; // Responsive
const ctx = canvas.getContext("2d");
```

---

## Prompts Sugeridos para IA

### Prompt 1 (Estructura)

> "Crea un HTML con dos columnas: formulario a la izquierda con selects y textareas, panel a la derecha con espacios para KPIs, gráfica y tabla. CSS responsivo. JS con array 'respostes' con 5 ejemplos."

### Prompt 2 (Validación)

> "Agrega validación al formulario: grupo obligatorio, puntuación 1-5 obligatoria, comentario max 200. Al guardar, crea objeto ISO date, push a array, limpia form, llama a refrescaPanel()."

### Prompt 3 (KPIs)

> "Crea función calcularEstadisticas(respostes, grupFiltre) que retorne total, media, % positivas. Rellena en KPI cards. Filtra por grupo si grupFiltre !== 'TOTS'."

### Prompt 4 (Gráfica)

> "Dibuja barras en canvas: eje X 1-5, eje Y cantidad. Sin librerías. Contar distribucion[5] basado en puntuaciones."

### Prompt 5 (Tabla)

> "Genera tabla dinámicamente: grupo, puntuación (con color), comentario, fecha. Ordena descendente por date. Actualiza al cambiar filtro."

---

## Entrega IA4

Cuando termines, crea nota de entrega con:

```markdown
## Entrega IA4 - Enquesta d'Aula

### Archivos

- ✅ index.html
- ✅ styles.css
- ✅ app.js
- ✅ PLAN_TRABAJO.md

### Funcionalidades Completadas

1. ✅ Formulario con validación
2. ✅ Guardar respostes en array
3. ✅ Filtro por grupo (Tots, DAW1A, DAW1B, ASIX1)
4. ✅ KPIs: total, media, % positivas
5. ✅ Gráfica de barras distribución 1-5
6. ✅ Tabla ordenada por fecha (descendente)
7. ✅ Coloreado por puntuación
8. ✅ Responsive (desktop + móvil)

### Testing Realizado

- Cargué app: 5 respostes iniciales visibles ✅
- Cambié filtros: KPIs y gráfica se actualizan ✅
- Guardé 2 nuevas respostes: aparecen en tabla ✅
- Validación: rechaza grupo vacío, puntuación vacía ✅
- Sin errores en consola ✅

### Prompts IA Usados

1. Estructura HTML + CSS (Copilot)
2. Validación formulario (Copilot)
3. Cálculo KPIs (Copilot)
4. Gráfica canvas (Copilot)
5. Tabla dinámica (Copilot)

### Código Revisado Personalmente

- ✅ Validación: corrección en lógica comparación (1-5)
- ✅ Filtro: cambié condición para que Tots = array completo
- ✅ KPIs: ajusté decimales en media
- ✅ Gráfica: reescalé barras para mejor proporción
- ✅ Tabla: ordené correctamente por fecha
```

---

**Estado Actual:** ⏳ En progreso - Ejercicio 1-5  
**Próximo Paso:** IA3 (GitHub + Vercel)  
**Después:** IA5 (Supabase)
