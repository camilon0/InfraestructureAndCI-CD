import * as cdk from "aws-cdk-lib";
import * as ec2 from "aws-cdk-lib/aws-ec2";
import * as elbv2 from "aws-cdk-lib/aws-elasticloadbalancingv2";
import { Construct } from "constructs";

interface ALBStackProps extends cdk.StackProps {
  vpc: ec2.Vpc;
}

export class ALBStack extends cdk.Stack {
  public readonly alb: elbv2.ApplicationLoadBalancer;
  public readonly listener: elbv2.ApplicationListener;

  constructor(scope: Construct, id: string, props: ALBStackProps) {
    super(scope, id, props);

    // Crear el Load Balancer en la VPC
    this.alb = new elbv2.ApplicationLoadBalancer(this, "ALB", {
      vpc: props.vpc,
      internetFacing: true, // Load Balancer público
    });

    // Crear un grupo de destino sin instancias iniciales (se agregarán después)
    const targetGroup = new elbv2.ApplicationTargetGroup(this, "TargetGroup", {
      vpc: props.vpc,
      protocol: elbv2.ApplicationProtocol.HTTP,
      port: 80,
      targetType: elbv2.TargetType.IP, // Se usa IP para Fargate
    });

    // Crear un listener HTTP sin SSL
    this.listener = this.alb.addListener("HttpListener", {
      port: 80, // 🔴 Solo HTTP
      defaultAction: elbv2.ListenerAction.forward([targetGroup]), // Se evita el error
    });
  }
}
