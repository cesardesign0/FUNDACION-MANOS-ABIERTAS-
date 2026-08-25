# Regla Global de Resumen Hablado por Altavoces (Voice Summary)

## Directiva Obligatoria:
Al terminar de ejecutar cualquier tarea o modificación, el asistente DEBE ejecutar el script de voz para proporcionar un resumen hablado de 1 o 2 frases en español natural (`es-MX-DaliaNeural`):

```powershell
python scripts/speak.py "Resumen claro y conciso de 1 o 2 frases de lo que se acaba de realizar."
```

O si estás en otro proyecto/directorio:
```powershell
python C:/Users/Cjcor/.gemini/scripts/speak.py "Resumen claro y conciso de 1 o 2 frases de lo que se acaba de realizar."
```

## Control de Silencio:
- Si el usuario dice "silencio", "no hables", o "apaga la voz", ejecuta `python C:/Users/Cjcor/.gemini/scripts/speak.py --mute`.
- Para reactivarla cuando el usuario lo solicite, ejecuta `python C:/Users/Cjcor/.gemini/scripts/speak.py --unmute`.
