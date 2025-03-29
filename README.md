# Paso a Paso para Replicar el Código en AWS CDK

## 1. Creación de un Usuario IAM en AWS

Para desplegar la infraestructura en AWS mediante CDK, se debe utilizar un usuario diferente al usuario raíz de AWS. A continuación, se describe el proceso para crear un usuario IAM con los permisos adecuados:

### 1.1 Creación del Usuario y Grupo IAM

1. Iniciar sesión en la **Consola de AWS**.
2. Ir a **IAM (Identity and Access Management)**.
3. En el menú de la izquierda, seleccionar **Usuarios** y hacer clic en **Crear usuario**.
4. Asignar un nombre al usuario, por ejemplo, `AdminCamilo`.
5. Crear un grupo llamado `"Administrator"` con la política **"AdministratorAccess"**.
6. Agregar el usuario `AdminCamilo` al grupo **Administrator**.

### 1.2 Generación de Access Keys

1. En IAM, buscar y seleccionar el usuario `AdminCamilo`.
2. Ir a la pestaña **Credenciales de seguridad** y hacer clic en **Crear clave de acceso**.
3. Seleccionar la opción **Command Line Interface (CLI)**.
4. Marcar la casilla de confirmación y hacer clic en **Siguiente**.
5. Hacer clic en **Crear clave de acceso** (Opcionalmente, agregar una descripción).
6. Guardar las credenciales generadas, ya que serán necesarias para configurar el acceso a AWS desde CDK.

---

## 2. Configuración de AWS CLI con las Access Keys

Una vez generadas las claves de acceso, es necesario configurarlas en AWS CLI para poder interactuar con la cuenta de AWS.

### 2.1 Configurar el Perfil en AWS CLI

Ejecutar el siguiente comando en la terminal:

```sh
aws configure --profile AdminCamilo
```

Se solicitarán los siguientes datos:

- **AWS Access Key ID:** Ingresar la clave de acceso generada.
- **AWS Secret Access Key:** Ingresar la clave secreta generada.
- **Default region name:** `us-east-1` (o la región deseada).
- **Default output format:** `json`.

### 2.2 Verificación de la Configuración

Para asegurarse de que el perfil se configuró correctamente, ejecutar los siguientes comandos:

```sh
export AWS_PROFILE=AdminCamilo
aws sts get-caller-identity
```

El resultado debe mostrar información sobre la cuenta de AWS y el usuario configurado.

---

## 3. Instalación de Node.js, TypeScript, AWS CDK y AWS CLI

Para utilizar AWS CDK, es necesario instalar varias herramientas en el entorno de desarrollo.

### 3.1 Instalación de Node.js y AWS CLI

1. Descargar e instalar **Node.js** desde [nodejs.org](https://nodejs.org/).
2. Descargar e instalar **AWS CLI** desde [AWS CLI v2](https://aws.amazon.com/cli/).

Para verificar la instalación, ejecutar:

```sh
node -v   # Verifica la versión de Node.js
aws --version  # Verifica la versión de AWS CLI
```

### 3.2 Instalación de TypeScript

Ejecutar el siguiente comando en la terminal:

```sh
npm install -g typescript
```

- La opción `-g` significa que TypeScript se instalará globalmente en el sistema.
- Si solo se quiere instalar en el proyecto actual, omitir `-g`.

### 3.3 Instalación de AWS CDK

Ejecutar el siguiente comando:

```sh
npm install -g aws-cdk
```

Para verificar la instalación, ejecutar:

```sh
cdk --version
```

---

## 4. Creación del Proyecto AWS CDK

Ahora se procederá a inicializar el proyecto en AWS CDK para definir la infraestructura como código.

### 4.1 Inicializar un Proyecto en AWS CDK

Ejecutar el siguiente comando para crear un nuevo proyecto en **TypeScript**:

```sh
cdk init sample-app --language typescript
```

Esto generará la estructura básica del proyecto.

---

## 5. Despliegue de la Infraestructura en AWS

Para desplegar la infraestructura en AWS, se deben ejecutar una serie de comandos en el terminal.

### 5.1 Exportar el Perfil Configurado

Antes de continuar, asegurarse de que se está usando el perfil correcto:

```sh
export AWS_PROFILE=AdminCamilo
```

### 5.2 Inicializar CDK en la Cuenta de AWS

Ejecutar el siguiente comando para inicializar el entorno de CDK en la cuenta:

```sh
cdk bootstrap
```

Este comando creará los recursos necesarios en AWS para que CDK pueda desplegar infraestructura, como el `CDKToolkit`.

### 5.3 Sintetizar la Infraestructura

Antes de desplegar, se puede visualizar el código traducido en un template de CloudFormation:

```sh
cdk synth
```

Este comando generará un archivo YAML con la definición de la infraestructura.

### 5.4 Desplegar la Infraestructura en AWS

Ejecutar el siguiente comando para desplegar todos los stacks definidos en el proyecto:

```sh
cdk deploy --all
```

- La opción `--all` despliega todos los stacks del proyecto.
- Si se desea desplegar un solo stack, se puede especificar su nombre, por ejemplo:

```sh
cdk deploy FargateServiceStack
```

---

## 6. Eliminación de la Infraestructura

Si se necesita eliminar la infraestructura creada, ejecutar:

```sh
cdk destroy --all
```

Este comando eliminará todos los recursos creados por CDK.

---

## Conclusión

Siguiendo estos pasos se podrá configurar el entorno, inicializar un proyecto en AWS CDK y desplegar la infraestructura de manera eficiente.
