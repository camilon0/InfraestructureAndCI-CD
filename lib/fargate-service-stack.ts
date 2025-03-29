import * as cdk from "aws-cdk-lib";
import * as ec2 from "aws-cdk-lib/aws-ec2";
import * as ecr from "aws-cdk-lib/aws-ecr";
import * as ecs from "aws-cdk-lib/aws-ecs";
import * as ecs_patterns from "aws-cdk-lib/aws-ecs-patterns";
import * as elbv2 from "aws-cdk-lib/aws-elasticloadbalancingv2";
import { Construct } from "constructs";

interface FargateServiceStackProps extends cdk.StackProps {
  cluster: ecs.Cluster;
  alb: elbv2.ApplicationLoadBalancer;
  listener: elbv2.ApplicationListener;
  repository: ecr.Repository; // Agregar repositorio como parámetro
}

export class FargateServiceStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: FargateServiceStackProps) {
    super(scope, id, props);

    const taskDefinition = new ecs.FargateTaskDefinition(this, "TaskDef");

    // Agregando contenedor con imagen desde ECR
    const container = taskDefinition.addContainer("AppContainer", {
      image: ecs.ContainerImage.fromEcrRepository(props.repository), // Usar la imagen de ECR
      memoryLimitMiB: 512,
      cpu: 256,
      logging: ecs.LogDrivers.awsLogs({ streamPrefix: "ecs" }),
    });

    container.addPortMappings({ containerPort: 80 });

    // Creación del servicio Fargate con balanceo de carga
    const fargateService =
      new ecs_patterns.ApplicationLoadBalancedFargateService(
        this,
        "FargateService",
        {
          cluster: props.cluster,
          taskDefinition,
          publicLoadBalancer: true,
        }
      );

    // Escalado automático basado en CPU
    const scaling = fargateService.service.autoScaleTaskCount({
      minCapacity: 2,
      maxCapacity: 10,
    });
    scaling.scaleOnCpuUtilization("CpuScaling", {
      targetUtilizationPercent: 50,
    });
  }
}
