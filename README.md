# Evaluación Técnica – Mobile Engineer (React Native / Expo)

## Objetivo

El objetivo de esta evaluación es comprender el enfoque de la persona candidata al momento de diseñar, estructurar y desarrollar una aplicación mobile real, así como su capacidad para resolver problemas habituales de producto, arquitectura y performance.

No se espera una solución perfecta ni completamente finalizada, sino una implementación **funcional, clara y bien fundamentada**, con foco en buenas prácticas de desarrollo.

---

## Contexto

Se provee una aplicación base desarrollada con **Expo + React Native**, que incluye:

- Store global de **Redux** ya configurado
- Arquitectura básica de acceso a API
- Pantalla de **Login parcialmente implementada**
- Pantalla de **Chat base implementada**
- Ejemplo funcional de **socket listener para mensajes de texto**
- Un **problema de performance introducido de manera intencional** (performance leak)

A partir de esto, se deberá completar y extender la aplicación.

---

## Uso de la API

Hemos desarrollado una API de mensajería básica para que puedas probar la aplicación. Podés acceder a ella a través del siguiente link:

👉 https://github.com/toremsoftware/messaging-api-for-eval

Dentro del archivo README.md vas a encontrar las instrucciones para levantarla de forma local. Ten en cuenta que esta API tiene como único objetivo facilitar el desarrollo de la aplicación; no es necesario ni esperado que realices cambios sobre ella, ya que no forma parte de la evaluación.

---

## Alcance del desafío

### 1. Autenticación y Splash Screen

- Implementar una **Splash Screen** inicial
- Completar la implementación del **Login**, utilizando **React Query** para la comunicación con la API
- Al autenticarse correctamente:
  - Persistir el token en el dispositivo (mecanismo de almacenamiento a elección)
- Al iniciar la aplicación:
  - Si existe un token válido almacenado, se deberá ingresar directamente a la aplicación
  - En caso contrario, se deberá mostrar la pantalla de Login

---

### 2. Navegación

- Agregar en el Header del chat un botón de Logout e implementar el **ruteo de pantallas** entre:
  - Login
  - Chats
- Se puede utilizar:
  - Una librería de navegación
  - O una solución nativa/custom

La elección queda a criterio de la persona candidata.

---

### 3. Mensajería

#### Envío de mensajes

- Implementar envío de **mensajes de imagen** (layout en Message/Layout/Image.tsx):
  - Utilizando **expo-camera**
  - Agregar un botón de adjuntar a la izquierda del input y al presionarlo se deberá abrir un **Action Sheet** con las siguientes opciones:
    - Cámara (habilitada)
    - Fototeca (deshabilitada)
    - Archivo (deshabilitada)
    - Audio (deshabilitada)

> Las opciones deshabilitadas deben ser visibles, pero no funcionales.

#### Recepción de mensajes

- Implementar la **recepción de mensajes vía socket**: Si todo lo anterior se realizó correctamente, esto debería funcionar automáticamente con el socket listener de nuevo mensaje ya implementado.

---

### 4. Listado de mensajes

- Implementar **paginación de mensajes**
- Utilizar **virtualización** para el renderizado del listado
- Tener en cuenta consideraciones de performance y escalabilidad del chat

---

### 5. Performance

- La aplicación contiene **un problema de performance introducido de manera intencional**
- Se espera que:
  - El problema sea identificado
  - Se explique brevemente su causa
  - Se proponga y/o implemente una solución (total o parcial)

---

## Adicionales (no excluyentes)

Los siguientes puntos no son obligatorios, pero serán considerados un plus:

- Propuestas de mejora de **arquitectura** y/o **performance** general de la aplicación
- Integración de **NativeWind**:
  - Instalación
  - Uso en al menos algunas pantallas o componentes
- Implementación de un sistema de **notificaciones o feedback visual** para errores en la comunicación con la API

---

## Criterios de evaluación

- Claridad y calidad del código
- Organización del proyecto
- Manejo de estado y side effects
- Uso adecuado de hooks
- Manejo de errores
- Decisiones técnicas y fundamentos
- Identificación y resolución de problemas de performance

---

## Entrega

- Repositorio con el código final
- README actualizado (puede ser este mismo) que incluya:
  - Decisiones técnicas relevantes
  - Posibles mejoras con más tiempo disponible
  - Problemas detectados (por ejemplo, el performance leak)

Para entregar la evaluación, deberás comprimir la solución en un archivo `.zip` (no `.rar`) y subirla en el siguiente formulario: https://forms.gle/g3j5m5C8ZEV42yxU8.

---

## Notas finales

No existe una única forma correcta de resolver el desafío. Se valoran especialmente las soluciones simples, claras y bien razonadas, por sobre implementaciones innecesariamente complejas.

Desde el equipo de Torem te deseamos mucha suerte! 🍀

## Notas de de implementación

Con respecto a las mejoras de performance: 
1) note que el listado de mensajes se hacía Object.values(...) + sort(...) en cada actualización del chat.
Es decir, por cada cambio, se creaba un nuevo array y se ordenaba, por lo que creí que esto afectaba el rendimiento y considere que seria conveniente 
mantener el orden en el store y no en la UI por cada render o actualización. 

Entonces: Agregue al store un array de ids ordenado, esto permite que la UI renderice directamente ese array sin necesidad de ordenar. 
Acciones:
- setChatEvents ordena una sola vez la carga inicial y guarda messageIds.
- setAddEvent hace unshift (mensajes nuevos).

En resumen: Menos creación de arrays, menos GC, y FlatList recibe una lista estable de IDs.

2) Modifique el useLayoutEffect que habia al momento de traer los mensajes, ya que para una petición async no aportaba mucho y puede hacer que la pantalla “tarde” más en mostrarse. useEffect deja pintar primero y luego corre el fetch, considere que es una solución mas liviana en este caso.

Con respecto a las mejoras de arquitectura:
Veo las capaz bien separadas, con la capa de API aplicando el Repository + Service, lo cual me parece interesante, 
La UI separada por features, aplicando custom hooks en los diferentes casos.

Como punto de mejora quizas que a medida que la aplicación crece, considerar manejar alguna capa mas modular, separando modulos con la UI y sus utils o customHooks y que no se concentre todo de manera global como se encuentra ahora.


