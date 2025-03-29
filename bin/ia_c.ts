#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import { ALBStack } from "../lib/alb-stack";
import { EcrStack } from "../lib/ecr-stack";
import { ECSClusterStack } from "../lib/ecs-cluster-stack";
import { FargateServiceStack } from "../lib/fargate-service-stack";
import { VpcStack } from "../lib/vpc-stack";

// Crear la aplicación CDK
const app = new cdk.App();

// Instanciar la VPC primero, ya que otras stacks la necesitan
const vpcStack = new VpcStack(app, "VpcStack");

// Instanciar el ALB (Application Load Balancer)
const albStack = new ALBStack(app, "ALBStack", {
  vpc: vpcStack.vpc, // Pasar la VPC como parámetro
});
albStack.addDependency(vpcStack);

// Instanciar el repositorio de ECR para almacenar imágenes de contenedores
const ecrStack = new EcrStack(app, "EcrStack");

// Instanciar el Cluster de ECS que utilizará Fargate
const ecsClusterStack = new ECSClusterStack(app, "ECSClusterStack", {
  vpc: vpcStack.vpc, // Pasar la VPC como parámetro
});
ecsClusterStack.addDependency(vpcStack);

// Instanciar los servicios Fargate y asociarlos al cluster y ALB
const fargateServiceStack = new FargateServiceStack(
  app,
  "FargateServiceStack",
  {
    cluster: ecsClusterStack.cluster, // Pasar el cluster ECS
    alb: albStack.alb, // Pasar el Load Balancer
    listener: albStack.listener,
    repository: ecrStack.appRepo1, // Pasar el repositorio ECR
  }
);
fargateServiceStack.addDependency(ecsClusterStack);
fargateServiceStack.addDependency(albStack);
fargateServiceStack.addDependency(ecrStack);

// Ejecutar la aplicación
app.synth();
