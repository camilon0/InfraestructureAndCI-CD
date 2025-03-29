Paso a paso para replicar el código

2. Para empezar a crear la infraestructura debemos generar un usuario diferente al usuario raiz en la consola de AWS, debemos crear un nuevo user con los permisos y politicas necesarias para que pueda crear recursos en AWS, en este caso se creo un usuario llamado AdminCamilo, se crea un grupo "Administrator" con la politica "AdministratorAccess", se crea un grupo ya que en siguientes ocaciones se pueda volver a usar.
   2.1 Seguimos en la consola de AWS y nos dirigimos a IAM, Users, déspues al usuario que en este caso es "AdminCamilo", vamos a la parte que dice "Create acces key"
   2.1.1 Clic en Command Line Interface (CLI), clic en la casilla de confirmación, Next, Create acces key (Opcional colocar una descripción).
   2.1.2 Ahora podrás observar las llaves de acceso que nos ayudarán a tener acceso y poder crear los recursos desde la herramienta CDK de AWS.

3. Ahora debemos configurar las llaves de acceso que generamos anteriormente así; en la terminal escribimos "aws configure --profile AdminCamilo", colocamos el AWS Access Key ID, el AWS Secret Access Key, configuramos el Default region name "us-east-1", el Default output format "json".
   3.1 Para corroborar que todo queda bien configurado colocamos en la terminal,
   export AWS_PROFILE=AdminCamilo
   aws sts get-caller-identity
   colocar el usuario con el que fue configurado el acceso a la consola de aws

4. Ahora debemos configurar NodeJs, Typescript AWS CDK y AWS CLI, en nuestro archivo de proyecto. Yo configuré cada uno de estos en un entorno Windows, si necesitas instalarlo para Linux o MacOS deberas revisar la documentación.
   1.1. Instalamos el Node y AWS CLI desde sus respectivas páginas oficiales. Déspues de instalar revisamos que se configuraron las diferentes herramientas en la terminal, cómo; node --v, aws --v
   1.2. Instalamos el Typescript con el siguiente comando; npm install -g typescript, la -g significa que se instalará globalmente, es decir entoda tú maquina, si solo lo necesitas para este proyecto, quitarle la -g
   1.3. Instalamos el AWS CDK con el siguiente comando npm install -g aws-cdk

5. Ahora iniciamos el proyecto en CDK para generar la infraestructura cómo código en AWS
   3.1 Usamos el siguiente comando; cdk init sample-app --language typescript, con este comando nos creará un proyecto de prueba con el cuál podemos empezar a crear nuestra infraestructura

6. Para poder correr el código necesitas escribir el siguiente comando, ya con las credenciales de tu cuenta configuradas necestias escribir; export AWS_PROFILE=AdminCamilo (debes colocar tu usuario) esto con el fin de que siga tomando las credenciales de tu cuenta.
   4.1 El siguiente comando es "cdk bootstrap" para la creacion del CDKToolkit en la consola de AWS, esto creara todo lo necesario para poder desdplegar tu infraestuctura en AWS
   4.2 El siguiente comando es "cdk synth" que lee cada codigo y crea el template de cloudFormation de todo lo que se va a crear.
   4.3 El ultimo comando es el "cdk deploy --all" para el despliegue de la infraestructura y --all para que cree cada stack
   console.log("Configurando llaves de acceso...");
   console.log("Configurando AWS CLI...");
   console.log("Configurando NodeJs y Typescript...");
   console.log("Configurando AWS CDK...");
   console.log("Iniciando proyecto en CDK...");
   console.log("Creando CDKToolkit en la consola de AWS...");
   console.log("Creando template de CloudFormation...");
   console.log("Desplegando infraestructura en AWS...");
