# Reglas de Agente para PRO Integra360

## REGLA PERMANENTE DE PROTECCIÓN DE ARCHIVOS

La carpeta `/public/files` contiene recursos descargables de producción gestionados manualmente.

Está terminantemente prohibido:
- Eliminar la carpeta `/public/files`.
- Eliminar o sustituir archivos existentes dentro de `/public/files`.
- Renombrar sus archivos.
- Moverlos a otra carpeta.
- Modificar su contenido.
- Cambiar sus extensiones.
- Eliminar sus referencias en `constants.ts`.
- Reemplazar esta carpeta durante una sincronización o exportación a GitHub.

### Archivos protegidos actualmente:
- `/public/files/prointegra360-kit.pdf`
- `/public/files/prointegra360-kit-visual.pdf`
- `/public/files/prointegra360-checklist.xlsx`
- `/public/files/prointegra360-plantilla.xlsx`

### Antes de publicar cualquier cambio en GitHub:
1. Conserva íntegramente `/public/files`.
2. Verifica que los cuatro archivos siguen presentes.
3. No incluyas ninguna eliminación dentro de esa carpeta.
4. Si el proyecto interno no contiene estos archivos, no sobrescribas ni elimines los existentes en GitHub.
5. Informa expresamente si la sincronización pudiera afectar a `/public/files`.

Solo se podrá modificar esta carpeta cuando el usuario lo solicite explícitamente.
