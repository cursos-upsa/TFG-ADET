## Trabajo de Fin de Grado
# Desarrollo de un sistema inteligente de apoyo al proceso pedagógico
**Autor**: Enrique Redondo Cortés

Aplicación web desarrollada como Trabajo Fin de Grado para el grado en Administración y Dirección de Empresas Tecnológicas (ADET). Junio del 2025.

## Descripción General

Este proyecto aborda la necesidad de herramientas de apoyo pedagógico especializadas en la educación superior. La plataforma permite a los **profesores** crear espacios para sus asignaturas, donde pueden cargar material de estudio (apuntes, presentaciones, etc.) que servirá como base de conocimiento para un **asistente de IA** personalizado.

Los **alumnos** matriculados pueden interactuar con este asistente a través de una interfaz de chat para resolver sus dudas de forma instantánea y contextualizada.

La característica más innovadora del sistema es su capacidad para **procesar anónimamente las conversaciones** de los chats. De ellas, extrae y sintetiza pares de pregunta-respuesta relevantes, que luego son presentados al profesor para su **validación**. El profesor puede aprobar, rechazar o corregir estas dudas. Las dudas aprobadas pueden, opcionalmente, enriquecer la base de conocimiento del asistente y se publican en un foro general, creando un repositorio de conocimiento validado y en constante crecimiento.

## Características Principales

-   **Autenticación y Roles**: Sistema de registro e inicio de sesión seguro con roles diferenciados (profesor y alumno).
-   **Gestión de Asignaturas**: Los profesores pueden crear, configurar y eliminar asignaturas.
-   **Configuración de Asistente IA**: Cada asignatura tiene asociado un asistente de OpenAI personalizado con instrucciones y una base de conocimiento propia (RAG).
-   **Carga de Material**: Los profesores pueden subir archivos (.pdf, .docx, .txt, etc.) para alimentar la base de conocimiento del asistente.
-   **Matriculación de Alumnos**: Gestión de la inscripción de alumnos en las asignaturas.
-   **Interfaz de Chat**: Interfaz de chat intuitiva para que los alumnos interactúen con el asistente de IA de cada asignatura.
-   **Síntesis de Dudas**: Proceso automatizado que analiza los chats de forma anónima para extraer dudas académicas relevantes.
-   **Panel de Validación para Profesores**: Interfaz donde los profesores revisan, aprueban, rechazan o descartan las dudas sintetizadas.
-   **Retroalimentación a la IA**: Las dudas validadas pueden ser añadidas a la base de conocimiento del asistente, mejorando sus futuras respuestas.
-   **Foro de Dudas Resueltas**: Un espacio público donde los alumnos pueden consultar todas las dudas validadas por los profesores.
-   **Sistema de Reacciones**: Los alumnos pueden reaccionar a las dudas publicadas en el foro.
-   **Centro de Notificaciones**: Notificaciones en la aplicación y por correo electrónico sobre la validación de dudas y reacciones.

## Stack Tecnológico

-   **Backend**:
    -   PHP 8.4
    -   Laravel 12
-   **Frontend**:
    -   React 19
    -   Inertia.js 2.0
    -   TailwindCSS 4
    -   Vite
-   **Base de Datos**:
    -   MariaDB (para desarrollo/producción)
    -   SQLite (para tests)
-   **APIs y Servicios Externos**:
    -   OpenAI API (principalmente Assistants API)
    -   SDKs: `openai-php/client` y `openai-php/laravel`
-   **Herramientas de Desarrollo**:
    -   Git y GitHub
    -   Composer
    -   NPM
    -   PHPStorm