
# Instrucciones para configurar el proyecto

## Cliente

1. En el directorio `./client`, instala las dependencias:
   ```sh
   npm install
   ```

2. Ejecta el cliente:
   ```sh
   npm run build
   ```

## Aplicación

1. En el directorio `./app`, crea un entorno virtual con:
   ```sh
   python -m venv venv
   ```

2. Activa el entorno virtual:

   - En Windows:
     ```sh
     .\venv\Scripts\activate
     ```

   - En macOS/Linux:
     ```sh
     source venv/bin/activate
     ```

3. Instala las dependencias:
   ```sh
   pip install -r requirements.txt
   ```

4. Ejecta la aplicación:
   ```sh
   python app.py
   ```
